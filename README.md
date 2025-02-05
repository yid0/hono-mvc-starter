# Hono MVC Starter Kit 🚀

A secure and scalable MVC framework built on Hono.js and Cloudflare Workers, emphasizing type safety and modern web security practices.

## Features ✨

- **Robust Security**
  - XSS Protection with HTML Sanitization
  - Content Security Policy (CSP) Headers
  - Environment-based CORS Configuration
  - Rate Limiting with IP Tracking
  - Secure Headers Management

- **Modern Architecture**
  - Clean MVC Pattern
  - TypeScript First
  - Dependency Injection
  - Factory Patterns
  - Component-based Views

- **Production Ready**
  - Cloudflare Workers Integration
  - KV Storage for Caching
  - Environment Configuration
  - Comprehensive Logging
  - Health Monitoring

## Quick Start 🏃‍♂️

```bash
git clone https://github.com/yid0/hono-mvc-starter.git
cd hono-mvc-starter
pnpm install
pnpm run dev
```

## Project Structure 📁

```
src/
├── configuration/    # App & environment configs
├── middleware/      # Request middleware
├── repository/     # Data access layer
├── rest/          # Controllers
├── security/      # Security services
├── services/      # Business logic
├── utils/        # Shared utilities
└── views/        # UI components & templates
```

## Core Components 🔧

### Rate Limiting

Built-in rate limiting middleware with configurable windows:

```typescript
const rateLimiter = new RateLimitMiddleware({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100           // requests per window
});
```

### Routes Configuration

Centralized route management:

```typescript
export const RoutesMap = {
    'home': '/',
    'health': '/health',
    'feedback': '/feedback/:id',
    'feedbacks': '/feedbacks'
};
```

### Controller Factory

Automatic controller initialization:

```typescript
ControllerFactory.createController(app, 'home');
```

## Security Features 🔒

### Content Security Policy
```typescript
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' cdn.jsdelivr.net"
  ].join('; ')
};
```

### HTML Sanitization
```typescript
const sanitizedHtml = HtmlSanitizer.allowedTags(html, [
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'ul', 'li'
]);
```

### CORS Configuration
```typescript
app.use('*', cors({
  origin: (origin, c) => {
    const env = c.env.ENV_NAME || 'production';
    return getAllowedOrigins(env);
  }
}));
```

## Configuration ⚙️

### Environment Setup
```toml
# wrangler.toml
[env.development]
vars = { ENV_NAME = "development" }

[env.staging]
vars = { 
  ENV_NAME = "staging"
  KV_NAMESPACE = "YOUR_STAGING_KV"
}

[env.production]
vars = { 
  ENV_NAME = "production"
  KV_NAMESPACE = "YOUR_PROD_KV"
}
```

### Available Commands
```bash
# Development
pnpm run dev          # Start development server

# Deployment
pnpm run deploy:staging    # Deploy to staging
pnpm run deploy:prod      # Deploy to production

# Testing
pnpm run test            # Run tests
```

## API Documentation 📚

| Endpoint     | Method | Description    | Security      |
|-------------|--------|----------------|---------------|
| `/`         | GET    | Home page      | Rate Limited  |
| `/health`   | GET    | Health check   | Public        |
| `/feedbacks`| GET    | List feedbacks | Sanitized     |
| `/star`     | POST   | Toggle star    | IP Limited    |

## Error Handling 🚨

Global error middleware with customizable logging:

```typescript
app.use('*', async (c, next) => {
  try {
    await next();
  } catch(error) {
    console.error('Global Middleware Error:', error);
  }
});
```

## Deployment with Wrangler 🚀

### Environment Setup

Create environment-specific configurations using Wrangler:

```toml
# wrangler.toml
name = "hono-mvc-starter"
main = "src/index.ts"
compatibility_date = "2023-01-01"

[env.staging]
name = "hono-mvc-starter-staging"
vars = { ENV = "staging" }
kv_namespaces = [
  { binding = "CACHE", id = "YOUR_STAGING_KV_ID" }
]

[env.production]
name = "hono-mvc-starter-prod"
vars = { ENV = "production" }
kv_namespaces = [
  { binding = "CACHE", id = "YOUR_PRODUCTION_KV_ID" }
]

[vars]
VERSION = "1.0.0"
```

### Deployment Commands

```bash
# Deploy to staging
pnpm run deploy:staging    # runs: wrangler deploy --staging

# Deploy to production
pnpm run deploy:prod      # runs: wrangler deploy --production

# Preview locally
pnpm run dev             # runs: wrangler dev
```

### Environment Variables

Configure secrets in Cloudflare dashboard or using Wrangler:

```bash
# Staging
wrangler secret put SECRET_KEY --env staging

# Production
wrangler secret put SECRET_KEY --env production
```

### Monitoring & Logs

Access deployment logs and metrics:

```bash
# View logs
wrangler tail --env staging
wrangler tail --env production

# View KV usage metrics
wrangler kv:namespace list
```

## Best Practices 👌

1. **Controller Pattern**
   - Use factory pattern for controllers
   - Keep controllers thin
   - Move business logic to services

2. **Rate Limiting**
   - Configure per-route limits
   - Monitor rate limit headers
   - Handle 429 responses

3. **Error Handling**
   - Use global error middleware
   - Implement proper logging
   - Return consistent error responses


## License 📄

MIT License - feel free to use and modify for your projects.

## Support 💪

For support, issues, or feature requests, please file an issue through the GitHub issues system.

---

Built with ❤️ by [Yani IDOUGHI](https://github.com/yid0)

[![Stars](https://img.shields.io/github/stars/yid0/hono-mvc-starter)](https://github.com/yid0/hono-mvc-starter/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)