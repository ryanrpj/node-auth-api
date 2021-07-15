import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import debug, { IDebugger } from 'debug';

import { RoutesConfigurer, Service } from './classes/';
import { HttpStatusCode } from './enums';
import { Strings } from './constants';

const debugLog: IDebugger = debug('app: Server');

export default class Server {
    private readonly app: Application;
    private readonly portNumber: number;

    public constructor() {
        dotenv.config();
        this.app = express();
        this.app.use(helmet());
        this.app.use(express.json());
        this.portNumber = +process.env.PORT!;
    }

    public setRoutes(...routes: RoutesConfigurer[]): void {
        console.log('Configuring routes...');

        for (const r of routes) {
            r.configureRoutes(this.app);

            debugLog(`Routes configured: ${r.name}`);
        }

        this.setErrorHandler();
    }

    public async initializeServices(...services: Service[]): Promise<void> {
        console.log('Initializing services...');

        for (const s of services) {
            await s.initialize();

            debugLog(`Service initialized: ${s.name}`);
        }
    }

    public listen(): void {
        this.app.listen(this.portNumber, () => {
            console.log(`All done! Server is ready and listening for requests at port ${this.portNumber}.`);
        });
    }

    private setErrorHandler(): void {
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            if (error.canBeSentToClient)
                return res.status(error.statusCode).send(error.errorMessage);

            if (error.type === 'entity.parse.failed')
                return res.status(HttpStatusCode.BAD_REQUEST).send(Strings.error.INVALID_JSON);

            console.log(error);

            res.status(HttpStatusCode.BAD_REQUEST).send(Strings.error.INTERNAL_ERROR);
        });
    }
}
