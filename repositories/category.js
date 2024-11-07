import { prisma } from '../services/db.js';
import { NotFoundError } from '../utils/errors.js';

export const CategoryRepository = {
    getCategories: async (page, limit) => {
        const categories = await prisma.Category.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
        return categories;
    },
    getCategory: async (id) => {
        const category = await prisma.Category.findUnique({
            where: {
                id: id
            }
        });
        if(!category){
            throw new NotFoundError('Category not found');
            //throw new Error('Category not found');
        }
        return category;
    },
    createCategory: async (category) => {
        const newCategory = await prisma.Category.create({
            data: category
        });
        return newCategory;
    },
    updateCategory: async (id, category) => {
        const oldcategory = await prisma.Category.findUnique({
            where: {
                id: id
            }
        });
        if(!oldcategory){
            throw new Error('Category not found');
        }
        const newCategory = await prisma.Category.update({
            where: {
                id: id
            },
            data: category
        });
        return newCategory;
    },
    deleteCategory: async (id) => {
        const oldcategory = await prisma.Category.findUnique({
            where: {
                id: id
            }
        });
        if(!oldcategory){
            throw new Error('Category not found');
        }
        const category = await prisma.Category.delete({
            where: {
                id: id
            }
        });
        return category;
    }
}