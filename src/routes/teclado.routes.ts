import { Router } from 'express'
import TecladoController from '../controller/teclado.controller'


const tecladoRoutes = Router()

tecladoRoutes.post("/:cpfFuncionario", TecladoController.store )
tecladoRoutes.delete("/:cpfFuncionario", TecladoController.delete )
tecladoRoutes.put("/:cpfFuncionario", TecladoController.update)



export default tecladoRoutes