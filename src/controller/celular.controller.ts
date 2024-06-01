import { Celular, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class CelularController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { modelo, numero, IMEI1, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.celular) {
            return res.status(400).json({ error: 'O funcionário já possui um monitor principal associado' });
        }

        if (!modelo || !numero) {
            return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
        }

        const celular = new Celular()
        celular.modelo = modelo
        celular.numero = numero
        celular.IMEI1 = IMEI1
        celular.observacao = observacao
        await celular.save()

        funcionario.celular = celular._id
        funcionario.possuiCelular = true
        await funcionario.save()

        return res.status(201).json(celular)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  modelo, numero, observacao, IMEI1 } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.celular) {
            return res.status(400).json({ error: 'O funcionário não possui um Celular principal associado' });
        }

        const celular= await Celular.findById(funcionario.celular).exec();
        if (!celular) {
          return res.status(404).json({ error: 'Celular associado ao funcionário não encontrado' });
        }
        try{
            celular.modelo = modelo
            celular.numero = numero
            celular.IMEI1 = IMEI1
            celular.observacao = observacao
            await celular.save()
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
    
        if (!funcionario.celular || funcionario.possuiCelular === false) {
            return res.status(400).json({ error: 'O funcionário não possui um Celular principal associado' });
        }



        const celular = await Celular.findById(funcionario.celular).exec();
        if (!celular) {
          return res.status(404).json({ error: 'Celular principal associado ao funcionário não encontrado' });
        }
    

        funcionario.celular = undefined
        funcionario.possuiCelular = false
        await funcionario.save()

        await celular.deleteOne({_id: celular._id})
        return res.status(204).json()
      }
}