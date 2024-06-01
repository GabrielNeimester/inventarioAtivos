import { Notebook, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class NotebookController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { tag, modelo, numeroSerie, versao, caracteristicas, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.notebook) {
            return res.status(400).json({ error: 'O funcionário já possui um notebook associado' });
        }

        if (!tag || !modelo || !numeroSerie || !versao || !caracteristicas) {
            return res.status(404).json({ error: 'Todos os campos são obrigatórios!!' })
        }

        const notebook = new Notebook()
        notebook.tag = tag
        notebook.modelo = modelo
        notebook.numeroSerie = numeroSerie
        notebook.versao = versao
        notebook.caracteristicas = caracteristicas
        notebook.observacao = observacao

        await notebook.save()

        funcionario.notebook = notebook._id
        await funcionario.save()

        return res.status(201).json(notebook)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  tag, modelo, numeroSerie, versao, caracteristicas, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.notebook) {
            return res.status(400).json({ error: 'O funcionário não possui um notebook associado' });
        }

        const notebook = await Notebook.findById(funcionario.notebook).exec();
        if (!notebook) {
          return res.status(404).json({ error: 'Notebook associado ao funcionário não encontrado' });
        }
        try{
            notebook.tag = tag
            notebook.modelo = modelo
            notebook.numeroSerie = numeroSerie
            notebook.versao = versao
            notebook.caracteristicas = caracteristicas
            notebook.observacao = observacao
    
            await notebook.save()
            return res.json(notebook)
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
    
        if (!funcionario.notebook) {
            return res.status(400).json({ error: 'O funcionário não possui um notebook associado' });
        }



        const notebook = await Notebook.findById(funcionario.notebook).exec();
        if (!notebook) {
          return res.status(404).json({ error: 'Notebook associado ao funcionário não encontrado' });
        }
    

        funcionario.notebook = undefined
        await funcionario.save()

        await notebook.deleteOne({_id: notebook._id})
        return res.status(204).json()
      }
}