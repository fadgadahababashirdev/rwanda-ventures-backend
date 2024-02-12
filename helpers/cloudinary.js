const cloudinary = require("cloudinary");
require("dotenv").config()


cloudinary.config({
    cloud_name: "dohrhxweu",
    api_key: "198812435595688",
    api_secret: "u4JRT7ZbFuP9IvZcurZWpYiBT4Y"
});

const uploadToCloud = async(file,res)=>{
    try {
        const response = await cloudinary.uploader.upload(file.path)
        return response;
    } catch (error) {
        return res.status(400).json({status: "failed", message: error.message})
    }
}

module.exports = uploadToCloud