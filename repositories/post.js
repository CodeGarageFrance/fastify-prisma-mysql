import { prisma } from '../services/db.js';
export const PostRepository = {
    getPosts: async (page, limit) => {
        const posts = await prisma.posts.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
        return posts;
    },
    getPost: async (id) => {
        const post = await prisma.posts.findUnique({
            where: {
                id: id
            }
        });
        if(!post){
            throw new Error('Post not found');
        }
        return post;
    },
    createPost: async (post) => {
        const newPost = await prisma.posts.create({
            data: post
        });
        return newPost;
    },
    updatePost: async (id, post) => {
        const oldpost = await prisma.posts.findUnique({
            where: {
                id: id
            }
        });
        if(!oldpost){
            throw new Error('Post not found');
        }
        const newPost = await prisma.posts.update({
            where: {
                id: id
            },
            data: post
        });
        return newPost;
    },
    deletePost: async (id) => {
        const post = await prisma.posts.delete({
            where: {
                id: id
            }
        });
        return post;
    }
}