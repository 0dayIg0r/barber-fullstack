import { Router, Request, Response } from "express";
import CreateUserController from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { UserDetailController } from "./controller/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controller/user/UpdateUserController";
import { CreateHaircutController } from "./controller/haircut/CreateHairCutController";
import { ListHaircutController } from "./controller/haircut/ListHaircutsController";
import { UpdateHaircutController } from "./controller/haircut/UpdateHaircutController";
import { CheckSubController } from "./controller/haircut/CheckSubController";
const router = Router();

// ROTAS USER
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new UserDetailController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

//ROTAS CORTE DE CABELO
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircut", isAuthenticated, new ListHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
router.get("/haircut/check", isAuthenticated, new CheckSubController().handle);
export { router };
