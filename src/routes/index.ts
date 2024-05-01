import { Router } from 'express'
import funcionarioRoutes from './funcionario/funcionario.routes'

const routes = Router()

routes.use('/funcionario', funcionarioRoutes)

export default routes