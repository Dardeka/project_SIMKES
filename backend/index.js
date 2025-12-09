import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import patientRoute from "./routes/patientRoute.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", patientRoute)

const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected")
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`)
    })
}).catch((error) => console.log("Database connection failed : ",error));