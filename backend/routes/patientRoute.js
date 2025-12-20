import express from "express"
import { addProfileImage, createAppointment, getAllDoctorsAccount, getCertainPrescription, getCertainSpeciality, getDetailProfile, getHistory, login, register, updateDetailProfile } from "../controller/patientController.js";

// Image uploader things
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({storage: storage})

// import path from "path"
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '..', 'public', 'images'));
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, unique + ext);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
// });

const patientRoute = express.Router();

patientRoute.post('/register', register)

patientRoute.post('/login', login)

// Patient see all doctor
patientRoute.get('/getAllDoctor', getAllDoctorsAccount)

// Patient make an appointment
patientRoute.post('/createAppointment', createAppointment)

// Get patient detail account
patientRoute.get('/profile/:id', getDetailProfile)

// update patient detail
patientRoute.put('/updateProfile/:id', updateDetailProfile)

// upload profile picture
patientRoute.put('/uploadProfileImage/:id', upload.single('image'), addProfileImage)

// Handle get certain speciality
patientRoute.get('/getCertainSpeciality/:id', getCertainSpeciality)

// Handle get patient history
patientRoute.get('/getHistory/:id', getHistory)

// Handle get certain prescription
patientRoute.get('/getPrescription/:id', getCertainPrescription)

export default patientRoute