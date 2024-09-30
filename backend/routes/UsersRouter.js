import { Router} from 'express'
import {authorization} from "../middleware/index.js";
import UsersController from "../controllers/UsersController.js";

const router = new Router()

router.get('/me', authorization, UsersController.getCurrentUser)

export default router