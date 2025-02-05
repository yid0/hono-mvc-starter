import { Context, Hono, KVNamespace, Next } from 'hono';
import { cors } from 'hono/cors';
import { Configuration } from './configuration/configuration';
import { ControllerFactory } from './configuration/controller-factory';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { getAllowedOrigins } from './security/origin';
import { SecurityService } from './security/security-service';

type Env = {
  HMVC_STARS_CACHE: KVNamespace,
  VERSION: string;
  ENV_NAME: string;
}

const app = new Hono<{Bindings: Env}>();

let configuration: Configuration;

const rateLimiter = new RateLimitMiddleware({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100           // 100 request per 15 minutes
});


app.use('*', async (c, next) => {
  const securityService = new SecurityService();  

  Object.entries(securityService.getSecurityHeaders()).forEach(([key, value]) => {
    c.header(key, value);
  });
  await next();
});

app.use('*', cors({  origin: (origin, c) => 
  {    
    const env = c.env.ENV_NAME || 'production';    
    const allowedOrigin = getAllowedOrigins(env);       
    if (allowedOrigin === '*') {      
      return origin;    
    }    
    return origin === allowedOrigin ? origin : null;  } 
  }));


// Global middleware, each request will be handled by this middleware 
app.use('*', rateLimiter.handle(), async (c: Context, next: Next) => { 

  try {

    // Initialize the configuration with env for each request
    configuration = new Configuration(app, c.env);
    c.configuration = configuration;     
    await next(c);

  } catch(error: any)  {
    // TODO: Add custom logger to support different logging levels and intergation 
    console.error('Global Middleware Error:', error);  
  }

});

 // Create a controller for the home page
 ControllerFactory.createController(app, 'home');

export default app;