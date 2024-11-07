import { CreatePostDto, UpdatePostDto, GetPostsDto, CreatePostCategoryDto, DeletePostDto } from "../dtos/PostDtos.js";
import { PostRepository } from "../repositories/post.js";
import { NotAuthorizedError } from "../utils/errors.js";

export function registerPostRoutes(fastify){
    fastify.get('/posts', { schema: GetPostsDto }, async function getPosts (request, reply) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await PostRepository.getPosts(page, limit);
    })
    
    fastify.get('/posts/:id', async function getPost (request, reply) {
        const id = parseInt(request.params.id);
        return await PostRepository.getPost(id);
    })
    
    fastify.post('/posts', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto
    }, async function createPost (request, reply) {
        const userId = request.user.id;
        const newPost = request.body;
        newPost.authorId = userId;
        return await PostRepository.createPost(newPost);
    });
    
    fastify.put('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdatePostDto
    }, async function updatePost (request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body;
        const authUser = request.user;
        const existingPost = await PostRepository.getPost(id);
        if(authUser.id !== existingPost.authorId){
            throw new NotAuthorizedError('You cannot modify someone else Post');
        }
        return await PostRepository.updatePost(id, body);
    });
    
    fastify.delete('/posts/:id',{
        preHandler: fastify.auth([fastify.authUser]),
        schema: DeletePostDto
    }, async function deletePost (request, reply) {
        const id = parseInt(request.params.id);
        return await PostRepository.deletePost(id);
    });

    fastify.post('/posts/:id/categories/:categoryId', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostCategoryDto
    }, async function addPostCategory (request, reply) {
        const postId = parseInt(request.params.id);
        const categoryId = parseInt(request.params.categoryId);
        return await PostRepository.addPostCategory(postId, categoryId);
    });
}