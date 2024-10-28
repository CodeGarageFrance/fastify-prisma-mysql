// Import the framework and instantiate it
import Fastify from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import { registerPostRoutes } from './controllers/post.js';

const fastify = Fastify({
  logger: true
})

// Instantiate the documentation
await fastify.register(FastifySwagger);
await fastify.register(FastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
});

registerPostRoutes(fastify);

// Run the server!
try {
  await fastify.listen({ port: 3000 });
  await fastify.ready();
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}