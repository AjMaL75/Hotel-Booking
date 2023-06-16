const { Error } = require("mongoose")

const createError=(errorStatus,errorMessage)=>{
    const err=new Error()
    err.message=errorMessage
    err.status=errorStatus
    return err
}

module.exports=createError