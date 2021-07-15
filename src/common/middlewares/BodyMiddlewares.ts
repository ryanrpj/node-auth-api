import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { InvalidInputException } from '../exceptions';

export default class BodyMiddlewares {
    public static checkIfSanitizationsFailed(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new InvalidInputException({ errorMessage: errors.array()[0].msg });
        }

        next();
    }
}