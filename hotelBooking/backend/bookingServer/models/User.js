const { mongoose, Schema } = require("mongoose");


const Userschema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

const User=mongoose.model("User",Userschema)

module.exports=User