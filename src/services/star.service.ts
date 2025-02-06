import { Repository } from "../repository/repository";

export class StarService {
    private readonly KEY_PREFIX = 'star:';

    constructor(private readonly repository: Repository) {

        
    }

    async addStar(identifier: string): Promise<void> {
        const key = this.getKey(identifier);
        this.repository.save(key, 'true');     
    }

    async removeStar(identifier: string): Promise<void> {
        const key = this.getKey(identifier);
        await this.repository.delete(key);
    }

    async hasStarred(identifier: string): Promise<boolean> {
        const key = this.getKey(identifier);
        const value = await this.repository.findById(key);
        return value === 'true';
    }

    async getTotalStars(): Promise<number> {
        const result = await this.repository.find(this.KEY_PREFIX);
        return result.keys.length;
    }

    private getKey(identifier: string): string {
        return `${this.KEY_PREFIX}${identifier}`;
    }
}