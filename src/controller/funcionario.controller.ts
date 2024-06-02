import { Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class FuncionarioController {

  static async store(req: Request, res: Response) {
    const { nome, cpf } = req.body

    if (!nome || !cpf) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!!' })
    }

    if (cpf.length < 11 || cpf.length > 11) {
      return res.status(400).json({ error: 'Digite um CPF válido' })
    }

    const existeFuncionario = await Funcionario.findOne({ cpf: cpf }).exec();
    if (existeFuncionario) {
      return res.status(400).json({ error: 'Já existe um funcionário com este CPF' });
    }

    try {
      const funcionario = new Funcionario()
      funcionario.nome = nome
      funcionario.cpf = cpf
      funcionario.possuiNotebook = false
      funcionario.possuiMonitor1 = false
      funcionario.possuiMonitor2 = false
      funcionario.possuiTeclado = false
      funcionario.possuiMouse = false
      funcionario.possuiDesktop = false
      funcionario.suporteNotebook = false
      funcionario.mousePad = false
      funcionario.possuiNobreak = false
      funcionario.possuiHeadset = false
      funcionario.possuiCelular = false

      await funcionario.save()

      return res.status(201).json(funcionario)
    }


    catch (error: any) {
      return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
    }
  }

  static async index(req: Request, res: Response) {
    const funcionario = await Funcionario.find()
    return res.json(funcionario)
  }

  static async showByCpf(req: Request, res: Response) {
    const { cpf } = req.params

    if (!cpf || cpf.length < 11 || cpf.length > 11) {
      return res.status(400).json({ error: 'Digite um CPF válido' })
    }

    const funcionario = await Funcionario.findOne({ cpf: cpf }).populate('notebook').populate('teclado').populate('mouse').populate('nobreak').populate('headset').populate('desktop').populate('celular').populate('monitor1').populate('monitor2').exec()
    return res.json(funcionario)
  }


  static async deleteById(req: Request, res: Response) {
    const { _id } = req.params

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }


    const funcionario = await Funcionario.findById(_id).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }

    if (funcionario.possuiNotebook === true || funcionario.possuiMonitor1 === true || funcionario.possuiMonitor2 === true || funcionario.possuiTeclado === true || funcionario.possuiMouse === true || funcionario.possuiDesktop === true || funcionario.suporteNotebook === true || funcionario.mousePad === true || funcionario.possuiHeadset === true || funcionario.possuiCelular === true) {
      return res.status(400).json({ error: 'Não foi possível excluir o funcionário, pois o mesmo possui ativos associados' })
    }

    await funcionario.deleteOne({ _id: _id });
    return res.status(204).json()
  }

  static async deleteByCpf(req: Request, res: Response) {
    const { cpf } = req.params

    if (!cpf) {
      return res.status(400).json({ error: 'O CPF é obrigatório' })
    }

    const funcionario = await Funcionario.findOne({ cpf: cpf }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }
    if (funcionario.possuiNotebook === true || funcionario.possuiMonitor1 === true || funcionario.possuiMonitor2 === true || funcionario.possuiTeclado === true || funcionario.possuiMouse === true || funcionario.possuiDesktop === true || funcionario.suporteNotebook === true || funcionario.mousePad === true || funcionario.possuiHeadset === true || funcionario.possuiCelular === true) {
      return res.status(400).json({ error: 'Não foi possível excluir o funcionário, pois o mesmo possui ativos associados' })
    }


    await funcionario.deleteOne({ cpf: cpf });
    return res.status(204).json()
  }

  static async update(req: Request, res: Response) {
    const { cpf } = req.params
    const { nome } = req.body


    if (!cpf) {
      return res.status(400).json({ error: 'O CPF é obrigatório' })
    }

    if (!nome) {
      return res.status(400).json({ error: 'O nome é obrigatório' })
    }

    const funcionario = await Funcionario.findOne({ cpf: cpf }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }


    try {
      funcionario.nome = nome

      await funcionario.save()

      return res.json(funcionario)
    }
    catch (error: any) {
      return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
    }
  }

  static async changeMousePad(req: Request, res: Response) {
    const { cpfFuncionario } = req.params

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
    if (!funcionario) {
      return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
    }

    funcionario.mousePad = !funcionario.mousePad
    await funcionario.save()
    return res.status(200).json(funcionario.mousePad)
  }

  static async changeSuportNotebook(req: Request, res: Response) {
    const { cpfFuncionario } = req.params

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
    if (!funcionario) {
      return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
    }

    funcionario.suporteNotebook = !funcionario.suporteNotebook
    await funcionario.save()
    return res.status(200).json(funcionario.suporteNotebook)
  }


}

