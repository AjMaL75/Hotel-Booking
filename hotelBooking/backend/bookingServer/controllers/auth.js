const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt= require("jsonwebtoken");
const register = async (req, res, next) => {
    try {
      var salt = await bcrypt.genSalt(10); // Add await here
      var hash = await bcrypt.hash(req.body.password, salt);
      
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      
      await newUser.save();
      
      res.status(200).json("New user has been created successfully.");
      
    } catch (err) {
      next(err);
    }
  };

//login function
const login = async (req, res, next) => {
    try {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return next(createError(404, "there is no user in this name"));
  }
  const isPassworCorrect=await bcrypt.compare(req.body.password,user.password)
 
    if (!isPassworCorrect) {

      return next(createError(404,"wrong password or username"))
    }
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
    const {password,isAdmin,...otherDetails}=user._doc
    res.cookie("access_token",token,{
        httpOnly:true
    }).status(200).json(otherDetails)
   
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login }
