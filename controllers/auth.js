import { UserRepository } from "../repositories/user.js";
import { LoginDto, SignupDto } from "../dtos/AuthDtos.js";
import JWT from 'jsonwebtoken';
import { createHash } from 'crypto';
export function registerAuthRoutes(fastify){

    fastify.post('/login', { schema: LoginDto }, async function login (request, reply) {
        const body = request.body;
        body.password = createHash('sha1').update(body.password+process.env.PASSWORD_SALT).digest('hex');
        const user = await UserRepository.getUserByCredentials(body.email, body.password);
        if(!user){
            throw new Error('Invalid credentials');
        }
        user.token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
        return user;
    });

    fastify.post('/signup', { schema: SignupDto }, async function signup (request, reply) {
        const body = request.body;
        body.password = createHash('sha1').update(body.password+process.env.PASSWORD_SALT).digest('hex');
        const user = await UserRepository.createUser(body);
        return user;
    });
}