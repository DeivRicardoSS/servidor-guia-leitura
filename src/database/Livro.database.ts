import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    autor: {type: String, required: true},
    genero: {type: String, required: true},
    quantPaginas: {type: Number, required: true},
    pagAtual: {type: Number, required: true}
});

export default LivroSchema;