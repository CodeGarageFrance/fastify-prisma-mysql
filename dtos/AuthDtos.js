export const LoginDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email','password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                email: { type: 'string' },
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
            email: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email','password', 'username'],
        
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                username: { type: 'string' },
            }
        }
    }
};