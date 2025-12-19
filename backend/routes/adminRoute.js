import express from "express"
import { addDoctor, addFacility, addSpeciality, adminLogin, deleteFacility, getAllDoctors, getAllFacilities, getAllPatient, getAllSpeciality, updatefacility, updateSpeciality, updateStatus } from "../controller/adminController.js"
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({storage: storage})


const adminRoute = express.Router()

// Handle login admin
adminRoute.post('/login', adminLogin)

// Handle get all patient account
adminRoute.get('/getAllPatientsAccount', getAllPatient)

// Handle add Doctor
adminRoute.post('/addDoctor', upload.single('gambarDokter'), addDoctor)

// Handle get all doctor data
adminRoute.get('/allData', getAllDoctors)

// Handle update doctor status
adminRoute.put('/updateStatus', updateStatus)

// Handle add facility
adminRoute.post('/addFacility', upload.single('gambarFasilitas'), addFacility)

// Handle get all facilities
adminRoute.get('/getAllfacilities', getAllFacilities)

// Handle update facility
adminRoute.put('/updateFacility/:id',upload.single('gambarFasilitas'), updatefacility)

// Handle delete 
adminRoute.delete('/deleteFacility/:id', deleteFacility)

// Handle add Speciality
adminRoute.post('/addSpeciality', upload.single('gambarSpesialis'), addSpeciality)

// Handle get all speciality
adminRoute.get('/getAllSpecialities', getAllSpeciality)

// Handle update speciality
adminRoute.put('/updateSpeciality', upload.single('gambar'), updateSpeciality)


export default adminRoute