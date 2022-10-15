require('dotenv').config()
require('./mongo') //esto ejecuta todo el contenido del archivo mongo.js

const express = require('express')
const app = express()

const cors = require('cors')


const logger = require('./loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(express.json()) //para soportar json en los request y saber parsear a JSON

app.use(logger)

app.get('/', (request, response)=>{

    response.send('<h1> Hello World </h1>')
})


app.use('/api/users', usersRouter)

app.use('/api/notes', notesRouter)

app.use(handleErrors)

app.use(notFound)

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports = {app, server}