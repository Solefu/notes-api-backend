
const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')

const Note = require('../models/note')

const User = require('../models/user')

//relativo a /api/notes
notesRouter.get('/', async (request, response) =>{

    const notes = await Note.find({}).populate('user',{
        username: 1,
        name: 1,
        _id: 1
    })
    response.json(notes)

    /* Antes: promesas:
        Note.find({}).then(notes => {
            response.json(notes)
        }) */
})

notesRouter.get('/:id', (request, response, next) =>{
   
    const {id} = request.params

    Note.findById(id).then(note => {
        if(note){
            return response.json(note)//Midudev puso return pero no se si va
    
        }else{
            response.status(404).end()
        } 
    }).catch(err => {
        //console.log(err)
        //response.status(400).end()
        // en vez de las lineas anteriores, usamos next (middleware)
        next(err)
    })

})

notesRouter.post('/', userExtractor, async(request, response, next) => {

    const note = request.body

    const userId = request.userId

    const user = await User.findById(userId)

    if(!note || !note.content){

        // el return sale y si no lo ponemos y sumamos .end no corta.
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false,
        user: user._id // idem user: user.toJSON().id
    })

    //newNote.save().then(saveNote => { response.status(201).json(saveNote)})

    try{
        const savedNote = await newNote.save()

        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        response.json(savedNote)

    }catch(error){
        next(error)
    }
})


notesRouter.delete('/:id', (request, response, next) =>{
    const {id} = request.params

    Note.findByIdAndRemove(id).then(() => {
      
    }).catch(error => next(error))

    response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) =>{

    const {id} = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
        .then(result => {
            response.json(result)})
        .catch(error => next(error))

})


module.exports = notesRouter