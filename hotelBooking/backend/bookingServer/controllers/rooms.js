const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createRooms = async (req, res, next) => {
    const hotelId=req.params.hotelid
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try{
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
    }
    catch(err)
    {
        next(err)
    }
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const getAllRooms = await Room.find();
    res.status(200).json(getAllRoom);
  } catch (err) {
    next(err);
  }
};
const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteRoom = async (req, res, next) => {
    const hotelId=req.params.hotelid
  try {
    await Room.findByIdAndDelete(req.params.id);
    try{
        await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
    }
    catch(err)
    {
        next(err)
    }
    res.status(200).json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createRooms,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
