import { Router } from "express";
import LivroController from "../controllers/Livro.controller.ts";
import upload from "../controllers/Upload.controller.ts";

const router:Router = Router();

router.post('/novo', upload.single('file'), LivroController.newLivro);
router.put('/update', LivroController.updateLivro);

export default router;