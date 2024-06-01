const mongoose = require("mongoose")

const user = process.env.USER
const password = process.env.PASSWORD


const connect = () => {
    mongoose.connect(`mongodb://localhost:27017/inventarioAtivos`)

    const connection = mongoose.connection

    connection.on("error", ()=>{
        console.error('Erro ao conectart com o mongoDB')
    })

    connection.on("open", ()=>{
        console.log('Conectado ao mongoDB com sucesso')
    })

}

connect()


module.exports = mongoose