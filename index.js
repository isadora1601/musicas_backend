
import express from "express"
import cors from "cors"
import mysql2 from "mysql2"
import dotenv from "dotenv/config"

const app = express()

app.use(cors())
app.use(express.json())

const sql = mysql2.createPool({
    host: process.env.HOST_BANCO,
    user: process.env.USUARIO_BANCO,
    password: process.env.SENHA_BANCO,
    database: process.env.NOME_BANCO
})

app.get("/", (request, response) => {
    const comandoSelect = "SELECT * FROM musicas_isadora"

    sql.query(comandoSelect, (error, data) => {
        if (error) {
            console.error("Erro ao consultar o banco:", error)
            return response.status(500).send("Erro ao buscar músicas")
        }

        response.json(data)
    })
})

app.listen(3000, () => {
    console.log("Servidor online")
})
