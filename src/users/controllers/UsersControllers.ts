import { Request, Response, NextFunction } from 'express';

import { UsersDao } from '..';
import { HttpStatusCode } from '../../common/enums';

export default class UsersControllers {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { firstName, lastName, email, password } = req.body;

        const userId = await UsersDao.getInstance().create({ firstName, lastName, email, password });

        res.status(HttpStatusCode.OK).send({ created: userId });
    }

    public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;

        const user = await UsersDao.getInstance().getById(userId);

        res.status(HttpStatusCode.OK).send(user);
    }

    public static async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { limit, page } = req.query;

        const users = await UsersDao.getInstance().list(+limit!, +page!);

        res.status(HttpStatusCode.OK).send(users);
    }

    public static async putUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const editedUser = await UsersDao.getInstance().putById(userId, { firstName, lastName, email, password });

        res.status(HttpStatusCode.OK).send(editedUser);
    }

    public static async patchUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const patchedUser = await UsersDao.getInstance().patchById(userId, { firstName, lastName, email, password });

        res.status(HttpStatusCode.OK).send(patchedUser);
    }

    public static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;

        await UsersDao.getInstance().deleteById(userId);

        res.status(HttpStatusCode.OK).send({ deleted: userId });
    }
}