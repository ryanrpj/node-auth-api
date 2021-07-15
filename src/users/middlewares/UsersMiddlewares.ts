import { body, ValidationChain } from 'express-validator';

import { Strings } from '../../common/constants';

export default class UsersMiddlewares {

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
                .notEmpty().withMessage(Strings.error.EMPTY_FIRST_NAME)
                .isLength({ max: 30 }).withMessage(Strings.error.TOO_LONG_FIRST_NAME)
        );
    }

    private static get sanitizeLastName(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('lastName')
                .notEmpty().withMessage(Strings.error.EMPTY_LAST_NAME)
                .isLength({ max: 30 }).withMessage(Strings.error.TOO_LONG_LAST_NAME)
        );
    }

    private static get sanitizeEmail(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('email')
                .notEmpty().withMessage(Strings.error.EMPTY_EMAIL)
                .isEmail().withMessage(Strings.error.INVALID_EMAIL)
                .isLength({ max: 150 }).withMessage(Strings.error.TOO_LONG_EMAIL)
        );
    }

    private static get sanitizePassword(): Function {
        return UsersMiddlewares.buildSanitizer(
            body('password')
                .notEmpty().withMessage(Strings.error.EMPTY_PASSWORD)
                .matches(/\d/).withMessage(Strings.error.PASSWORD_MISSING_NUMBER)
                .isLength({ min: 8 }).withMessage(Strings.error.TOO_SHORT_PASSWORD)
                .isLength({ max: 200 }).withMessage(Strings.error.TOO_LONG_PASSWORD)
                .matches(/[a-z]/).withMessage(Strings.error.PASSWORD_MISSING_LOWERCASE)
                .matches(/[A-Z]/).withMessage(Strings.error.PASSWORD_MISSING_UPPERCASE)
        );
    }

    private static buildSanitizer(sanitizer: ValidationChain): Function {
        return (options: { required: boolean }) => {
            if (options.required) return sanitizer;

            return sanitizer.optional();
        };
    }
}