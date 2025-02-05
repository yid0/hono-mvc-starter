export const getAllowedOrigins = (env: string) => {
  switch(env) {
    case 'development':
      return '*';
    case 'staging':
      return 'https://hono-mvc-staging.yid0.workers.dev';
    case 'production':
      return 'https://hono-mvc.prod.cloudflare.dev';
    default:
      return 'null'; // Bloquer par défaut
  }
};