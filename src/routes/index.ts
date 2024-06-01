import { Router } from 'express'
import funcionarioRoutes from './funcionario.routes'
import notebookRoutes from './notebook.routes'
import celularRoutes from './celular.routes'
import desktopRoutes from './desktop.routes'
import headsetRoutes from './headset.routes'
import monitorRoutes from './monitor.routes'
import mouseRoutes from './mouse.routes'
import nobreakRoutes from './nobreak.routes'
import tecladoRoutes from './teclado.routes'

const routes = Router()

routes.use('/funcionario', funcionarioRoutes)
routes.use('/notebook', notebookRoutes)
routes.use('/celular', celularRoutes)
routes.use('/desktop', desktopRoutes)
routes.use('/headset', headsetRoutes)
routes.use('/monitor', monitorRoutes)
routes.use('/mouse', mouseRoutes)
routes.use('/nobreak', nobreakRoutes)
routes.use('/teclado', tecladoRoutes)


export default routes