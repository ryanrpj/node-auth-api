import { Application } from 'express';

import { RoutesConfigurer } from '../../common/classes';
import { BodyMiddlewares } from '../../common/middlewares';
import { UsersMiddlewares } from '../../users';
import AuthControllers from '../controllers/AuthControllers';


export default class AuthRoutes extends RoutesConfigurer {
    public constructor() {
        super('Authentication Routes');
    }

    public configureRoutes(app: Application): void {
        app.route('/auth').post(
            UsersMiddlewares.sanitizeEmail({required: true}),
            UsersMiddlewares.sanitizePassword({required: true}),
            BodyMiddlewares.checkIfSanitizationsFailed,
            AuthControllers.authenticateUser
            );
    }
}