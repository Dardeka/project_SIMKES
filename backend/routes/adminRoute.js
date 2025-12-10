import express from "express"
import { addDoctor, addFacility, addSpeciality, adminLogin, getAllDoctors, getAllFacilities, getAllPatient, getAllSpeciality, updateSpeciality } from "../controller/adminController.js"
import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
});

const adminRoute = express.Router()

// Handle login admin
adminRoute.post('/login', adminLogin)

// Handle get all patient account
adminRoute.get('/getAllPatientsAccount', getAllPatient)

// Handle add Doctor
adminRoute.post('/addDoctor', upload.single('gambarDokter'), addDoctor)

// Handle get all doctor data
adminRoute.get('/allData', getAllDoctors)

// Handle add facility
adminRoute.post('/addFacility', upload.single('gambarFasilitas'), addFacility)

// Handle get all facilities
adminRoute.get('/getAllfacilities', getAllFacilities)

// Handle add Speciality
adminRoute.post('/addSpeciality', upload.single('gambarSpesialis'), addSpeciality)

// Handle get all speciality
adminRoute.get('/getAllSpecialities', getAllSpeciality)

// Handle update speciality
adminRoute.put('/updateSpeciality', upload.single('gambar'), updateSpeciality)

export default adminRoute