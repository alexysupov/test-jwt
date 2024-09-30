import UsersService from "../services/UsersService.js";

class UsersController {
    async getCurrentUser(req, res) {
        try {
            const data = await UsersService.getUser(req.userId)
            res.status(200).json(data)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }
    }
}

export default new UsersController()