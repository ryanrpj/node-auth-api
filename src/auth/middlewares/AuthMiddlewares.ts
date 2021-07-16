import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { InvalidInputException, AuthException } from '../../common/exceptions';
import { Strings } from '../../common/constants';
import { HttpStatusCode } from '../../common/enums';

export default class AuthMiddlewares {
    public static async checkIfUserIsAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {authorization} = req.headers;

        if(!authorization) return next(new AuthException({
            errorMessage: Strings.error.UNAUTHORIZED, statusCode: HttpStatusCode.UNAUTHORIZED
        }));

        const splittedHeader = authorization.split(' ');

        if(splittedHeader[0] !== 'Bearer') return next(new InvalidInputException({errorMessage: Strings.error.NOT_BEARER_HEADER}));
        if(!splittedHeader[1]) return next(new InvalidInputException({errorMessage: Strings.error.MISSING_AUTH_TOKEN}));

        try {
            const result = jwt.verify(splittedHeader[1], process.env.JWT_SECRET!);
            req.body.user = result;
            next();
        } catch {
            next(new InvalidInputException({errorMessage: Strings.error.INVALID_AUTH_TOKEN}));
        }
    }

    public static onlySameUserCanDoThis(req: Request, res: Response, next: NextFunction): void {
        const {userId} = req.params;

        if (userId === req.body.user.id) return next();

        throw new AuthException({errorMessage: Strings.error.FORBIDDEN, statusCode: HttpStatusCode.FORBIDDEN});
    }
}