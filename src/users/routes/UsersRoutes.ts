import { Application } from 'express';

import { RoutesConfigurer } from '../../common/classes';
import { UsersControllers, UsersMiddlewares } from '..';

export default class UsersRoutes extends RoutesConfigurer {
    public constructor() {
        super('Users Routes');
    }

    public configureRoutes(app: Application) {
        app.route('/users')
            .get(UsersControllers.listUsers)
            .post(
                UsersMiddlewares.sanitizeUserForCreation,
                UsersControllers.createUser
            );

        app.route('/users/:userId')
            .get(UsersControllers.getUserById)
            .put(
                UsersMiddlewares.sanitizeUserForPut,
                UsersControllers.putUserById
            )
            .patch(
                UsersMiddlewares.sanitizeUserForPatch,
                UsersControllers.patchUserById
            )
            .delete(UsersControllers.deleteUserById);
    }
}