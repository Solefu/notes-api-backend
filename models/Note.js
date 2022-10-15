
//model es una funcion y Schema es una clase de mongoose
const {model, Schema} = require('mongoose') // para no hacer mongoose.Model

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user:{ //una nota, un solo usuario
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// cuando en el index se haga el response.json(note), internamente le ejecuta su toJSON
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model('Note', noteSchema)

module.exports = Note