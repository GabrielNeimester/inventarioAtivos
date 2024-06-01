import { Router } from 'express'
import NobreakController from '../controller/nobreak.controller'


const nobreakRoutes = Router()

nobreakRoutes.post("/:cpfFuncionario", NobreakController.store )
nobreakRoutes.delete("/:cpfFuncionario", NobreakController.delete )
nobreakRoutes.put("/:cpfFuncionario", NobreakController.update)


export default nobreakRoutes