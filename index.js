const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const { notFoundHandler, errorHandler } = require("./src/middleware/errorHandler")
const connectDb = require("./src/config/db")
require("dotenv").config()

const authRoutes = require("./src/routes/authRoutes")
const profileRoutes = require("./src/routes/profileRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

// middleware
app.use(cors({
    origin: ['https://uzzal-mern.netlify.app'],
    credentials: true
}));

// database connection
connectDb()

// home route
app.get("/", (_req, res) => {
    res.send("Welcome to app")
})

// Others routes
app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
