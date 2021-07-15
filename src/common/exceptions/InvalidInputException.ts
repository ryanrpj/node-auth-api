import CustomException, { CustomExceptionOptions } from './CustomException.js';

export default class InvalidInputException extends CustomException {
    public constructor(options: CustomExceptionOptions) {
        super(options);
    }
}