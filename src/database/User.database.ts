import mongoose from "mongoose";
import LivroSchema from "./Livro.database.ts";

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    nascimento: {type: Date, required: true},
    sexo: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    userId: {type: String, required: true},
    livros: {type: [LivroSchema], required: true},
    xpTotal: {type: Number, required: true},
    xpSemanal: {type: Number, required: true},
    amigos: {type: [String], required: true},
    lidas: {type: Number, required: true}
});

export default UserSchema;