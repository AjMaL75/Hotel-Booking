const jwt = require("jsonwebtoken");
const createError = require("./error");


const verifyToken=(req,res,next)=>{
    const Token=req.cookies.access_token
    if(!Token) return next(createError(404,"You are not authenticated"))

    jwt.verify(Token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(404,"invalid token "))
        req.user=user  //it means we put in jwt sign method time id and isAdmin
        next()
    })
}

const verifyUser=(req,res,next)=>{
        verifyToken(req,res,()=>{
            if(req.user.id==req.params.id ||req.user.isAdmin)
            {
                next()
            }
            else{
                return next(createError(404,"You are not authorized"))
            }
        })
}
const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin)
        {
            next()
        }
        else{
            return next(createError(404,"You are not authorized"))
        }
    })
}
module.exports={verifyToken,verifyUser,verifyAdmin}
