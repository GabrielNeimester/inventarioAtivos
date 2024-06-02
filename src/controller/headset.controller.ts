import { Headset, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class HeadsetController {

  static async store(req: Request, res: Response) {
    const { cpfFuncionario } = req.params
    const { modelo, numeroSerie, observacao } = req.body

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
    if (!funcionario) {
      return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
    }

    if (funcionario.headset) {
      return res.status(400).json({ error: 'O funcionário já possui um headset associado' });
    }

    if (!modelo || !numeroSerie) {
      return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
    }

    try {

      const headset = new Headset()
      headset.modelo = modelo
      headset.numeroSerie = numeroSerie
      headset.observacao = observacao
      await headset.save()

      funcionario.headset = headset._id
      funcionario.possuiHeadset = true
      await funcionario.save()

      return res.status(201).json(headset)
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

    if (!funcionario.headset) {
      return res.status(400).json({ error: 'O funcionário não possui um Headset associado' });
    }

    const headset = await Headset.findById(funcionario.headset).exec();
    if (!headset) {
      return res.status(404).json({ error: 'Headset associado ao funcionário não encontrado' });
    }
    try {
      headset.modelo = modelo
      headset.numeroSerie = numeroSerie
      headset.observacao = observacao
      await headset.save()
      return res.status(200).json(headset)
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

    if (!funcionario.headset || funcionario.possuiHeadset === false) {
      return res.status(400).json({ error: 'O funcionário não possui um Headset associado' });
    }



    const headset = await Headset.findById(funcionario.headset).exec();
    if (!headset) {
      return res.status(404).json({ error: 'Headset associado ao funcionário não encontrado' });
    }


    funcionario.headset = undefined
    funcionario.possuiHeadset = false
    await funcionario.save()

    await headset.deleteOne({ _id: headset._id })
    return res.status(204).json()
  }
}