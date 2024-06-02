import { Mouse, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class MouseController {

  static async store(req: Request, res: Response) {
    const { cpfFuncionario } = req.params
    const { modelo, numeroSerie, observacao } = req.body

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
    if (!funcionario) {
      return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
    }

    if (funcionario.mouse) {
      return res.status(400).json({ error: 'O funcionário já possui um Mouse associado' });
    }

    if (!modelo || !numeroSerie) {
      return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
    }
    try {
      const mouse = new Mouse()
      mouse.modelo = modelo
      mouse.numeroSerie = numeroSerie
      mouse.observacao = observacao
      await mouse.save()

      funcionario.mouse = mouse._id
      funcionario.possuiMouse = true
      await funcionario.save()

      return res.status(201).json(mouse)
    }
    catch (error: any) {
      return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
    }

  }

  static async update(req: Request, res: Response) {
    const { cpfFuncionario } = req.params
    const { modelo, numeroSerie, observacao } = req.body

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }

    if (!funcionario.mouse) {
      return res.status(400).json({ error: 'O funcionário não possui um Mouse associado' });
    }

    const mouse = await Mouse.findById(funcionario.mouse).exec();
    if (!mouse) {
      return res.status(404).json({ error: 'Mouse associado ao funcionário não encontrado' });
    }
    try {
      mouse.modelo = modelo
      mouse.numeroSerie = numeroSerie
      mouse.observacao = observacao
      await mouse.save()

      return res.status(201).json(mouse)
    }
    catch (error) {
      return res.status(404).json({ error: `Erro do Servidor: ${error}` });
    }

  }

  static async delete(req: Request, res: Response) {
    const { cpfFuncionario } = req.params

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }

    if (!funcionario.mouse || funcionario.possuiMouse == false) {
      return res.status(400).json({ error: 'O funcionário não possui um Mouse associado' });
    }



    const mouse = await Mouse.findById(funcionario.mouse).exec();
    if (!mouse) {
      return res.status(404).json({ error: 'Mouse associado ao funcionário não encontrado' });
    }


    funcionario.mouse = undefined
    funcionario.possuiMouse = false
    await funcionario.save()

    await mouse.deleteOne({ _id: mouse._id })
    return res.status(204).json()
  }
}