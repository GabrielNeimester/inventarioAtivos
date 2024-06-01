import { Monitor, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class MonitorController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { modelo, numeroSerie, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.monitor1) {
            return res.status(400).json({ error: 'O funcionário já possui um monitor principal associado' });
        }

        if (!modelo || !numeroSerie) {
            return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
        }

        const monitor1 = new Monitor()
        monitor1.modelo = modelo
        monitor1.numeroSerie = numeroSerie
        monitor1.observacao = observacao
        await monitor1.save()

        funcionario.monitor1 = monitor1._id
        await funcionario.save()

        return res.status(201).json(monitor1)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  modelo, numeroSerie, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.monitor1) {
            return res.status(400).json({ error: 'O funcionário não possui um monitor principal associado' });
        }

        const monitor1= await Monitor.findById(funcionario.monitor1).exec();
        if (!monitor1) {
          return res.status(404).json({ error: 'Monitor associado ao funcionário não encontrado' });
        }
        try{
            monitor1.modelo = modelo
            monitor1.numeroSerie = numeroSerie
            monitor1.observacao = observacao
            await monitor1.save()
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
    
        if (!funcionario.monitor1) {
            return res.status(400).json({ error: 'O funcionário não possui um monitor principal associado' });
        }



        const monitor1 = await Monitor.findById(funcionario.monitor1).exec();
        if (!monitor1) {
          return res.status(404).json({ error: 'monitor principal associado ao funcionário não encontrado' });
        }
    

        funcionario.monitor1 = undefined
        await funcionario.save()

        await monitor1.deleteOne({_id: monitor1._id})
        return res.status(204).json()
      }
}