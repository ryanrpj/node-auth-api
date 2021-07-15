import Server from './common/Server.js';
import { UsersRoutes } from './users';

const server = new Server();

server.setRoutes(
    new UsersRoutes(),
);

server.listen();