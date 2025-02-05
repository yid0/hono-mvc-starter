import { Configuration } from "../configuration/configuration";

export class StarService {
    private readonly KEY_PREFIX = 'star:';
    
    constructor(private readonly configuration: Configuration) {}

    async addStar(identifier: string): Promise<void> {
        const key = this.getKey(identifier);
        await this.configuration.starsCache.put(key, 'true', {
            expirationTtl: 60 * 60 * 24 * 30 // 30 jours
        });
    }

    async removeStar(identifier: string): Promise<void> {
        const key = this.getKey(identifier);
        await this.configuration.starsCache.delete(key);
    }

    async hasStarred(identifier: string): Promise<boolean> {
        const key = this.getKey(identifier);
        const value = await this.configuration.starsCache.get(key);
        return value === 'true';
    }

    async getTotalStars(): Promise<number> {
        const { keys } = await this.configuration.starsCache.list({ prefix: `${this.KEY_PREFIX}${this.configuration.envName}`});
        return keys.length;
    }

    private getKey(identifier: string): string {
        return `${this.KEY_PREFIX}${this.configuration.envName}:${identifier}`;
    }
}