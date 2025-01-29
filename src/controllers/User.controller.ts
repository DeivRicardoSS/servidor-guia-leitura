import mongoose from "mongoose";
import UserSchema from "../database/User.database.ts";
import { Request, Response } from "express";
import UserId from "../core/userid.core.js";
const User = mongoose.model('User', UserSchema, 'User');

class UserController {
    async newUser(req: Request, res: Response) {
        const body:any = req.body;

        if(!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a user'
            });
        }

        console.log(req.body)
        console.log(UserId())

        if(!body.nome || !body.nascimento || !body.sexo || !body.email || !body.senha || !body.avatar ) {
            return res.status(400).json({
                success: false,
                error: 'Preencha todos os campos',
                nome: body.nome,
                nascimento: body.nascimento,
                sexo: body.sexo,
                email: body.email,
                senha: body.senha,
                body: req.body
            });
        }

        

        try{
            const existingUser:any = await User.findOne({email: body.email});

            if(existingUser) {
                return res.status(400).json({
                    success: false,
                    error: "Existe um usuário com esse email"
                });
            }

            const NewUser = new User({
                nome: body.nome,
                nascimento: new Date(body.nascimento),
                sexo: body.sexo,
                email: body.email,
                senha: body.senha,
                avatar: body.avatar,
                userId: UserId(),
                livros: [],
                xpTotal: 0,
                xpSemanal: 0,
                amigos: [],
                lidas: 0
            });

            await NewUser.save();

            return res.status(201).json(NewUser);

        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error
            });
        }

       
    }

    async login(req: Request, res: Response) {
        const body:any = req.body;

        if(!body) {
            console.error('You must provide a user')
            return res.status(400).json({
                success: false,
                error: 'You must provide a user'
            });
        }

        if(!body.email || !body.senha ) {
            console.error('Preencha todos os campos')
            return res.status(400).send({
                success: false,
                error: 'Preencha todos os campos',
            });
        }

        try{
            const existingUser:any = await User.findOne({email: body.email, senha: body.senha});

            if(!existingUser) {
                console.error('Usuário ou senha incorretos')
                return res.status(400).send({
                    success: false,
                    error: "Usuário ou senha incorretos"
                });
            }

            return res.status(200).send({
                success: true,
                response: existingUser
            });


        } catch (error) {
            return res.status(400).send({
                success: false,
                error: error
            });
        }
    }

    async confirmUser(req: Request, res: Response) {
        const body:any = req.body;
        if(!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a user'
            });
        }

        if(!body.userId) {
            return res.status(400).json({
                success: false,
                error: 'Preencha todos os campos',
                userId: body.userId,
                body: req.body
            });
        }

        try{
            const existingUser:any = await User.findOne({userId: body.userId});

            if(!existingUser) {
                return res.status(400).json({
                    success: false,
                    error: "Usuário inexistente"
                });
            }

            return res.send(existingUser);

        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error
            });
        }
    }
}

export default new UserController();