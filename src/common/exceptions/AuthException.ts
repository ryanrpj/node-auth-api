import CustomException, { CustomExceptionOptions } from './CustomException.js';

export default class AuthException extends CustomException {
    public constructor(options: CustomExceptionOptions) {
        super(options);
    }
}