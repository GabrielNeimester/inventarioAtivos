import { Router } from 'express'
import MonitorController from '../controller/monitor.controller'


const monitorRoutes = Router()

monitorRoutes.post("/:cpfFuncionario", MonitorController.store )
monitorRoutes.delete("/:cpfFuncionario", MonitorController.delete )
monitorRoutes.put("/:cpfFuncionario/:numeroMonitor", MonitorController.update)


export default monitorRoutes