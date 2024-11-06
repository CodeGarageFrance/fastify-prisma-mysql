const ExistingPostDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
    },
    required: ['id', 'title', 'content']
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