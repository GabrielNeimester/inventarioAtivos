import { Router } from 'express'
import FuncionarioController from "../../controller/funcionario/funcionario"

const express = require("express")

const funcionarioRoutes = Router()

funcionarioRoutes.post("/", FuncionarioController.store )
funcionarioRoutes.get("/", FuncionarioController.index )
funcionarioRoutes.get("/getById/:_id", FuncionarioController.showById)
funcionarioRoutes.get("/getByCpf/:cpf", FuncionarioController.showByCpf)
funcionarioRoutes.delete("/deleteById/:_id", FuncionarioController.deleteById)
funcionarioRoutes.delete("/deleteByCpf/:cpf", FuncionarioController.deleteByCpf)
funcionarioRoutes.put("/:cpf", FuncionarioController.update)

export default funcionarioRoutes