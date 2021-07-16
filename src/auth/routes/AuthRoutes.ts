import { Application, NextFunction, Request, Response } from 'express';

import { RoutesConfigurer } from '../../common/classes';

export default class AuthRoutes extends RoutesConfigurer {
    public constructor() {
        super('Authentication Routes');
    }

    public configureRoutes(app: Application): void {
        app.route('/auth')
        .post((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send('User authenticated.');
        });
    }
}