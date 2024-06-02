import { Teclado, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'


export default class TecladoController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { modelo, numeroSerie, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.teclado) {
            return res.status(400).json({ error: 'O funcionário já possui um teclado associado' });
        }

        if (!modelo || !numeroSerie) {
            return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
        }

        try{
          const teclado = new Teclado()
          teclado.modelo = modelo
          teclado.numeroSerie = numeroSerie
          teclado.observacao = observacao
          await teclado.save()
  
          funcionario.teclado = teclado._id
          funcionario.possuiTeclado = true
          await funcionario.save()
  
          return res.status(201).json(teclado)
        }
        catch (error: any) {
          return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
        }
        
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  modelo, numeroSerie, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.teclado) {
            return res.status(400).json({ error: 'O funcionário não possui um teclado associado' });
        }

        const teclado= await Teclado.findById(funcionario.teclado).exec();
        if (!teclado) {
          return res.status(404).json({ error: 'Teclado associado ao funcionário não encontrado' });
        }

        try{
            teclado.modelo = modelo
            teclado.numeroSerie = numeroSerie
            teclado.observacao = observacao
            await teclado.save()
            return res.status(201).json(teclado)
        }
        catch (error) {
            return res.status(500).json({ error: `Erro do Servidor: ${error}` });
        }
       
      }

      static async delete(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.teclado || funcionario.possuiTeclado === false) {
          return res.status(400).json({ error: 'O funcionário não possui um teclado associado' })
      }

        const teclado = await Teclado.findById(funcionario.teclado).exec();
        if (!teclado) {
          return res.status(404).json({ error: 'teclado associado ao funcionário não encontrado' });
        }
    

        funcionario.teclado = undefined
        funcionario.possuiTeclado = false
        await funcionario.save()

        await teclado.deleteOne({_id: teclado._id})
        return res.status(204).json()
      }
}