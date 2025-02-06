export interface Repository {
    findById(id: string) : Promise<any>;
    find(prefix?: string) : Promise<any>;
    save(key: string, data: any): Promise<any>;
    delete(key: string): Promise<any>;
    findPaginated?(page: number, limit: number): Promise<any>;
}