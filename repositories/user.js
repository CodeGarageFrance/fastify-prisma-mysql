import { prisma } from '../services/db.js';

export const UserRepository = {
    getUserByCredentials: async (username, password) => {
        const user = await prisma.users.findFirst({
            where: {
                username: username,
                password: password
            }
        });
        return user;
    },
    getUserById: async (id) => {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        return user;
    },
}