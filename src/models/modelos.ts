import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema({
    tag: { type: String, required: true, maxlength: 7 },
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    versao: { type: String, required: true, maxlength: 100 },
    caracteristicas: { type: String, required: true, maxlength: 100 },
    observacao: { type: String, maxlength: 250 }
})

const monitorSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, maxlength: 250 }
})

const tecladoSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, maxlength: 250 }
})

const mouseSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, maxlength: 250 }
})

const desktopSchema = new mongoose.Schema({
    tag: { type: String, required: true, maxlength: 7 },
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    versao: { type: String, required: true, maxlength: 100 },
    caracteristicas: { type: String, required: true, maxlength: 100 },
    observacao: { type: String, maxlength: 250 }
})


const nobreakSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, required: true, maxlength: 250 }
})

const headsetSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    numeroSerie: { type: String, required: true, maxlength: 12 },
    observacao: { type: String, maxlength: 250 }
})

const celularSchema = new mongoose.Schema({
    modelo: { type: String, required: true, maxlength: 100 },
    IMEI1: { type: String, required: true, maxlength: 11 },
    numero: { type: String, required: true, maxlength: 11 },
    observacao: { type: String, maxlength: 250 }
})

// Definindo o esquema do funcionário
const funcionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, maxlength: 100 },
    cpf: { type: String, required: true, maxlength: 14 },
    possuiNotebook: { type: Boolean, required: true },
    notebook: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    possuiMonitor1: { type: Boolean, required: true },
    monitor1: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor' },
    possuiMonitor2: { type: Boolean, required: true },
    monitor2: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor' },
    possuiTeclado: { type: Boolean, required: true },
    teclado: { type: mongoose.Schema.Types.ObjectId, ref: 'Teclado' },
    possuiMouse: { type: Boolean, required: true },
    mouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Mouse' },
    possuiDesktop: { type: Boolean, required: true },
    desktop: { type: mongoose.Schema.Types.ObjectId, ref: 'Desktop' },
    suporteNotebook: { type: Boolean, required: true },
    mousePad: { type: Boolean, required: true },
    possuiNobreak: { type: Boolean, required: true },
    nobreak: { type: mongoose.Schema.Types.ObjectId, ref: 'Nobreak' },
    possuiHeadset: { type: Boolean, required: true },
    headset: { type: mongoose.Schema.Types.ObjectId, ref: 'Headset' },
    possuiCelular: { type: Boolean, required: true },
    celular: { type: mongoose.Schema.Types.ObjectId, ref: 'Celular' },
})

export const Notebook = mongoose.model('Notebook', notebookSchema, 'notebooks')
export const Funcionario = mongoose.model('Funcionario', funcionarioSchema, 'funcionarios')
export const Monitor = mongoose.model('Monitor', monitorSchema, 'monitores')
export const Teclado = mongoose.model('Teclado', tecladoSchema, 'teclados')
export const Mouse = mongoose.model('Mouse', mouseSchema, 'mouses')
export const Desktop = mongoose.model('Desktop', desktopSchema, 'desktops')
export const Nobreak = mongoose.model('Nobreak', nobreakSchema, 'nobreaks')
export const Headset = mongoose.model('Headset', headsetSchema, 'headsets')
export const Celular = mongoose.model('Celular', celularSchema, 'celulares')