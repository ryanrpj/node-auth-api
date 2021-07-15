export default abstract class Service {
    public readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public abstract initialize(): Promise<void>;
}