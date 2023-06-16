const express=require("express")
const { createRooms, updateRoom, deleteRoom, getRoom, getAllRooms } = require("../controllers/rooms")
const { verifyAdmin } = require("../utils/verifyToken")

const router=express.Router()

//CREATE
router.post("/:hotelid",verifyAdmin, createRooms)
//UPDATE
router.put("/:id",verifyAdmin, updateRoom)

//DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//GET
router.get("/:id", getRoom)

//GETALL
router.get("/",getAllRooms)

module.exports= router;