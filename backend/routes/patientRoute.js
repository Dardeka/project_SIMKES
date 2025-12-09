import express from "express"
import { login, register } from "../controller/patientController.js";

const patientRoute = express.Router();

patientRoute.post('/register', register)

patientRoute.post('/login', login)

// patientRoute.get('/:id')

export default patientRoute