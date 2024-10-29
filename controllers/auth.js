import { UserRepository } from "../repositories/user.js";
import { LoginDto } from "../dtos/AuthDtos.js";
import JWT from 'jsonwebtoken';
export function registerAuthRoutes(fastify){

    fastify.post('/login', { schema: LoginDto }, async function login (request, reply) {
        const body = request.body;
        const user = await UserRepository.getUserByCredentials(body.username, body.password);
        if(!user){
            throw new Error('Invalid credentials');
        }
        user.token = JWT.sign({ id: user.id }, 'secret');
        return user;
    })
}