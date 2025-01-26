import { Router } from "express";
import UserController from "../controllers/User.controller.ts";

const router:Router = Router();

router.post('/cadastro', UserController.newUser);
router.post('/login', UserController.login);
router.post('/confirm', UserController.confirmUser);

export default router;