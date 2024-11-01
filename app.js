// Import the framework and instantiate it
import Fastify from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import FastifyAuth from '@fastify/auth';
import { registerPostRoutes } from './controllers/post.js';
import { registerAuthRoutes } from './controllers/auth.js';
import { registerAuthMiddlewares } from './middlewares/auth.js';

const fastify = Fastify({
  logger: true
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
    /*uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true*/
});

registerAuthMiddlewares(fastify);
registerAuthRoutes(fastify);
registerPostRoutes(fastify);

// Run the server!
try {
  await fastify.listen({ port: 3000 });
  await fastify.ready();
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}