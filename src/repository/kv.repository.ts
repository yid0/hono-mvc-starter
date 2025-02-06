import { KvNamespace } from 'hono';
import { Repository } from "./repository";

export class KVRepository implements Repository {
    private static instance: KVRepository;
    
    private constructor(private readonly kv: KvNamespace) {
        if (!kv) {
            throw new Error('KV namespace is required');
        }
    }
    
    static getInstance(kv: KvNamespace): KVRepository {
        if (!this.instance) {
            this.instance = new KVRepository(kv);
        }
        return this.instance;
    }

    async save(key: string, data: any): Promise<void> {
        try {
            await this.kv.put(key, JSON.stringify(data));
        } catch (error) {
            console.error('KV save error:', error);
            throw error;
        }
    }

    async findById(id: string): Promise<any> {
        return await this.kv.get(id);
    }

    async find(prefix?: string): Promise<any> {
        return await this.kv.list({ prefix });
    }

    async delete(key: string): Promise<void> {
        await this.kv.delete(key);
    }
}