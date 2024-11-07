export const ExistingCategoryDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' }
    },
    required: ['id', 'name']
};

export const CreateCategoryDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: ['name'],
    },
    response: {
        200: ExistingCategoryDto
    }
};

export const GetCategoriesDto = {
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
            items: ExistingCategoryDto
        }
    }
};

export const UpdateCategoryDto = {
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
            name: { type: 'string' },
        },
    },
    response: {
        200: ExistingCategoryDto
    }
};

export const DeleteCategoryDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'}
        }   
    },
    response: {
        200: ExistingCategoryDto
    }
};