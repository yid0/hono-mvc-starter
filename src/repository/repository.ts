export interface Repository {
    findById: (id: string) => Promise<any>;
    find:() => Promise<any>;
    save:(data: any) => Promise<any>;
}