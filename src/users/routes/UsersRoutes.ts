import { Application, Request, Response } from 'express';

import { RoutesConfigurer } from '../../common/classes';

export default class UsersRoutes extends RoutesConfigurer {
    public constructor() {
        super('Users Routes');
    }

    public configureRoutes(app: Application) {
        app.route('/users')
            .get((req: Request, res: Response) => res.status(200).send('List of users.'))
            .post((req: Request, res: Response) => res.status(201).send('User Created.'));

        app.route('/users/:userId')
            .get((req: Request, res: Response) => res.status(200).send(`Get user with id {${req.params.userId}}`))
            .put((req: Request, res: Response) => res.status(200).send(`Put to user with id {${req.params.userId}}.`))
            .patch((req: Request, res: Response) => res.status(200).send(`Patch to user with id {${req.params.userId}}`))
            .delete((req: Request, res: Response) => res.status(200).send(`Delete user with id {${req.params.userId}}`));
    }
}