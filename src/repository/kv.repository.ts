import { KVNamespace } from 'hono';
import { FeedbackDTO } from "../types";
import { Repository } from "./repository";

export class KVRepository implements Repository {

    constructor(private readonly kv: KVNamespace) {
        this.kv = kv;
    }
  
    async save(data: any): Promise<void> { 

        return data;
    }

    async findById(id: string): Promise<any> {
        throw new Error('Not implemented');
    }

    async find(): Promise<FeedbackDTO[]> {
        throw new Error('Not implemented');
    }
}