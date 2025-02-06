# Hono MVC Starter Kit 🚀

## Technical Overview 🔍

A full-featured MVC framework built on Hono and Cloudflare Workers, implementing enterprise-level patterns and practices.

### Core Technologies
- **Hono**: Edge-first web framework
- **TypeScript**: Type safety and modern JavaScript features
- **Cloudflare Workers**: Serverless computing platform
- **KV Storage**: Distributed key-value storage
- **Wrangler**: Cloudflare Workers CLI tool

## Features & Implementation Details 🎯

### Core Features
- **MVC Architecture & TypeScript**: Full type safety and separation of concerns
- **Component-Based Views**: Reusable UI components with minimal JavaScript
- **Service Factory Pattern**: Centralized service management and initialization
- **KV Storage Integration**: Efficient data persistence with Cloudflare KV
- **Rate Limiting & Security**: Built-in protection against abuse
- **Environment Management**: Development, staging, and production configs

### Architectural Components

```
Application Layers:
┌─────────────────┐
│   Controllers   │ Request handling & response management
├─────────────────┤
│    Services     │ Business logic & data processing
├─────────────────┤
│  Repositories   │ Data access & persistence
├─────────────────┤
│     Views      │ UI components & templates
└─────────────────┘
```

### Key Implementation Features

1. **Smart Service Initialization**
    ```typescript
    private initStarService() {
      if (!this.starService) {
        this.starService = ServiceFactory.createService('star', this.configuration. starsCache);
      }
    }
    ```

2. **Singleton Pattern for KV Storage**
   ```typescript
   class KVRepository {
     private static instance: KVRepository;
     static getInstance(kv: KVNamespace): KVRepository {
       if (!this.instance) {
         this.instance = new KVRepository(kv);
       }
       return this.instance;
     }
   }
   ```

3. **Component-Based Views**
   ```typescript
   export const layout = (data: Data) => {
     const {configuration, feedbacks, totalPages, page} = data;
     return html`
       // Template composition
     `;
   }
   ```

4. **Security & Rate Limiting**
   ```typescript
   app.use('*', rateLimiter.handle(), async (c, next) => {
     // Rate limiting & security headers
   });
   ```

## Architecture Details 🏗️

### Directory Structure
```
src/
├── configuration/           # Application configuration
│   ├── configuration.ts    # Environment & settings management
│   ├── routes.ts          # Centralized route definitions
│   └── factory.ts         # Dependency injection system
│
├── middleware/             # Request/Response pipeline
│   ├── rate-limit.ts      # Rate limiting implementation
│   └── security.ts        # Security headers & policies
│
├── repository/            # Data access layer
│   ├── repository.ts     # Base repository interface
│   ├── kv.repository.ts  # KV storage implementation
│   └── feedback.repository.ts
│
├── services/             # Business logic layer
│   ├── factory.service.ts   # Service factory pattern
│   ├── star.service.ts     # Star functionality
│   └── feedback.service.ts  # Feedback management
│
├── views/                # Presentation layer
│   ├── components/       # Reusable UI components
│   │   ├── layout.ts    # Base layout template
│   │   ├── navbar.ts    # Navigation component
│   │   └── feedback.ts  # Feedback display
│   ├── scripts/         # Client-side JavaScript
│   └── styles/          # CSS & styling
│
└── rest/                # Controllers
    └── home.controller.ts
```

## Architecture & Design Patterns 🏗️

### Project Structure
```
src/
├── configuration/           # Configuration Layer
│   ├── configuration.ts    # Application settings & environment variables
│   ├── routes.ts          # Route definitions
│   └── controller-factory.ts # Controller initialization & DI
│
├── middleware/             # Infrastructure Layer
│   ├── rate-limit.ts      # Request throttling
│   └── security.ts        # Security headers & policies
│
├── repository/            # Data Access Layer
│   ├── repository.ts     # Generic repository interface
│   ├── kv.repository.ts  # Cloudflare KV implementation
│   └── feedback.repository.ts # Feedback-specific data access
│
├── services/             # Business Logic Layer
│   ├── factory.service.ts # Service initialization & lifecycle
│   ├── star.service.ts    # Star management logic
│   └── feedback.service.ts # Feedback business rules
│
├── views/                # Presentation Layer
│   ├── components/       # UI Components
│   ├── scripts/         # Client-side interactivity
│   └── styles/          # Visual styling
│
└── rest/                # Controller Layer
    └── home.controller.ts # Route handling & view composition
```

### Layer Responsibilities

#### 1. Configuration Layer
- Environment-specific settings
- Route definitions
- Dependency injection
- Application bootstrapping

#### 2. Infrastructure Layer (Middleware)
- Request/Response pipeline
- Cross-cutting concerns
- Security implementations
- Performance optimizations

#### 3. Data Access Layer (Repository)
- Data persistence abstraction
- KV storage operations
- Data mapping & transformation
- CRUD operations

