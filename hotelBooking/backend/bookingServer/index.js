const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const bookingserver=express()
const authRoute=require('./routes/auth')
const roomsRoute=require('./routes/rooms')
const hotelsRoute=require('./routes/hotels')
const usersRoute=require('./routes/users')
const cookieParser = require("cookie-parser")
const cors=require("cors")
dotenv.config()

const connect=async ()=>{
    try{
        await mongoose.connect(process.env.mongoURL)
        console.log("connected to mongodb successfully");
    }
    catch(error)
    {
        throw error
    }
}
mongoose.connection.off("disconnected",()=>
{
    console.log("mongoDB disconnected!");
}
)
mongoose.connection.on("connected",()=>
{
    console.log("mongoDB connected!");
}
)

//middlewares
bookingserver.use(cookieParser())
bookingserver.use(cors())
bookingserver.use(express.json())
bookingserver.use("/api/auth",authRoute)
bookingserver.use("/api/users",usersRoute)
bookingserver.use("/api/hotels",hotelsRoute)
bookingserver.use("/api/rooms",roomsRoute)

bookingserver.use((err,req,res,next)=>{
    errorStatus= err.status || 500
    errorMessage=err.message ||"something went wrong"
    res.status(errorStatus).json({
        success:false,
        message:errorMessage,
        status:errorStatus,
        stack:err.stack
    });
    next()
})

bookingserver.listen(8000,()=>{
    connect()
        console.log("...backend running");
})
