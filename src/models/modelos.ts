import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema({
    tag: { type: String, required: true, maxlength: 7 },
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    versao: { type: String, required: true, maxlength: 100 },
    caracteristicas: { type: String, required: true, maxlength: 100 },
    observacao: { type: String, maxlength: 250 }
})

const monitorSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const tecladoSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const mouseSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const desktopSchema = new mongoose.Schema({
    tag: { type: String, required: true, maxlength: 7 },
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    versao: { type: String, required: true, maxlength: 100 },
    caracteristicas: { type: String, required: true, maxlength: 100 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const acessoriosSchema = new mongoose.Schema({
    mousepad: { type: Boolean, required: true },
    suporteNotebook: { type: Boolean, required: true },

})

const nobreakSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const headsetSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const celularSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 10 },
    IMEI1: { type: String, required: true, maxlength: 11 },
    numero: { type: String, required: true, maxlength: 11 },
    observacao: { type: String, required: true, maxlength: 250 }
})

// Definindo o esquema do funcionário
const funcionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, maxlength: 100 },
    cpf: { type: String, required: true, maxlength: 14 },
    notebook: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    monitor1: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor' },
    monitor2: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor' },
    teclado: { type: mongoose.Schema.Types.ObjectId, ref: 'Teclado' },
    mouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Mouse' },
    desktop: { type: mongoose.Schema.Types.ObjectId, ref: 'Desktop' },
    acessorios: { type: mongoose.Schema.Types.ObjectId, ref: 'Acessorios' },
    nobreak: { type: mongoose.Schema.Types.ObjectId, ref: 'Nobreak' },
    headset: { type: mongoose.Schema.Types.ObjectId, ref: 'Headset' },
    celular: { type: mongoose.Schema.Types.ObjectId, ref: 'Celular' },
})

// Modelos
export const Notebook = mongoose.model('Notebook', notebookSchema)
export const Funcionario = mongoose.model('Funcionario', funcionarioSchema)
export const Monitor = mongoose.model('Monitor', monitorSchema)
export const Teclado = mongoose.model('Teclado', tecladoSchema)
export const Mouse = mongoose.model('Mouse', mouseSchema)
export const Desktop = mongoose.model('Desktop', desktopSchema)
export const Acessorios = mongoose.model('Acessorios', acessoriosSchema)
export const Nobreak = mongoose.model('Nobreak', nobreakSchema)
export const Headset = mongoose.model('Headset', headsetSchema)
export const Celular = mongoose.model('Celular', celularSchema)