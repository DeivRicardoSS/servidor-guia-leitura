import { Router } from "express";
import UserController from "../controllers/User.controller.ts";

const router:Router = Router();

router.post('/cadastro', UserController.newUser);

export default router;