import metadataAppConfig from '../../config.json';
import { RoutesMap } from './routes';

export class Configuration {

    readonly appConfig: Record<string, any>;
    readonly routes: Record<string, any>;

    constructor(readonly app: Hono, private readonly env : any) {
        
        this.env = env;
        this.appConfig = metadataAppConfig;
        this.routes = RoutesMap;
        console.log('Configuration loaded successfully', this.env);

    }   

    get starsCache() {
        return this.env.HMVC_STARS_CACHE
    }

    get envName (): string {
        return this.env.ENV_NAME;
    }

    get appName (): string {
        return this.appConfig.appName;
    }

    get description (): string {
        return this.appConfig.description;
    }

    get appDescription (): string {
        return this.appConfig.description;
    } 

    get version (): string {
        return this.env.VERSION;
    }

    get bootstrap (): {cssUrl: string, jsUrl: string} {
        return {
            cssUrl: this.appConfig.bootstrap.cssUrl,
            jsUrl: this.appConfig.bootstrap.jsUrl
        }
    }
      
}