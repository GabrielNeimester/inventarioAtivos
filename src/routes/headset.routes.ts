import { Router } from 'express'
import HeadsetController from '../controller/headset.controller'


const headsetRoutes = Router()

headsetRoutes.post("/:cpfFuncionario", HeadsetController.store )
headsetRoutes.delete("/:cpfFuncionario", HeadsetController.delete )
headsetRoutes.put("/:cpfFuncionario", HeadsetController.update)


export default headsetRoutes