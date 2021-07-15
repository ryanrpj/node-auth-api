export default interface CRUD {
    create(resource: any): Promise<string>;
    getById(id: string): Promise<any>;
    list(limit: number, page: number): Promise<any[]>;
    patchById(id: string, resource: any): Promise<any>;
    putById(id: string, resource: any): Promise<any>;
    deleteById(id: string): Promise<any>;
}