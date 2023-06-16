const express=require("express")
const { updateUser, deleteUser, getUser, getAllUser } = require("../controllers/user")
const {verifyToken,verifyUser, verifyAdmin} = require("../utils/verifyToken")


const router=express.Router()


//UPDATE
router.put("/:id",verifyUser, updateUser)

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.status(200).json("Hello User ,You are logged")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>
// {
//     res.status(200).json("Hello User ,You are logged and you can edit the user")
// })
// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>
// {
//     res.status(200).json("Hello Admin ,You are logged and you can edit all the user")
// })

//DELETE
router.delete("/:id",verifyUser, deleteUser)

//GET
router.get("/:id",verifyUser, getUser)

//GETALL
router.get("/",verifyAdmin, getAllUser)

module.exports= router;