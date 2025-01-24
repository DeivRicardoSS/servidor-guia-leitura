import { Router } from "express";
import UserRoutes from "./User.routes.ts";

const router:Router = Router();

router.get('/', (req, res) => {
    res.send('Api rodando');
});

router.use('/user', UserRoutes);

export default router;