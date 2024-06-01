import { Teclado, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class TecladoController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { modelo, numeroSerie, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.teclado) {
            return res.status(400).json({ error: 'O funcionário já possui um monitor principal associado' });
        }

        if (!modelo || !numeroSerie) {
            return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
        }

        const teclado = new Teclado()
        teclado.modelo = modelo
        teclado.numeroSerie = numeroSerie
        teclado.observacao = observacao
        await teclado.save()

        funcionario.teclado = teclado._id
        await funcionario.save()

        return res.status(201).json(teclado)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  modelo, numeroSerie, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.teclado) {
            return res.status(400).json({ error: 'O funcionário não possui um monitor principal associado' });
        }

        const teclado= await Teclado.findById(funcionario.teclado).exec();
        if (!teclado) {
          return res.status(404).json({ error: 'Monitor associado ao funcionário não encontrado' });
        }
        try{
            teclado.modelo = modelo
            teclado.numeroSerie = numeroSerie
            teclado.observacao = observacao
            await teclado.save()
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
    
        if (!funcionario.teclado || funcionario.possuiTeclado === false) {
            return res.status(400).json({ error: 'O funcionário não possui um monitor principal associado' });
        }



        const teclado = await Teclado.findById(funcionario.teclado).exec();
        if (!teclado) {
          return res.status(404).json({ error: 'monitor principal associado ao funcionário não encontrado' });
        }
    

        funcionario.teclado = undefined
        funcionario.possuiTeclado = false
        await funcionario.save()

        await teclado.deleteOne({_id: teclado._id})
        return res.status(204).json()
      }
}