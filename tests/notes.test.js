const supertest = require('supertest')

const mongoose = require('mongoose')

const {app, server} = require('../index')
const Note = require('../models/Note')


const api = supertest(app)

const initialNotes = [
    {   
        content: 'Aprendiendo FullStack JS con midudev',
        important: true,
        date: new Date()
    },
    {   
        content: 'Sigueme en https://midu.tube',
        important: true,
        date: new Date()
    }
]

//es un hook que indica que antes de cada test ejecutar
beforeEach(async()=>{
    await Note.deleteMany({})

    const note1 = new Note(initialNotes[0])
    await note1.save()
    
    const note2 = new Note(initialNotes[1])
    await note2.save()

})

test ('notes are returned as json',async()=> {

    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test ('there are two notes',async()=> {

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
})

test ('the first note is about midudev',async()=> {

    const response = await api.get('/api/notes')
    
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('Aprendiendo FullStack JS con midudev')
})

//el hook afterAll recibe un callback que se va a ejecutar una vez que terminan todos los test
afterAll(()=> {
    server.close()
    mongoose.connection.close()
})