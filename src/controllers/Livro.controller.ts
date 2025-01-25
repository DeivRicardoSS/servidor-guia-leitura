import mongoose from "mongoose";
import LivroSchema from "../database/Livro.database.ts";
import UserSchema from "../database/User.database.ts";
import { Request, Response } from "express";
const User = mongoose.model('User', UserSchema, 'User');

class Livro {
    async newLivro (req: Request, res: Response) {
        const body:any = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'Requisição sem argumento'
            });
        }

        if (!body.nome || !body.autor || !body.genero || !body.quantPaginas || !body.pagAtual || !body.userId) {
            return res.status(400).json({
                success: false,
                error: 'Preencha todos os campos'
            });
        }

        try {
            const user:any = await User.findOne({userId: body.userId});
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            user.livros.push({
                nome: body.nome,
                autor: body.autor,
                genero: body.genero,
                quantPaginas: body.quantPaginas,
                pagAtual: body.pagAtual
            });

            await user.save();
            return res.status(200).json({
                success: true,
                message: 'Livro adicionado com sucesso'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Ocorreu um erro ao adicionar o livro'
            });
        }
    }
}

export default new Livro();