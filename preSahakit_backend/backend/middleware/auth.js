const jwt= require('jsonwebtoken')
const config = process.env
const verifyToken = (req,res,next)=>{

    // console.log(req.headers.authorization)

   // const TokenArray = req.header.authorization.split(" ")[1]
    
    const authHeader = JSON.stringify(req.headers.authorization)
   
    if(!authHeader){
        res.status(403)
        throw new Error("A token is required for authentication")
    }
    
    const token = authHeader.substring(8, authHeader.length-1);

    // const token = authHeader.split(" ")[1].substring(0, authHeader.length - 100)
    // req.body.token || req.query.token || req.headers['x-access-token']  || req.header('Authorization')

    console.log(token)
    if(!token){
         res.status(403)
         throw new Error("A token is required for authentication")
    }

    try{
        const decode= jwt.verify(token, config.TOKEN_KEY)
        req.user=decode
    }catch(err){
        res.status(401)
        throw new Error('invalid token')
    }
    return next()
}
module.exports=verifyToken