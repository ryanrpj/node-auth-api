import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';

import { AuthMiddlewares } from '../../dist/auth';
import { Strings } from '../../dist/common/constants';
import { AuthException, InvalidInputException } from '../../dist/common/exceptions';


describe('Auth Middlewares', () => {
   

    const doInvalidRequest = (authHeader, expectedException, expectedErrorMessage) => {
        expect(() => AuthMiddlewares.checkIfUserIsAuthenticated({headers: authHeader}, {}, new Function()))
        .to.throw(expectedException, expectedErrorMessage);
    }

    it('should throw an error when authentication header is invalid', () => {
        doInvalidRequest(null, AuthException, Strings.error.UNAUTHORIZED);
        doInvalidRequest({authorization: 'invalid header'}, InvalidInputException, Strings.error.NOT_BEARER_HEADER);
        doInvalidRequest({authorization: 'Bearer '}, InvalidInputException, Strings.error.MISSING_AUTH_TOKEN);
        doInvalidRequest({authorization: 'Bearer invalidToken'}, InvalidInputException, Strings.error.INVALID_AUTH_TOKEN);
    });

    it('should not throw an error when authentication header is valid', () => {
        sinon.stub(jwt, 'verify');
        jwt.verify.returns('valid token!');

        const req = {headers: {authorization: 'Bearer token'}, body: {}};

        AuthMiddlewares.checkIfUserIsAuthenticated(req, {}, new Function());

        expect(req.body.user).to.equal('valid token!');

        jwt.verify.restore();
    });

    it('should properly check if user has sufficient permission to execute action', () => {
        const req = {params: {userId: 'userId'}, body: {user: {id: 'anotherUserId'}}};

        expect(() => AuthMiddlewares.onlySameUserCanDoThis(req, {}, new Function()))
        .to.throw(AuthException, Strings.error.FORBIDDEN);

        req.body.user.id = 'userId';

        expect(() => AuthMiddlewares.onlySameUserCanDoThis(req, {}, new Function()))
        .not.to.throw();        
    });
});