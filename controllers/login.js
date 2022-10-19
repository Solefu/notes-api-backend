const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const loginRouter = require('express').Router()


loginRouter.post('/', async(request, response)=>{

    const {username, password} = request.body

    const user = await User.findOne({username})

    const passwordCorrect = user===null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect){
        return response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username
    }

    //la validez del token en segundos, dura 7 días
    const token = jwt.sign(userForToken, process.env.SECRET,{
        expiresIn: 60 * 60 * 24 * 7 
    })

    response.send({
        name: user.name,
        username: user.username,
        token
    })

})

module.exports = loginRouter