const User = require('../model/user');
const bcrypt = require('bcryptjs');
const uploadToCloud = require('../helpers/cloudinary');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createAccount = async (req, res) => {
  try {
    const genS = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, genS);
    const upload = await uploadToCloud(req.file, res);
    console.log(upload.secure_url);

    const newUser = await User.create({
      image: upload.secure_url,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
    });
    res.status(200).json({ success: "user created successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const users = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ success: "users found successfully", allUsers });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
};
const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: "user found successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ status: "user could not be found", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "user deleted successfully", deleteUser });
  } catch (error) {
    res
      .status(500)
      .json({ status: "user could not be found", message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      console.log(result.secure_url);
      const putUser = await User.findByIdAndUpdate(req.params.id, {
        image: result.secure_url,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      });
    } else {
      const putUserWithoutFile = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      });
    }
    res.status(200).json({ status: "updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
};

const authentication = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({message: "User not found"})
        }
        if(await bcrypt.compare(req.body.password , user.password)){
            res.status(200).json({
                message:"user Loggen in successfully",
                token:jwt.sign({userId:user._id} , process.env.jwt_secret , {expiresIn :"1days"} , user)
            })
        }else{
            res.status(401).json({message:"Please check your credentials and try again"})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
module.exports = { createAccount, users, singleUser, deleteUser, updateUser , authentication };
