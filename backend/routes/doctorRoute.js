import express from "express";
import { addInitialCheckupData, addPrescription, doctorLogin, getAllAppointment, getCertainPrescription, getDoctorDetail, updateCheckupData, updateExamId, updateStatus } from "../controller/doctorController.js";


const doctorRoute = express.Router()

// login
doctorRoute.post("/login", doctorLogin)

// get doctor detail
doctorRoute.get('/profileDetails/:id', getDoctorDetail)

// get all appointment
doctorRoute.get('/getAllAppointments', getAllAppointment)

// put examId
doctorRoute.put('/updateExamId/:id', updateExamId)

// Update status appointment
doctorRoute.put('/updateStatus/:id', updateStatus)

// post prescription to checkup database
doctorRoute.post('/addPrescription', addPrescription)

// get prescription
doctorRoute.get('/getPrescription/:id', getCertainPrescription)

// post initial data for checkup
doctorRoute.post('/addInitialExamination', addInitialCheckupData)

// put diagnose in checkup data
doctorRoute.put('/updateExamination/:id', updateCheckupData)





export default doctorRoute