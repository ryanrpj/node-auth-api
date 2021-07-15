import mongoose, { ConnectionOptions } from 'mongoose';
import debug, { IDebugger } from 'debug';

import { Service } from "../classes";

const debugLog: IDebugger = debug('app: Mongoose Service');

export default class MongooseService extends Service {
    private countOfConnectionAttempts = 0;
    private readonly secondsUntilRetryConnection = 5;
    private readonly connectionOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: this.secondsUntilRetryConnection * 5,
    };

    public constructor() {
        super('Mongoose Service');
    }

    public initialize(): Promise<void> {
        return new Promise(resolve => this.tryConnect(resolve));
    }

    private async tryConnect(callback: Function): Promise<void> {
        debugLog(`Trying to reach MongoDB Database... {Attempt #${++this.countOfConnectionAttempts}}`);

        try {
            await mongoose.connect(process.env.MONGODB_CONNECTION_URI!, this.connectionOptions);
            debugLog(`Successfully connected to MongoDB Database!`);
            callback();
        } catch {
            debugLog(`Failed to reach MongoDB Database. Automatically retrying in ${this.secondsUntilRetryConnection} seconds...`);
            setTimeout(() => this.tryConnect(callback), this.secondsUntilRetryConnection * 1000);
        }
    }
}