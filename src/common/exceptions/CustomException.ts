import { HttpStatusCode } from '../enums';

export interface CustomExceptionOptions {
    canBeSentToClient?: boolean;
    errorMessage: string;
    statusCode?: HttpStatusCode;
}

export default abstract class CustomException extends Error implements CustomExceptionOptions {
    public readonly canBeSentToClient: boolean;
    public readonly errorMessage: string;
    public readonly statusCode: HttpStatusCode;

    protected constructor(options: CustomExceptionOptions) {
        super(options.errorMessage);

        this.canBeSentToClient = options.canBeSentToClient || true;
        this.errorMessage = options.errorMessage;
        this.statusCode = options.statusCode || HttpStatusCode.BAD_REQUEST;
    }
}