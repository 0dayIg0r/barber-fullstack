import { Router, Request, Response } from "express";
import CreateUserController from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { UserDetailController } from "./controller/user/UserDetailController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
const router = Router();

// ROTAS USER
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new UserDetailController().handle)
export { router };
