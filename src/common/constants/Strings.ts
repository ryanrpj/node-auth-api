export default class Strings {
    private static instance: Strings;
    private readonly _error = {
        EMPTY_FIRST_NAME: 'Your first name cannot be empty!',
        TOO_LONG_FIRST_NAME: 'Your first name is too long. It must not be greater than 30 characters.',
        EMPTY_LAST_NAME: 'Your last name cannot be empty!',
        TOO_LONG_LAST_NAME: 'Your last name is too long. It must not be greater than 30 characters.',
        EMPTY_EMAIL: 'You must provide an e-mail address, otherwise, you won\'t be able to sign in.',
        INVALID_EMAIL: 'You must provide a valid e-mail address!',
        TOO_LONG_EMAIL: 'The e-mail address you provided is too long. It must not be greater than 150 characters.',
        EMPTY_PASSWORD: 'You must provide a password, otherwise, you won\'t be able to sign in.',
        PASSWORD_MISSING_NUMBER: 'Your password must contain at least one number.',
        PASSWORD_MISSING_LOWERCASE: 'Your password must contain at least one lowercase letter.',
        PASSWORD_MISSING_UPPERCASE: 'Your password must contain at lease one uppercase letter.',
        TOO_SHORT_PASSWORD: 'Your password is too short. It must contain at least 8 characters.',
        TOO_LONG_PASSWORD: 'Your password is too long. It must not contain more than 200 characters',
        INVALID_JSON: 'Your JSON is malformed. Please, check the syntax and try again.',
        INTERNAL_ERROR: 'An internal error has occurred, and our team is already investigating it. Please, try again later.',
    };

    private static getInstance(): Strings {
        if (!Strings.instance) Strings.instance = new Strings();

        return Strings.instance;
    }

    public static get error() {
        return {...Strings.getInstance()._error}
    }
}