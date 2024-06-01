import { Router } from 'express'
import FuncionarioController from "../controller/funcionario"


const funcionarioRoutes = Router()

funcionarioRoutes.post("/", FuncionarioController.store )
funcionarioRoutes.get("/", FuncionarioController.index )
funcionarioRoutes.get("/:cpf", FuncionarioController.showByCpf)
funcionarioRoutes.delete("/deleteById/:_id", FuncionarioController.deleteById)
funcionarioRoutes.delete("/deleteByCpf/:cpf", FuncionarioController.deleteByCpf)
funcionarioRoutes.put("/:cpf", FuncionarioController.update)

export default funcionarioRoutes