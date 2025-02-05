# Hono MVC Starter Kit 🚀

A lightweight, type-safe MVC framework built on top of Hono.js for building scalable web applications.

## Features ✨

- **MVC Architecture**: Clean separation of concerns
- **Type Safety**: Built with TypeScript
- **Rate Limiting**: Built-in protection against abuse
- **CORS Support**: Configurable cross-origin resource sharing
- **Factory Pattern**: Automated controller registration
- **Dependency Injection**: Clean and testable code structure
- **Configuration Management**: Environment-based configuration

## Quick Start 🏃‍♂️

```bash
# Clone the repository
git clone https://github.com/yourusername/hono-mvc-starter.git

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

## Project Structure 📁

```
src/
├── configuration/     # App configuration
├── middleware/       # Custom middlewares
├── repository/      # Data access layer
├── rest/           # Controllers
└── services/       # Business logic
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

## API Endpoints 🌐

| Endpoint           | Method | Description           | Rate Limit |
|-------------------|--------|-----------------------|------------|
| `/`               | GET    | Home page            | 100/15min  |
| `/health`         | GET    | Health check         | 100/15min  |
| `/feedback/:id`   | GET    | Get feedback by ID   | 100/15min  |
| `/feedbacks`      | GET    | List all feedbacks   | 100/15min  |

## Security Features 🔒

- Rate limiting with IP tracking
- Headers security (no exposure of sensitive headers)
- CORS configuration
- Request validation

## Configuration ⚙️

Environment variables:

```env
VERSION=1.0.0
ENV=development
```

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

Built with ❤️ using [Hono.js](https://honojs.dev/)