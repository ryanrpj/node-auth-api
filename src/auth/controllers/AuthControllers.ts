import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

import { Strings } from "../../common/constants";
import { HttpStatusCode } from "../../common/enums";
import { AuthException } from "../../common/exceptions";
import { UsersDao } from "../../users";

export default class AuthControllers {
    public static async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {email, password} = req.body;

        const userWithPassword = await UsersDao.getInstance().getPasswordByEmail(email);
        if (!userWithPassword) return next(new AuthException({errorMessage: Strings.error.WRONG_CREDENTIALS}));

        const isPasswordCorrect = await argon2.verify(userWithPassword.password!, password);
        if (!isPasswordCorrect) return next(new AuthException({errorMessage: Strings.error.WRONG_CREDENTIALS}));

        const regularUser = await UsersDao.getInstance().getByEmail(email);

        const token = jwt.sign(regularUser!, process.env.JWT_SECRET!, {algorithm: 'HS512'});

        res.status(HttpStatusCode.OK).send({token});
    }
}