import { expect } from 'chai';

import { Strings } from '../../dist/common/constants';
import { InvalidInputException } from '../../dist/common/exceptions';
import { BodyMiddlewares } from '../../dist/common/middlewares';
import { UsersMiddlewares } from '../../dist/users';

describe('Users Middlewares', () => {
    let req, middleware;
    const checkForErrors = BodyMiddlewares.checkIfSanitizationsFailed;
    const fakeRequest = () => checkForErrors(req, null, new Function());
    const doFakeRequest = async (expectedErrorMessage) => {
        await middleware(req, null, new Function());
        
        const partialExpect = expect(fakeRequest).to;

        if(!expectedErrorMessage) {
            partialExpect.not.throw(InvalidInputException);
        } else {
            partialExpect.throw(InvalidInputException, expectedErrorMessage);
        }        
    }

    beforeEach(() => req = {body: {}});

    it('should throw an error when first name is invalid', async () => {
        req.body.firstName = '  ';
        middleware = UsersMiddlewares.sanitizeFirstName({required: true});
        await doFakeRequest(Strings.error.EMPTY_FIRST_NAME);
    });

    it('should not throw an error when first name is valid', async () => {
        req.body.firstName = 'Esan';
        await doFakeRequest();
    });

    it('should throw an error when last name is invalid', async () => {
        req.body.lastName = 'this text is longer than it should be';
        middleware = UsersMiddlewares.sanitizeLastName({required: true});
        await doFakeRequest(Strings.error.TOO_LONG_LAST_NAME);
    });

    it('should not throw an error when last name is valid', async () => {
        req.body.lastName = 'Smith';
        await doFakeRequest();
    });

    it('should throw an error when email is invalid', async () => {
        req.body.email = 'test@email';
        middleware = UsersMiddlewares.sanitizeEmail({required: true});
        await doFakeRequest(Strings.error.INVALID_EMAIL);
    });

    it('should not throw an error when email is valid', async () => {
        req.body.email = 'esandeveloper@protonmail.com';
        await doFakeRequest();
    });

    it('should throw an error when password is weak', async () => {
        req.body.password = 'w3akP4ss0rd';
        middleware = UsersMiddlewares.sanitizePassword({required: true});
        await doFakeRequest(Strings.error.PASSWORD_MISSING_SYMBOL);
    });

    it('should not throw an error when password is strong', async () => {
        req.body.password = 'V3ry5TR0nGP4s5W0rd!';
        await doFakeRequest();
    });
});