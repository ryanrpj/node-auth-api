import { Application } from 'express';

export default abstract class RoutesConfigurer {
    public readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public abstract configureRoutes(app: Application): void;
}