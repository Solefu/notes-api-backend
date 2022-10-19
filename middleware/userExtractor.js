const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {

    const authorization = request.get('authorization') //posición 7 empieza token"
    let token = null
    
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7) 
    }
    
    let decodedToken = {}
    
    try{
        decodedToken = jwt.verify(token, process.env.SECRET)
    }catch(e){
    
        console.log(e)
    }
    
    
    if(!token || !decodedToken.id){
        return response.status(401).json({error: 'token is missing or invalid'})
    }   
    
    const { id: userId} = decodedToken

    request.userId = userId

    next()

}

module.exports = userExtractor