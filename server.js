const express=require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const con = async()=>{
    try {
        await mongoose.connect(process.env.database)
        console.log("connected successfully")
        app.listen(process.env.port, console.log(`app is running at http://localhost:${process.env.port}`))
    } catch (error) {
        console.log(error)
    }
}
con()

// routes
const userRouter = require("./route/userRoute")
app.use("/" , userRouter)
app.use('/*', (req, res) => {
    res.status(404).json({ message: "url not found"})
})


