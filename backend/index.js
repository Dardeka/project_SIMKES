import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import patientRoute from "./routes/patientRoute.js"
import adminRoute from "./routes/adminRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import path from "path"

dotenv.config()
const app = express()

app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

app.use(express.json())
app.use(cors())

// Route for patient
app.use("/api", patientRoute)

// Route for Admin
app.use("/api/admin", adminRoute)

// Route for Doctor
app.use("/api/doctor", doctorRoute)

const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected")
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`)
    })
}).catch((error) => console.log("Database connection failed : ",error));