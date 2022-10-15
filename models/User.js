//model es una funcion y Schema es una clase de mongoose
const {model, Schema} = require('mongoose') // para no hacer mongoose.Model

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes:[{
        type: Schema.Types.ObjectId, //si bien el id es un string, si ponemos string perdemos q es un objectid
        ref: 'Note'
    }
    ]
})

// cuando en el index se haga el response.json(note), internamente le ejecuta su toJSON
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)

module.exports =  User