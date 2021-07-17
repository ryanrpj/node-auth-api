import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { InvalidInputException, AuthException } from '../../common/exceptions';
import { Strings } from '../../common/constants';
import { HttpStatusCode } from '../../common/enums';

export default class AuthMiddlewares {
    public static checkIfUserIsAuthenticated(req: Request, res: Response, next: NextFunction): void {
        const {authorization} = req.headers || {};

        if(!authorization) throw new AuthException({errorMessage: Strings.error.UNAUTHORIZED, statusCode: HttpStatusCode.UNAUTHORIZED});

        const splittedHeader = authorization.split(' ');

        if(splittedHeader[0] !== 'Bearer') throw new InvalidInputException({errorMessage: Strings.error.NOT_BEARER_HEADER});
        if(!splittedHeader[1]) throw new InvalidInputException({errorMessage: Strings.error.MISSING_AUTH_TOKEN});

        try {
            const result = jwt.verify(splittedHeader[1], process.env.JWT_SECRET!);
            req.body.user = result;
            next();
        } catch {
            throw new InvalidInputException({errorMessage: Strings.error.INVALID_AUTH_TOKEN});
        }
    }

    public static onlySameUserCanDoThis(req: Request, res: Response, next: NextFunction): void {
        const {userId} = req.params;

        if (userId === req.body.user.id) return next();

        throw new AuthException({errorMessage: Strings.error.FORBIDDEN, statusCode: HttpStatusCode.FORBIDDEN});
    }
}