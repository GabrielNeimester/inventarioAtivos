import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface FuncionarioDocument extends Document {
    _id: Types.ObjectId,
    nome: string;
    cpf: string;
}

const FuncionarioSchema: Schema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
});

const FuncionarioModel: Model<FuncionarioDocument> = mongoose.model<FuncionarioDocument>('Funcionario', FuncionarioSchema);

export default FuncionarioModel;