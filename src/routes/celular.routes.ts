import { Router } from 'express'
import CelularController from '../controller/celular.controller'


const celularRoutes = Router()

celularRoutes.post("/:cpfFuncionario", CelularController.store )
celularRoutes.delete("/:cpfFuncionario", CelularController.delete )
celularRoutes.put("/:cpfFuncionario", CelularController.update)


export default celularRoutes