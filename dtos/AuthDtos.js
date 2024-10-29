export const LoginDto = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['username','password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                token: { type: 'string' }
            }
        }
    }
};

export const SignupDto = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['username','password'],
    }
};