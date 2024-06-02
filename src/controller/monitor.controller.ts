import { Monitor, Funcionario } from '../models/modelos'
import { Request, Response } from 'express'

export default class MonitorController {

  static async store(req: Request, res: Response) {
    const { cpfFuncionario } = req.params
    const { modelo, numeroSerie, observacao } = req.body

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec();
    if (!funcionario) {
      return res.status(400).json({ error: 'Não existe um funcionário com este CPF' });
    }

    if (!modelo || !numeroSerie) {
      return res.status(404).json({ error: 'Campos obrigatórios não preenchidos' })
    }

    if (funcionario.monitor1) {

      if (funcionario.monitor2) {
        return res.status(400).json({ error: 'O funcionário já possui dois monitores associados' });
      }

      try{
        const monitor2 = new Monitor()
        monitor2.modelo = modelo
        monitor2.numeroSerie = numeroSerie
        monitor2.observacao = observacao
        await monitor2.save()
  
        funcionario.monitor2 = monitor2._id
        funcionario.possuiMonitor2 = true
        await funcionario.save()
  
        return res.status(201).json(monitor2)
      }
      catch (error: any) {
        return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
      }


    }
    else {
      try{
        const monitor1 = new Monitor()
        monitor1.modelo = modelo
        monitor1.numeroSerie = numeroSerie
        monitor1.observacao = observacao
        await monitor1.save()
  
        funcionario.monitor1 = monitor1._id
        funcionario.possuiMonitor1 = true
        await funcionario.save()
  
        return res.status(201).json(monitor1)
      }
      catch (error: any) {
        return res.status(500).json(`Ocorreu um erro inesperado ${error}`)
      }
    }




  }

  static async update(req: Request, res: Response) {
    const { cpfFuncionario, numeroMonitor } = req.params
    const { modelo, numeroSerie, observacao } = req.body

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }

    const numeroMonitorInt = Number(numeroMonitor)
    if (isNaN(numeroMonitorInt) || ![1, 2].includes(numeroMonitorInt)) {
      return res.status(400).json({ error: 'Informe se é o monitor 1 ou monitor 2' });
    }

    try {
      if (numeroMonitorInt === 1) {
        if (!funcionario.monitor1) {
          return res.status(400).json({ error: 'O funcionário não possui um monitor principal associado' });
        }

        const monitor1 = await Monitor.findById(funcionario.monitor1).exec()
        if (!monitor1) {
          return res.status(404).json({ error: 'Monitor associado ao funcionário não encontrado' });
        }

        monitor1.modelo = modelo
        monitor1.numeroSerie = numeroSerie
        monitor1.observacao = observacao
        await monitor1.save()

        return res.status(200).json(monitor1)
      } else if (numeroMonitorInt === 2) {
        if (!funcionario.monitor2) {
          return res.status(400).json({ error: 'O funcionário não possui um monitor secundário associado' });
        }

        const monitor2 = await Monitor.findById(funcionario.monitor2).exec()
        if (!monitor2) {
          return res.status(404).json({ error: 'Monitor associado ao funcionário não encontrado' });
        }

        monitor2.modelo = modelo
        monitor2.numeroSerie = numeroSerie
        monitor2.observacao = observacao
        await monitor2.save()

        return res.status(200).json(monitor2)
      }
    } catch (error) {
      return res.status(500).json({ error: `Erro do Servidor: ${error}` });
    }
  }

  static async delete(req: Request, res: Response) {
    const { cpfFuncionario } = req.params

    const funcionario = await Funcionario.findOne({ cpf: cpfFuncionario }).exec()
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }

    if (!funcionario.monitor1) {
      if (!funcionario.monitor2) {
        return res.status(400).json({ error: 'O funcionário não possui nenhum monitor associado' });
      }

      const monitor2 = await Monitor.findById(funcionario.monitor2).exec();
      if (!monitor2) {
        return res.status(404).json({ error: 'monitor associado ao funcionário não encontrado' });
      }

      funcionario.monitor2 = undefined
      funcionario.possuiMonitor2 = false
      await funcionario.save()

      await monitor2.deleteOne({ _id: monitor2._id })
      return res.status(204).json()

    }

    if (!funcionario.monitor2) {
      if (!funcionario.monitor1) {
        return res.status(400).json({ error: 'O funcionário não possui nenhum monitor associado' });
      }

      const monitor1 = await Monitor.findById(funcionario.monitor1).exec();
      if (!monitor1) {
        return res.status(404).json({ error: 'monitor associado ao funcionário não encontrado' });
      }

      const monitor2 = await Monitor.findById(funcionario.monitor2).exec();
      if (!monitor2) {
        return res.status(404).json({ error: 'monitor associado ao funcionário não encontrado' });
      }

      funcionario.monitor1 = undefined
      funcionario.possuiMonitor1 = false
      funcionario.monitor2 = undefined
      funcionario.possuiMonitor2 = false
      await funcionario.save()

      await monitor1.deleteOne({ _id: monitor1._id })
      await monitor2.deleteOne({ _id: monitor2._id })
      return res.status(204).json()

    }



    const monitor1 = await Monitor.findById(funcionario.monitor1).exec();
    if (!monitor1) {
      return res.status(404).json({ error: 'monitor principal associado ao funcionário não encontrado' });
    }

    const monitor2 = await Monitor.findById(funcionario.monitor1).exec();
    if (!monitor2) {
      return res.status(404).json({ error: 'monitor principal associado ao funcionário não encontrado' });
    }



    funcionario.monitor1 = undefined
    funcionario.monitor2 = undefined
    funcionario.possuiMonitor1 = false
    funcionario.possuiMonitor2 = false
    await funcionario.save()

    await monitor1.deleteOne({ _id: monitor1._id })
    return res.status(204).json()
  }
}