import Server from './common/Server.js';
import { MongooseService } from './common/services/';
import { UsersRoutes } from './users';

const server = new Server();

await server.initializeServices(
    new MongooseService(),
);

server.setRoutes(
    new UsersRoutes(),
);

server.listen();