import { CreatePostDto, GetPostsDto } from "../dtos/PostDtos.js";
import { PostRepository } from "../repositories/post.js";

export function registerPostRoutes(fastify){
    fastify.get('/posts', { schema: GetPostsDto }, async function getPosts (request, reply) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await PostRepository.getPosts(page, limit);
    })
    
    fastify.get('/posts/:id', async function getPost (request, reply) {
        const id = parseInt(request.params.id);
        console.log("[DEBUG]", id);
        return await PostRepository.getPost(id);
    })
    
    fastify.post('/posts', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto
    }, async function createPost (request, reply) {
        const body = request.body;
        return await PostRepository.createPost(body);
    })
    
    fastify.put('/posts/:id', async function updatePost (request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body;
        return await PostRepository.updatePost(id, body);
    })
    
    fastify.delete('/posts/:id', async function deletePost (request, reply) {
        const id = parseInt(request.params.id);
        return await PostRepository.deletePost(id);
    })
}