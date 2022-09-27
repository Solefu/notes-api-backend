let notes = [

    {
        'id': 1,
        'content': 'Me tengo que suscribir a @midudev en Youtube',
        'date': '2019-05-30T17:30:31.098Z',
        'important': true
    },
    {
        'id': 2,
        'content': 'Tengo que estudiar las clases de FullStack Bootcamp',
        'date': '2019-05-30T17:30:31.098Z',
        'important': false
    },
    {
        'id': 3,
        'content': 'Repasar los retos de JS de midudev',
        'date': '2019-05-30T17:30:31.098Z',
        'important': true
    }
]


const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json()) //para soportar json en los request y saber parsear a JSON

app.use(logger)

app.get('/', (request, response)=>{

    response.send('<h1> Hello World </h1>')
})

//para las apis usamos la arquitectura REST (get, post, delete, put)
app.get('/api/notes', (request, response)=>{

    response.json(notes)
})

app.get('/api/notes/:id', (request, response)=>{

    const id = Number(request.params.id)
    const note = notes.find(note => note.id == id)

    if(note){
        response.json(note)

    }else{
        response.status(404).end()
        //response.status(404).send('no existe che la nota que pedis').end()
    }
})

app.delete('/api/notes/:id', (request, response)=>{

    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()

})


app.post('/api/notes', (request, response)=>{
    const note = request.body

    if(!note || !note.content){

        // el return sale y si no lo ponemos y sumamos .end no corta.
        return response.status(400).json({
            error: 'note.content is missing'
        })

    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString
    }

    notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

app.use((request, response) => {

    response.status(404).json({
        error: 'Not Found'
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
