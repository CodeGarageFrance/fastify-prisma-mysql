import { ExistingCategoryDto } from './CategoryDtos.js';
import { PublicUserDto } from './UserDtos.js';

const PostCategoryDto = {
    type: 'object',
    properties: {
        category: ExistingCategoryDto,
    },
};

const ExistingPostDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        author: PublicUserDto,
        categories: {
            type: 'array',
            items: PostCategoryDto
        }
    },
    required: ['id', 'title', 'content', 'author']
};

export const CreatePostDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
        required: ['title', 'content'],
    },
    response: {
        200: ExistingPostDto
    }
};

export const GetPostsDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'array',
            items: ExistingPostDto
        }
    }
};

export const UpdatePostDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'}
        }   
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
    },
    response: {
        200: ExistingPostDto
    }
};

export const DeletePostDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'}
        }   
    },
    response: {
        200: ExistingPostDto
    }
};

export const CreatePostCategoryDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
            categoryId: { type: 'number'}
        }   
    },
};