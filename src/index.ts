import { Context, Hono,Next, KVNamespace } from 'hono';
import { cors } from 'hono/cors';
import { Configuration } from './configuration/configuration';
import { ControllerFactory } from './configuration/controller-factory';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

type Env = {
  CACHE: KVNamespace,
  HMVC_STARS_CACHE: KVNamespace;

  VERSION: string;
  ENV_NAME: string;
}

const app = new Hono<{Bindings: Env}>();

let configuration: Configuration;

const rateLimiter = new RateLimitMiddleware({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100           // 100 request per 15 minutes
});


app.use('*', cors({
  origin: '*' // set the origin to allow all requests
}));

// Global middleware, each request will be handled by this middleware 
app.use('*', rateLimiter.handle(), async (c: Context, next: Next) => { 

  try {

    // Initialize the configuration with env for each request
    configuration = new Configuration(app, c.env);
    c.configuration = configuration;  
    await next();

  } catch(error: any)  {
    // TODO: Add custom logger to support different logging levels and intergation 
    console.error('Global Middleware Error:', error);  
  }

});

// Important: Le contrôleur doit être initialisé après le middleware de configuration
 ControllerFactory.createController(app, 'home');

export default app;