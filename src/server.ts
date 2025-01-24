import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/routes.ts';

const app:any = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/guia-de-leitura');

app.use(router);

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000')
});