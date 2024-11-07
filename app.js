// Import the framework and instantiate it
import Fastify from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import FastifyAuth from '@fastify/auth';

import { registerPostRoutes } from './controllers/post.js';
import { registerAuthRoutes } from './controllers/auth.js';
import { registerCategoryRoutes } from './controllers/category.js';
import { registerAuthMiddlewares } from './middlewares/auth.js';
import { registerErrorMiddleware } from './middlewares/error.js';

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: { removeAdditional: true }
  }
})
await fastify.register(FastifyAuth);
// Instantiate the documentation
await fastify.register(FastifySwagger, {
  openapi: {
    components: {
      securitySchemes: {
        token: {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
        }
      }
    },
  },
});
await fastify.register(FastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list'
    },
});

registerErrorMiddleware(fastify);
registerAuthMiddlewares(fastify);
registerAuthRoutes(fastify);
registerPostRoutes(fastify);
registerCategoryRoutes(fastify);

// Run the server!
try {
  await fastify.listen({ port: process.env.PORT || 3000, host: process.env.HOST || 'localhost' });
  await fastify.ready();
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}