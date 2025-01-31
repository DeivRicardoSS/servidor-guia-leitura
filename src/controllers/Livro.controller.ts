import mongoose from "mongoose";
import LivroSchema from "../database/Livro.database.ts";
import UserSchema from "../database/User.database.ts";
import { Request, Response } from "express";
const User = mongoose.model('User', UserSchema, 'User');


class Livro {
    async newLivro (req: Request, res: Response) {
        const body:any = req.body;
        if (!body) {
            console.error('Requisição sem argumento');
            return res.status(400).json({
                success: false,
                error: 'Requisição sem argumento'
            });
        }

        if (!body.nome || !body.autor || !body.genero || !body.quantPaginas || !body.pagAtual || !body.userId) {
            console.error('Preencha todos os campos');
            return res.status(400).json({
                success: false,
                error: 'Preencha todos os campos'
            });
        }

        try {
            const user:any = await User.findOne({userId: body.userId});
            if (!user) {
                console.error('Usuário não encontrado');
                return res.status(400).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            if (!req.file || !req.file.path) {
                console.error('Nenhuma imagem foi enviada');
                return res.status(400).json({
                    success: false,
                    error: 'Nenhuma imagem foi enviada',
                });
            }

            user.livros.push({
                nome: body.nome,
                autor: body.autor,
                genero: body.genero,
                quantPaginas: body.quantPaginas,
                pagAtual: body.pagAtual,
                link: req.file.path
            });

            

            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Ocorreu um erro ao adicionar o livro'
            });
        }
    }

    async updateLivro(req: Request, res: Response) {
        const body:any = req.body;
        if (!body) {
            console.error('Requisição sem argumento');
            return res.status(400).send({
                success: false,
                error: 'Requisição sem argumento'
            });
        }

        if (!body.nome || !body.autor || !body.genero || !body.quantPaginas || !body.pagAtual || !body.userId || !body.link || !body.xp || !body.index) {
            console.error('Preencha todos os campos');
            return res.status(400).send({
                success: false,
                error: 'Preencha todos os campos'
            });
        }

        try {
            const user:any = await User.findOne({userId: body.userId});
            if (!user) {
                console.error('Usuário não encontrado');
                return res.status(400).send({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            user.livros[body.index] = {
                nome: body.nome,
                autor: body.autor,
                genero: body.genero,
                quantPaginas: body.quantPaginas,
                pagAtual: body.pagAtual,
                link: body.link
            }
            

            user.xpTotal += body.xp

            await user.save();
            return res.status(200).send(user);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                success: false,
                error: 'Ocorreu um erro ao adicionar o livro'
            });
        }
    }
}

export default new Livro();