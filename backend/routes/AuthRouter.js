import { Router} from 'express'
import AuthController from "../controllers/AuthController.js";

const router = new Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/refresh', AuthController.refresh)

export default router

