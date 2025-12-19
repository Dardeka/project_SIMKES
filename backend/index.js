import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import patientRoute from "./routes/patientRoute.js"
import adminRoute from "./routes/adminRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import path from "path"
import serverless from "serverless-http"

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
const environmentType = process.env.ENVIRONMENT

let handler = null

if(environmentType != "Production"){
    mongoose.connect(MONGOURL).then(() => {
        console.log("Database is connected")
        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}`)
        })
    }).catch((error) => console.log("Database connection failed : ",error));
    
}else{
    let isConnected = false;
    const connectDB = async () => {
        if (isConnected) return; // Gunakan koneksi yang sudah ada jika tersedia
    
        try {
            await mongoose.connect(MONGOURL);
            isConnected = true;
            console.log("Database connected successfully (Serverless)");
        } catch (error) {
            console.error("Database connection failed:", error);
        }
    };
    
    await connectDB()
    
    app.get("/", (req, res) => {
        res.send("Serverless API Running");
    });
    
    handler = serverless(app);
    
}
// Ekspor handler utama (wajib untuk serverless)
export { handler }

// Ekspor app Express secara default (berguna untuk testing lokal)
export default app;