require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const mongoose = require('mongoose')
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 9181
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))


app.use("/api/branch", require("./routes/branchRoute"))
app.use("/api/client", require("./routes/clientRoute"))
app.use("/api/messege", require("./routes/messegeRoute"))
app.use("/api/orders", require("./routes/ordersRoute"))
app.use("/api/basket", require("./routes/basketRoute"))

app.use("/api/sweet", require("./routes/sweetRoure"))
app.use("/api/worker", require("./routes/workerRoute"))

app.use("/api/auth", require("./routes/authRoute"))

app.get("/", (req, res) => {
    res.send("this is the home page")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})


