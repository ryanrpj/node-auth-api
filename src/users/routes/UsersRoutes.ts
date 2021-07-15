import { Application } from 'express';

import { RoutesConfigurer } from '../../common/classes';
import { UsersControllers } from '..';

export default class UsersRoutes extends RoutesConfigurer {
    public constructor() {
        super('Users Routes');
    }

    public configureRoutes(app: Application) {
        app.route('/users')
            .get(UsersControllers.listUsers)
            .post(UsersControllers.createUser);

        app.route('/users/:userId')
            .get(UsersControllers.getUserById)
            .put(UsersControllers.putUserById)
            .patch(UsersControllers.patchUserById)
            .delete(UsersControllers.deleteUserById);
    }
}