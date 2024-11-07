import { CreateCategoryDto, UpdateCategoryDto, GetCategoriesDto } from "../dtos/CategoryDtos.js";
import { CategoryRepository } from "../repositories/category.js";
import { NotAuthorizedError } from "../utils/errors.js";

export function registerCategoryRoutes(fastify){
    fastify.get('/categories', { schema: GetCategoriesDto }, async function getCategories (request, reply) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await CategoryRepository.getCategories(page, limit);
    })
    
    fastify.get('/categories/:id', async function getCategory (request, reply) {
        const id = parseInt(request.params.id);
        return await CategoryRepository.getCategory(id);
    })
    
    fastify.post('/categories', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreateCategoryDto
    }, async function createCategory (request, reply) {
        const newCategory = request.body;
        return await CategoryRepository.createCategory(newCategory);
    });
    
    fastify.put('/categories/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdateCategoryDto
    }, async function updateCategory (request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body;
        return await CategoryRepository.updateCategory(id, body);
    });
    
    fastify.delete('/categories/:id', async function deleteCategory (request, reply) {
        const id = parseInt(request.params.id);
        return await CategoryRepository.deleteCategory(id);
    });
}