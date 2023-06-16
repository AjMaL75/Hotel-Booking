const mongoose = require("mongoose");


const roomSchema=mongoose.Schema({
    title:{
        type:String,
        requird:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        dafaul:false
    },
    roomNumber:[{number:Number,unavailableDates:{type:[Date]}}]
},{timestamps:true})

const Room=mongoose.model("Room",roomSchema)

module.exports=Room
