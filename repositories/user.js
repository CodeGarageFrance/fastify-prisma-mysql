import { prisma } from '../services/db.js';

export const UserRepository = {
    getUserByCredentials: async (email, password) => {
        const user = await prisma.User.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        return user;
    },
    getUserById: async (id) => {
        const user = await prisma.User.findUnique({
            where: {
                id: id
            }
        });
        return user;
    },
    createUser: async (user) => {
        const newUser = await prisma.User.create({
            data: user
        });
        return newUser;
    },
}