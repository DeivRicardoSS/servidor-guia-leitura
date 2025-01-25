import { Router } from "express";
import LivroController from "../controllers/Livro.controller.ts";

const router:Router = Router();

router.post('/novo', LivroController.newLivro);

export default router;