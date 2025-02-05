import { Context, Next } from 'hono';

interface RateLimitConfig {
  windowMs: number;      
  maxRequests: number;   
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export class RateLimitMiddleware {
  private requests: WeakMap<object, RateLimitInfo>;
  private readonly config: RateLimitConfig;
  private ipObjects: Map<string, { key: object, timestamp: number }>;

  constructor(config?: Partial<RateLimitConfig>) {
    this.requests = new WeakMap();
    this.ipObjects = new Map();
    this.config = {
      windowMs: config?.windowMs || 60 * 1000,
      maxRequests: config?.maxRequests || 100
    };
  }

  handle() {
    return async (c: Context, next: Next) => {
      const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
      const now = Date.now();

      // Get or create the IP object with the timestamp
      let ipData = this.ipObjects.get(ip);
      if (!ipData) {
        ipData = { 
          key: { ip },
          timestamp: now 
        };
        this.ipObjects.set(ip, ipData);
      }

      let requestInfo = this.requests.get(ipData.key);
      
      // Check if the request is in the current window
      if (!requestInfo || now - ipData.timestamp >= this.config.windowMs) {

        // Create a new window
        requestInfo = {
          count: 0,
          resetTime: now + this.config.windowMs
        };

        ipData.timestamp = now; // Update the timestamp
        this.ipObjects.set(ip, ipData);
      }

      requestInfo.count++;
      this.requests.set(ipData.key, requestInfo);

      // Envoyer les headers sans les exposer via CORS
      c.header('X-RateLimit-Limit', this.config.maxRequests.toString());
      c.header('X-RateLimit-Remaining', 
        Math.max(0, this.config.maxRequests - requestInfo.count).toString());

      if (requestInfo.count > this.config.maxRequests) {
        return c.json({ error: 'Too many requests' }, 429);
      }

      return next();
    };
  }
}