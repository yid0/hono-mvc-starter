import metadataAppConfig from '../../config.json';
import {getRuntimeKey} from 'hono/adapter';

// TODO: Add json schema validation

export class Configuration {

    readonly appConfig: Record<string, any>;
    readonly env: any;

    constructor(readonly hono: Hono) {
        this.appConfig = metadataAppConfig;
    }   

    get appUrl(): string {        
        return this.envName === 'production' ? this.appConfig.appUrl.replace('-staging', '') : this.appConfig.appUrl;
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
    get runtime () {
        if (getRuntimeKey() === 'workerd') {
            return 'workerd'
          } else if (getRuntimeKey() === 'node') {
            return 'node'
          }
    } 


    get starsCache() {
        if(this.envName === 'production') {
            return this.env.HMVC_STARS_CACHE_PROD;
        }
        return this.env.HMVC_STARS_CACHE;
    }
      
}