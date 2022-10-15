const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

const User = require('../models/user')

//relativo a /api/users

usersRouter.get('/', async(request, response)=>{

    //populate sin el segundo parametro {},trae todos los campos de notas
    const users = await User.find({}).populate('notes',{
        content: 1,
        important: 1, //no se banca poner un important: 0, es solo para _id que lo trae por defecto. si no lo queremos no ponerlo
        date: 1,
        _id: 0
    })

    response.json(users)

})


usersRouter.post('/', async (request, response) => {

    const { body } = request
    const { username, name, password} = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})


module.exports = usersRouter


