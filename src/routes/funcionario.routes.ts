import { Router } from 'express'
import FuncionarioController from "../controller/funcionario.controller"


const funcionarioRoutes = Router()

funcionarioRoutes.post("/", FuncionarioController.store )
funcionarioRoutes.post("/acessorios/mousepad/:cpfFuncionario", FuncionarioController.changeMousePad)
funcionarioRoutes.post("/acessorios/suporteNotebook/:cpfFuncionario", FuncionarioController.changeSuportNotebook)
funcionarioRoutes.get("/", FuncionarioController.index )
funcionarioRoutes.get("/:cpf", FuncionarioController.showByCpf)
funcionarioRoutes.delete("/deleteById/:_id", FuncionarioController.deleteById)
funcionarioRoutes.delete("/deleteByCpf/:cpf", FuncionarioController.deleteByCpf)
funcionarioRoutes.put("/:cpf", FuncionarioController.update)

export default funcionarioRoutes