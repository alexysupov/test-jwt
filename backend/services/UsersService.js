import { Users } from "../models/index.js";
import bcrypt from "bcrypt";

class UsersService {
    async getUser(userId, exclude = ['password']) {
        try {
            return await Users.findByPk(userId, {
                attributes: { exclude }
            })
        }
        catch ({ message }) {
            throw Error(message)
        }
    }

    async updateUser(userId, userData) {
        try {
            const [count, updated] = await Users.update(userData, {
                where: { id: userId },
                returning: true,
                plain: true,
            })

            return updated
        }
        catch ({ message }) {
            throw Error(message)
        }
    }

    async comparePasswords(rawPassword, hashPassword) {
        try {
            return await bcrypt.compare(rawPassword, hashPassword)
        }
        catch (e) {
            throw Error('Error compare passwords')
        }
    }
}

export default new UsersService()