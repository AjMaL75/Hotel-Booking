//import mongoose

const mongoose=require("mongoose")
const Schema=mongoose.Schema


//create a model for hotel

const HotelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String]
    
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    features:{
        type:Boolean,
        default:false
    }
})

Hotel=mongoose.model("Hotel",HotelSchema)
//export models
module.exports=Hotel