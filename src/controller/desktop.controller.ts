import { Desktop, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'
import mongoose from "mongoose"

export default class DesktopController {

    static async store(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const { tag, modelo, numeroSerie, versao, caracteristicas, observacao } = req.body

        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
        if (!funcionario) {
            return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
        }

        if (funcionario.desktop) {
            return res.status(400).json({ error: 'O funcionário já possui um desktop associado' });
        }

        if (!tag || !modelo || !numeroSerie || !versao || !caracteristicas) {
            return res.status(404).json({ error: 'Todos os campos são obrigatórios!!' })
        }

        const desktop = new Desktop()
        desktop.tag = tag
        desktop.modelo = modelo
        desktop.numeroSerie = numeroSerie
        desktop.versao = versao
        desktop.caracteristicas = caracteristicas
        desktop.observacao = observacao

        await desktop.save()

        funcionario.desktop = desktop._id
        funcionario.possuiDesktop = true
        await funcionario.save()

        return res.status(201).json(desktop)
    }

    static async update(req: Request, res: Response) {
        const { cpfFuncionario } = req.params
        const {  tag, modelo, numeroSerie, versao, caracteristicas, observacao } = req.body
    
        const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
        if (!funcionario) {
          return res.status(404).json({ error: 'Funcionário não encontrado' })
        }
    
        if (!funcionario.desktop) {
            return res.status(400).json({ error: 'O funcionário não possui um desktop associado' });
        }

        const desktop = await Desktop.findById(funcionario.desktop).exec();
        if (!desktop) {
          return res.status(404).json({ error: 'desktop associado ao funcionário não encontrado' });
        }
        try{
            desktop.tag = tag
            desktop.modelo = modelo
            desktop.numeroSerie = numeroSerie
            desktop.versao = versao
            desktop.caracteristicas = caracteristicas
            desktop.observacao = observacao
    
            await desktop.save()
            return res.json(desktop)
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
    
        if (!funcionario.desktop || funcionario.possuiDesktop === false) {
            return res.status(400).json({ error: 'O funcionário não possui um desktop associado' });
        }



        const desktop = await Desktop.findById(funcionario.desktop).exec();
        if (!desktop) {
          return res.status(404).json({ error: 'desktop associado ao funcionário não encontrado' });
        }
    

        funcionario.desktop = undefined
        funcionario.possuiDesktop = false
        await funcionario.save()

        await desktop.deleteOne({_id: desktop._id})
        return res.status(204).json()
      }
}