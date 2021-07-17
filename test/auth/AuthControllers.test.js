import {expect} from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

import {AuthControllers} from '../../dist/auth';
import {UsersDao} from '../../dist/users';
import {AuthException} from '../../dist/common/exceptions';
import {Strings} from '../../dist/common/constants';
import { HttpStatusCode } from '../../dist/common/enums';

describe('Auth Controllers', () => {
    const usersDao = UsersDao.getInstance();
    const next = sinon.spy();
    const req = {body: {email: 'fake@email.com', password: 'strongPassword'}};
    const doInvalidRequest = async () => {
        await AuthControllers.authenticateUser(req, new Function(), next);

        expect(next.called);
        expect(next.args[0][0]).to.be.instanceOf(AuthException);
        expect(next.args[0][0].errorMessage).to.equal(Strings.error.WRONG_CREDENTIALS);
    };

    sinon.stub(usersDao, 'getPasswordByEmail');
    sinon.stub(usersDao, 'getByEmail');
    sinon.stub(argon2, 'verify');
    sinon.stub(jwt, 'sign');

    after(() => {
        usersDao.getPasswordByEmail.restore();
        usersDao.getByEmail.restore();
        argon2.verify.restore();
        jwt.sign.restore();
    });

    it('should throw an error when email is invalid', async () => {
        usersDao.getPasswordByEmail.returns(null);

        await doInvalidRequest();
    });

    it('should throw an error when password is invalid', async () => {
        usersDao.getPasswordByEmail.returns(true);
        argon2.verify.returns(false);

        await doInvalidRequest();
    });

    it('should return a valid jwt token when both password and email are correct', async () => {
        usersDao.getByEmail.returns('a valid user');
        argon2.verify.returns(true);
        jwt.sign.returns('a valid jwt token!');

        const res = {
            status(s) {
                this.statusCode = s;
                return this;
            },
            send(r) {
                this.sentResponse = r;
            },
        };

        await AuthControllers.authenticateUser(req, res, new Function());

        expect(res.statusCode).to.equal(HttpStatusCode.OK);
        expect(res.sentResponse.token).to.equal('a valid jwt token!');
    });
});