import { Application } from 'express';

import { UsersControllers, UsersMiddlewares } from '..';
import { AuthMiddlewares } from '../../auth';
import { RoutesConfigurer } from '../../common/classes';
import { BodyMiddlewares } from '../../common/middlewares';

export default class UsersRoutes extends RoutesConfigurer {
    public constructor() {
        super('Users Routes');
    }

    public configureRoutes(app: Application) {
        app.route('/users')
            .get(UsersControllers.listUsers)
            .post(
                UsersMiddlewares.sanitizeUserForCreation,
                BodyMiddlewares.checkIfSanitizationsFailed,
                UsersControllers.createUser
            );

        app.route('/users/:userId')
            .get(UsersControllers.getUserById)
            .all(
              AuthMiddlewares.checkIfUserIsAuthenticated,
              AuthMiddlewares.onlySameUserCanDoThis,
            )
            .put(
                UsersMiddlewares.sanitizeUserForPut,
                BodyMiddlewares.checkIfSanitizationsFailed,
                UsersControllers.putUserById
            )
            .patch(
                UsersMiddlewares.sanitizeUserForPatch,
                BodyMiddlewares.checkIfSanitizationsFailed,
                UsersControllers.patchUserById
            )
            .delete(UsersControllers.deleteUserById);
    }
}