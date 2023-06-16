const Hotel = require("../models/Hotel");

const createHotels = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const getAllHotels = await Hotel.find();
    res.status(200).json(getAllHotels);
  } catch (err) {
    next(err);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getCountByCities = async (req, res, next) => {
    const cities=req.query.cities.split(",")
    try {
      const list=await Promise.all(cities.map(data=>{
        return Hotel.countDocuments({city:data})
      }))
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  const getCountByType = async (req, res, next) => {
    try {
      const hotelCount=await Hotel.countDocuments({type:"hotel"})
      const apartmentCount=await Hotel.countDocuments({type:"apartment"})
      const resortCount=await Hotel.countDocuments({type:"resort"})
      const villaCount=await Hotel.countDocuments({type:"villa"})
      const cabinCount=await Hotel.countDocuments({type:"cabin"})
      res.status(200).json([
        {type:"hotel",count:hotelCount},
        {type:"apartment",count:apartmentCount},
        {type:"resort",count:resortCount},
        {type:"villa",count:villaCount},
        {type:"cabin",count:cabinCount}
      ]);
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = {
  createHotels,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  getCountByCities,
  getCountByType
};
