import { Router } from 'express'
import funcionarioRoutes from './funcionario.routes'
import notebookRoutes from './notebook.routes'

const routes = Router()

routes.use('/funcionario', funcionarioRoutes)
routes.use('/notebook', notebookRoutes)

export default routes