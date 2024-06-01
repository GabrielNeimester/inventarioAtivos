import { Router } from 'express'
import NotebookController from '../controller/notebook'


const notebookRoutes = Router()

notebookRoutes.post("/:cpfFuncionario", NotebookController.store )
notebookRoutes.delete("/:cpfFuncionario", NotebookController.delete )
notebookRoutes.put("/:cpfFuncionario", NotebookController.update)


export default notebookRoutes