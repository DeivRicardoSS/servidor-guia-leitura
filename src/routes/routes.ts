import { Router } from "express";
import express from "express";
import UserRoutes from "./User.routes.ts";
import LivroRoutes from "./Livro.routes.ts";
import { Request, Response } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router:Router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res) => {
    res.send('Api rodando');
});

router.use('/user', UserRoutes);
router.use('/livro', LivroRoutes);

router.use('uploads', express.static(join(__dirname, '../../uploads')));

router.get('/uploads/:filename', (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = join(__dirname, '../../uploads', filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Arquivo não encontrado');
        }
    });
})
// router.get('/uploads/:filename', (req: Request, res: Response) => {
//     const { filename } = req.params;
//     console.log('Acessando o arquivo:', filename); // Verifique o nome do arquivo
//     res.sendFile(path.join(__dirname, '../../uploads', filename));
// });

export default router;