import metadataAppConfig from '../../config.json';

// TODO: Add json schema validation

export class Configuration {

    readonly appConfig: Record<string, any>;

    constructor(readonly app: Hono, private readonly env : any) {
        
        this.env = env;
        this.appConfig = metadataAppConfig;        
        console.log('Configuration loaded successfully', this.env);
    }   


    get envName (): string {
        return this.env.ENV_NAME;
    }

    get appName (): string {
        return this.appConfig.appName;
    }

    get appDescription (): string {
        return this.appConfig.description;
    } 
    get appVersion (): string { 
        return this.env.VERSION;
    }

    get author (): Record<string, string> {
        return this.appConfig.author;
    }

    get bootstrap (): {cssUrl: string, jsUrl: string} {
        return {
            cssUrl: this.appConfig.bootstrap.cssUrl,
            jsUrl: this.appConfig.bootstrap.jsUrl
        }
    }
    
    get starsCache() {
        return this.env.HMVC_STARS_CACHE
    }
      
}