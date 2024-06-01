import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const swaggerDocument = YAML.load('./swagger.yaml');



app.use(cors())
app.use(express.json()) // habilita o express para receber dados no formato json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes) // habilita as rotas
app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`)
})

require("./database/connection")