import { Request, Response, NextFunction } from 'express';

import { UsersDao } from '..';
import { HttpStatusCode } from '../../common/enums';

export default class UsersControllers {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = await UsersDao.getInstance().create(req.body.user);

        res.status(HttpStatusCode.OK).send({ created: userId });
    }

    public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await UsersDao.getInstance().getById(req.params.userId);

        res.status(HttpStatusCode.OK).send(user);
    }

    public static async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { limit, page } = req.query || {};

        const users = await UsersDao.getInstance().list(+limit!, +page!);

        res.status(HttpStatusCode.OK).send(users);
    }

    public static async putUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const editedUser = await UsersDao.getInstance().putById(req.params.userId, req.body.user);

        res.status(HttpStatusCode.OK).send(editedUser);
    }

    public static async patchUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const patchedUser = await UsersDao.getInstance().patchById(req.params.userId, req.body.user);

        res.status(HttpStatusCode.OK).send(patchedUser);
    }

    public static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        await UsersDao.getInstance().deleteById(req.params.userId);

        res.status(HttpStatusCode.OK).send({ deleted: req.params.userId });
    }
}