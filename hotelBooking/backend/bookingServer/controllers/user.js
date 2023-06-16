
const User = require("../models/User");


const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json(getAllUser);
  } catch (err) {
    next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {

  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
