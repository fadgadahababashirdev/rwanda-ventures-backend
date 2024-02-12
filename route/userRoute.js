const express = require("express")
const {createAccount,users,singleUser,deleteUser,updateUser , authentication} = require("../controllers/userController")
const checkFile = require("../helpers/multer")

const router = express.Router()

router.post("/addUser", checkFile.single("image"), createAccount)
router.get("/users",users)
router.get("/user/:id",singleUser)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id",checkFile.single("image"),updateUser)
router.post("/Login" , authentication)

module.exports = router