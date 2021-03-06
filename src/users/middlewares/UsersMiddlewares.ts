import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';

import { Strings } from '../../common/constants';

export default class UsersMiddlewares {

    public static extractUserFromRequestBody(req: Request, res: Response, next: NextFunction): void {
        const {firstName, lastName, email, password} = req.body;
        req.body.user = {firstName, lastName, email, password};

        next();
    }

    public static get sanitizeUserForCreation(): ValidationChain[] {
        return [
            UsersMiddlewares.sanitizeFirstName({ required: true }),
            UsersMiddlewares.sanitizeLastName({ required: true }),
            UsersMiddlewares.sanitizeEmail({ required: true }),
            UsersMiddlewares.sanitizePassword({ required: true }),
        ];
    }

    public static get sanitizeUserForPatch(): ValidationChain[] {
        return [
            UsersMiddlewares.sanitizeFirstName({ required: false }),
            UsersMiddlewares.sanitizeLastName({ required: false }),
            UsersMiddlewares.sanitizeEmail({ required: false }),
            UsersMiddlewares.sanitizePassword({ required: false }),
        ];
    }

    public static get sanitizeUserForPut(): ValidationChain[] {
        return UsersMiddlewares.sanitizeUserForCreation;
    }

    private static get sanitizeFirstName(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('firstName')
                .trim()
                .notEmpty().withMessage(Strings.error.EMPTY_FIRST_NAME)
                .isLength({ max: 30 }).withMessage(Strings.error.TOO_LONG_FIRST_NAME)
        );
    }

    private static get sanitizeLastName(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('lastName')
                .trim()
                .notEmpty().withMessage(Strings.error.EMPTY_LAST_NAME)
                .isLength({ max: 30 }).withMessage(Strings.error.TOO_LONG_LAST_NAME)
        );
    }

    public static get sanitizeEmail(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('email')
                .trim()
                .notEmpty().withMessage(Strings.error.EMPTY_EMAIL)
                .isEmail().withMessage(Strings.error.INVALID_EMAIL)
                .isLength({ max: 150 }).withMessage(Strings.error.TOO_LONG_EMAIL)
        );
    }

    public static get sanitizePassword(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('password')
                .trim()
                .notEmpty().withMessage(Strings.error.EMPTY_PASSWORD)
                .matches(/\d/).withMessage(Strings.error.PASSWORD_MISSING_NUMBER)
                .isLength({ min: 8 }).withMessage(Strings.error.TOO_SHORT_PASSWORD)
                .isLength({ max: 200 }).withMessage(Strings.error.TOO_LONG_PASSWORD)
                .matches(/[a-z]/).withMessage(Strings.error.PASSWORD_MISSING_LOWERCASE)
                .matches(/[A-Z]/).withMessage(Strings.error.PASSWORD_MISSING_UPPERCASE)
                .isStrongPassword({minSymbols: 1}).withMessage(Strings.error.PASSWORD_MISSING_SYMBOL)
        );
    }

    private static buildSanitizer(sanitizer: ValidationChain): Function {
        return (options: { required: boolean }) => {
            if (options.required) return sanitizer;

            return sanitizer.optional();
        };
    }
}