const express=require("express")
const {createHotels,getAllHotels,getHotel,deleteHotel,updateHotel, getCountByCities, getCountByType} = require("../controllers/hotels")
const { verifyAdmin } = require("../utils/verifyToken")

const router=express.Router()


//CREATE
router.post("/",verifyAdmin, createHotels)
//UPDATE
router.put("/:id",verifyAdmin, updateHotel)

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//GET
router.get("/find/:id", getHotel)

//GETALL
router.get("/",getAllHotels)

//Get count by cities

router.get("/getCountByCities", getCountByCities)

//Get count by type
router.get("/getCountByType", getCountByType)

module.exports= router;