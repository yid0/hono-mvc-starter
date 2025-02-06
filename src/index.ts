import { Context, Hono, KVNamespace, Next } from 'hono';
import { cors } from 'hono/cors';
import { Configuration } from './configuration/configuration';
import { ControllerFactory } from './rest/factory.controller';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { getAllowedOrigins } from './security/origin';
import { SecurityService } from './security/security-service';
import { layout } from './views/components/layout';
import { aboutPage } from './views/pages/about';
import { homePage } from './views/pages/home';


declare module 'hono' {
  interface ContextVariableMap {
    configuration: Configuration;
  }
}

type Env = {
  HMVC_STARS_CACHE: KVNamespace,
  HMVC_STARS_CACHE_PROD: KVNamespace,  // Ajout du KV prod
  VERSION: string;
  ENV_NAME: string;
}

const app = new Hono<{Bindings: Env}>();

// app.use('/static/*', serveStatic({ root: './public' }))
// Route Accueil
app.get('/index', (c) => {
  return c.html(layout(homePage()))
});

app.get('/about', (c) => {
  return c.html(layout(aboutPage()))
})

const globalConfig = new Configuration(app);

const rateLimiter = new RateLimitMiddleware({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100           // 100 request per 15 minutes
});


app.use('*', async (c: Context, next: Next) => {
  const securityService = new SecurityService();  

  Object.entries(securityService.getSecurityHeaders()).forEach(([key, value]) => {
    c.header(key, value);
  });
  await next();
});

app.use('*', cors({ origin: (origin: string, c: Context) => 
    {    
      const env = c.env.ENV_NAME || 'production';    
      const allowedOrigin = getAllowedOrigins(env);       
      if (allowedOrigin === '*') {      
        return origin;    
      }    
      
      return origin === allowedOrigin ? origin : null;  
    } 
  }));


// Global middleware, each request will be handled by this middleware 
app.use('*', rateLimiter.handle(), async (c: Context, next: Next) => { 

  try {

    globalConfig.env = c.env;

    if(typeof globalConfig.starsCache === 'undefined') {
      throw new Error('Stars cache is not defined');
    }

    await next();

  } catch(error: any)  {
    // TODO: Add custom logger to support different logging levels and intergation 
    console.error('Global Middleware Error:', error);  
  }
});

// Important: Le contrôleur doit être initialisé après le middleware de configuration
ControllerFactory.createController(app, globalConfig , 'home', );

export default app;