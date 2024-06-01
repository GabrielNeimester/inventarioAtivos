import { Router } from 'express'
import DesktopController from '../controller/desktop.controller'


const desktopRoutes = Router()

desktopRoutes.post("/:cpfFuncionario", DesktopController.store )
desktopRoutes.delete("/:cpfFuncionario", DesktopController.delete )
desktopRoutes.put("/:cpfFuncionario", DesktopController.update)


export default desktopRoutes