#### 4. Business Logic Layer (Services)
- Core business rules
- Service lifecyle management
- Cross-repository operations
- Data validation & processing

#### 5. Presentation Layer (Views)
- HTML templates
- Component composition
- UI interaction handling
- Client-side assets

#### 6. Controller Layer
- Request handling
- Route management
- Service orchestration
- Response composition

### Design Patterns Used

1. **Repository Pattern**
   ```typescript
   interface Repository {
     save(key: string, data: any): Promise<void>;
     findById(id: string): Promise<any>;
     find(prefix?: string): Promise<any>;
     delete(key: string): Promise<void>;
   }
   ```

2. **Factory Pattern**
   ```typescript
   class ServiceFactory {
     static createService(type: string, kv: KVNamespace) {
       // Service instantiation with dependencies
     }
   }
   ```

3. **Singleton Pattern**
   ```typescript
   class KVRepository {
     private static instance: KVRepository;
     static getInstance(kv: KVNamespace): KVRepository {
       // Single instance management
     }
   }
   ```

4. **Dependency Injection**
   ```typescript
   class HomeController {
     constructor(
       private readonly configuration: Configuration,
       private readonly starService: StarService
     ) {}
   }
   ```

### Data Flow Example

1. **Star Toggle Operation**
```
Client Request
  │
  ▼
Rate Limit Middleware
  │
  ▼
Security Middleware
  │
  ▼
Home Controller
  │
  ▼
Star Service
  │
  ▼
KV Repository
  │
  ▼
Cloudflare KV Storage
```

## Implementation Details 📝

### Service Layer Implementation

```typescript
// Example of Service Factory Pattern
class ServiceFactory {
    private static services = new Map<string, any>();

    static createService(type: string, kv: KVNamespace) {
        if (!this.services.has(type)) {
            const repository = KVRepository.getInstance(kv);
            switch(type) {
                case 'star': return new StarService(repository);
                case 'feedback': return new FeedBackService(repository);
            }
        }
        return this.services.get(type);
    }
}
```

### Repository Pattern

```typescript
// KV Repository Implementation
class KVRepository implements Repository {
    private static instance: KVRepository;
    
    static getInstance(kv: KVNamespace): KVRepository {
        if (!this.instance) {
            this.instance = new KVRepository(kv);
        }
        return this.instance;
    }
    
    // CRUD operations...
}
```

## Security Features 🛡️

### Rate Limiting
```typescript
const rateLimiter = new RateLimitMiddleware({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    maxRequests: 100           // requests per window
});
```

### Content Security Policy
```typescript
const securityHeaders = {
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'"
    ].join('; ')
};
```

## Environment Configuration ⚙️

### Development Setup
```toml
# wrangler.toml
[env.development]
name = "hono-mvc-dev"
kv_namespaces = [
    { binding = "HMVC_STARS_CACHE", id = "dev-kv-id" }
]

[env.development.vars]
VERSION = "1.0.0"
ENV_NAME = "development"
```

### Production Setup
```toml
[env.production]
name = "hono-mvc"
kv_namespaces = [
    { binding = "HMVC_STARS_CACHE_PROD", id = "prod-kv-id" }
]

[env.production.vars]
VERSION = "1.0.0"
ENV_NAME = "production"
```

## API Documentation 📚

### REST Endpoints

| Endpoint        | Method | Description         | Authentication |
|----------------|--------|---------------------|----------------|
| `/`            | GET    | Main application    | Public         |
| `/health`      | GET    | Health check        | Public         |
| `/star`        | POST   | Toggle star status  | IP Limited     |
| `/star/check`  | GET    | Check star status   | IP Limited     |
| `/feedbacks`   | GET    | List feedbacks      | Public         |

### Response Examples

#### Health Check
```json
{
    "status": "UP",
    "version": "1.0.0",
    "environment": "production"
}
```

#### Star Toggle
```json
{
    "starred": true,
    "timestamp": "2024-01-20T12:00:00Z"
}
```

## Development Guide 💻

### Prerequisites
- Node.js 18+
- pnpm
- Wrangler CLI

### Installation
```bash
# Install dependencies
pnpm install

# Configure environment
cp wrangler.example.toml wrangler.toml
```

### Development Commands
```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Deployment Process
```bash
# Deploy to staging
pnpm run deploy:staging

# Deploy to production
pnpm run deploy:prod
```

## Performance Optimizations 🚀

1. **KV Caching Strategy**
   - Singleton pattern for KV instances
   - Optimized query patterns
   - Lazy loading of services

2. **View Rendering**
   - Component-based architecture
   - Minimal client-side JavaScript
   - Efficient template rendering

## Error Handling 🚨

```typescript
// Global error middleware
app.use('*', async (c, next) => {
    try {
        await next();
    } catch (error) {
        console.error('Global error:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});
```

## License 📄

MIT License 

## Author 👨‍💻

[Yani IDOUGHI](https://github.com/yid0)

---

Built with ❤️ using Hono and Cloudflare Workers