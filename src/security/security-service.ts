export class SecurityService {
    constructor() {}

    async isAllowedOrigin(origin: string, env: string): Promise<boolean> {
        const allowedOrigins = this.getAllowedOrigins(env);
        return allowedOrigins === '*' || allowedOrigins === origin;
    }

    getAllowedOrigins = (env: string) => {
        switch(env) {
          case 'dev':
            return '*';
          case 'staging':
            return 'https://hono-mvc-staging.yid0.workers.dev';
          case 'production':
            return 'https://hono-mvc.prod.yid0.cloudflare.dev';
          default:
            return '';
        }
      };


      getSecurityHeaders () {
       return {
            'Content-Security-Policy': [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' cdn.jsdelivr.net",
              "img-src 'self' data: https:",
              "font-src 'self' cdn.jsdelivr.net",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'"
            ].join('; '),
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
          };
        
      }
  
}