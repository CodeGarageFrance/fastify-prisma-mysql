import { prisma } from '../services/db.js';
import { NotFoundError } from '../utils/errors.js';

export const PostRepository = {
    getPosts: async (page, limit) => {
        const posts = await prisma.Post.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return posts;
    },
    getPost: async (id) => {
        const post = await prisma.Post.findUnique({
            where: {
                id: id
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        if(!post){
            throw new NotFoundError('Post not found');
            //throw new Error('Post not found');
        }
        return post;
    },
    createPost: async (post) => {
        const newPost = await prisma.Post.create({
            data: post,
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return newPost;
    },
    updatePost: async (id, post) => {
        const oldpost = await prisma.Post.findUnique({
            where: {
                id: id
            }
        });
        if(!oldpost){
            throw new NotFoundError('Post not found');
        }
        const newPost = await prisma.Post.update({
            where: {
                id: id
            },
            data: post,
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return newPost;
    },
    addPostCategory: async (postId, categoryId) => {
        const post = await prisma.Post.findUnique({
            where: {
                id: postId
            }
        });
        if(!post){
            throw new NotFoundError('Post not found');
        }
        const category = await prisma.Category.findUnique({
            where: {
                id: categoryId
            }
        });
        if(!category){
            throw new NotFoundError('Category not found');
        }
        const postCategory = await prisma.PostCategory.create({
            data: {
                postId: postId,
                categoryId: categoryId
            }
        });
        return postCategory;
    },
    deletePost: async (id) => {
        const oldpost = await prisma.Post.findUnique({
            where: {
                id: id
            }
        });
        if(!oldpost){
            throw new NotFoundError('Post not found');
        }
        const post = await prisma.Post.delete({
            where: {
                id: id
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return post;
    }
}