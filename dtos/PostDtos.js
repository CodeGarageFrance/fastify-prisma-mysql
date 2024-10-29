export const CreatePostDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
        },
        required: ['title'],
    }
};

export const GetPostsDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' }
        }
    }
};