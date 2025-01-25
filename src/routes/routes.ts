import { Router } from "express";
import UserRoutes from "./User.routes.ts";
import LivroRoutes from "./Livro.routes.ts";

const router:Router = Router();

router.get('/', (req, res) => {
    res.send('Api rodando');
});

router.use('/user', UserRoutes);
router.use('/livro', LivroRoutes);

export default router;