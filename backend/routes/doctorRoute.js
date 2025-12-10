import express from "express";
import { doctorLogin } from "../controller/doctorController.js";

const doctorRoute = express.Router()

doctorRoute.post("/login", doctorLogin)

export default doctorRoute