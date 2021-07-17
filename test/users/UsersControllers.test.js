import {expect} from 'chai';
import sinon from 'sinon';

import {UsersControllers, UsersDao} from '../../dist/users';
import {HttpStatusCode} from '../../dist/common/enums';

describe('Users Controllers', () => {
    const res = {
        status(s) {
            this.statusCode = s;
            return this;
        },
        send(r) {
            this.sentResponse = r;
        },
        reset() {
            delete this.statusCode, this.sentResponse;
        }
    };

    const usersDao = UsersDao.getInstance();

    afterEach(res.reset);

    it('should return the id of the newly created user to the client', async () => {
        sinon.stub(usersDao, 'create');
        usersDao.create.returns('newId');

        const req = {body: {firstName: 'Esan', lastName: 'Developer', email: 'esandeveloper@protonmail.com', password: 'secretPassword'}};

        await UsersControllers.createUser(req, res, new Function());

        expect(res.statusCode).to.equal(HttpStatusCode.OK);
        expect(res.sentResponse).to.have.property('created');

        usersDao.create.restore();
    });

    it('should return a user by id', async () => {
        sinon.stub(usersDao, 'getById');
        usersDao.getById.returns({firstName: 'Esan'});

        await UsersControllers.getUserById({params: {id: 'fakeId'}}, res, new Function());

        expect(res.sentResponse).to.have.property('firstName');

        usersDao.getById.restore();
    });

    it('should return a list of users', async () => {
        sinon.stub(usersDao, 'list');
        usersDao.list.returns([]);

        await UsersControllers.listUsers({}, res, new Function());

        expect(res.sentResponse).to.be.instanceOf(Array);

        usersDao.list.restore();
    });

    it('should return the replaced user to the client', async () => {
        sinon.stub(usersDao, 'putById');
        usersDao.putById.returns('replacedUser');

        await UsersControllers.putUserById({params: {userId: ''}, body: {user: ''}}, res, new Function());

        expect(res.sentResponse).to.equal('replacedUser');

        usersDao.putById.restore();
    });

    it('should return the patched user to the client', async () => {
        sinon.stub(usersDao, 'patchById');
        usersDao.patchById.returns('patchedUser');

        await UsersControllers.patchUserById({params: {userId: ''}, body: {user: ''}}, res, new Function());

        expect(res.sentResponse).to.equal('patchedUser');

        usersDao.patchById.restore();
    });

    it('should return the id of the deleted user to the client', async () => {
        sinon.stub(usersDao, 'deleteById');

        await UsersControllers.deleteUserById({params: {userId: 'deletedId'}}, res, new Function());

        expect(res.sentResponse.deleted).to.equal('deletedId');

        usersDao.deleteById.restore();
    });
});