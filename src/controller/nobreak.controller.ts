import { Nobreak, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class NobreakController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { modelo, numeroSerie, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.nobreak) {
            return res.status(400).json({ error: 'O funcionário já possui um Nobreak principal associado' });
        }

        if (!modelo || !numeroSerie) {
            return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
        }

        const nobreak = new Nobreak()
        nobreak.modelo = modelo
        nobreak.numeroSerie = numeroSerie
        nobreak.observacao = observacao
        await nobreak.save()

        funcionario.nobreak = nobreak._id
        funcionario.possuiNobreak = true
        await funcionario.save()

        return res.status(201).json(nobreak)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  modelo, numeroSerie, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.nobreak) {
            return res.status(400).json({ error: 'O funcionário não possui um Nobreak principal associado' });
        }

        const nobreak= await Nobreak.findById(funcionario.nobreak).exec();
        if (!nobreak) {
          return res.status(404).json({ error: 'Nobreak associado ao funcionário não encontrado' });
        }
        try{
            nobreak.modelo = modelo
            nobreak.numeroSerie = numeroSerie
            nobreak.observacao = observacao
            await nobreak.save()
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
    
        if (!funcionario.nobreak || funcionario.possuiNobreak === false) {
            return res.status(400).json({ error: 'O funcionário não possui um Nobreak principal associado' });
        }



        const nobreak = await Nobreak.findById(funcionario.nobreak).exec();
        if (!nobreak) {
          return res.status(404).json({ error: 'Nobreak principal associado ao funcionário não encontrado' });
        }
    

        funcionario.nobreak = undefined
        funcionario.possuiNobreak = false
        await funcionario.save()

        await nobreak.deleteOne({_id: nobreak._id})
        return res.status(204).json()
      }
}