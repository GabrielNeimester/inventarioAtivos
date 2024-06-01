import { Router } from 'express'
import MouseController from '../controller/mouse.controller'


const mouseRoutes = Router()

mouseRoutes.post("/:cpfFuncionario", MouseController.store )
mouseRoutes.delete("/:cpfFuncionario", MouseController.delete )
mouseRoutes.put("/:cpfFuncionario", MouseController.update)


export default mouseRoutes