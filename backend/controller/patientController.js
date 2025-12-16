import Pasien from "../models/patientModel.js"
import Doctor from "../models/doctorModel.js"
import Daftar from "../models/registerModel.js"
import Spesialis from "../models/specialityModel.js"
import Pemeriksaan from "../models/checkUpModel.js"
import Resep from "../models/receiptModel.js"

import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken'
const { sign } = pkg

export const register = async (req, res) => {
    try {
        const userData = new Pasien(req.body)
        const { nik, namaLengkap, tanggalLahir, jenisKelamin, email, password, nomorTelepon } = userData

        const userExist = await Pasien.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exist."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await Pasien.create({
            nik,
            namaLengkap,
            jenisKelamin,
            tanggalLahir,
            nomorTelepon,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(200).json("SUCCESS")
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const targetUser = await Pasien.findOne({email: email})

        if(!targetUser){
            return res.json({error: "User not found! Please do registration first!"})
        }

        console.log("The user is : ", targetUser)

        bcrypt.compare(password, targetUser.password).then((match) => {
            if(!match) {
                return res.json({error: "Wrong email and password combination"})
            }

            const accessToken = sign(
                {namaLengkap: targetUser.namaLengkap, id: targetUser._id},
                "importantsecret"
            )
            return res.json({accessToken: accessToken, role : targetUser.role})
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getAllDoctorsAccount = async (req, res) => {
    try {
        const allDoctor = await Doctor.find()

        return res.status(200).json(allDoctor)
    } catch (error) {
        console.log({error: error.message})
    }
}

export const createAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, keluhanPasien, date, createdTime } = req.body

        const count = await Daftar.countDocuments({
            id_dokter: doctorId,
            tglRencanaKunjungan: date
        })

        const newAppointment = await Daftar.create({
            id_pasien: patientId,
            id_dokter: doctorId,
            tglRencanaKunjungan: date,
            nomorAntrian: count+1,
            keluhan: keluhanPasien,
            createdAt: createdTime
        })

        const created = await newAppointment.save()
        return res.status(200).json(created)
    } catch (error) {
        console.log({error: error.message})
    }
}

export const getDetailProfile = async (req, res) => {
    try {
        const {id} = req.params
        const targetUser = await Pasien.findById(id)
        return res.status(200).json(targetUser)
    } catch (error) {
        console.log({error: error.message})
    }
}

export const updateDetailProfile = async (req, res) => {
    try {
        const {id} = req.params
        const { nik, namaLengkap, namaPanggilan, jenisKelamin, tanggalLahir, nomorTelepon, email, alamat, password,} = req.body
        console.log("This is id : ", id)
        console.log("update info", req.body)
        const updatedPatient = await Pasien.findByIdAndUpdate(id, {nik: nik, namaLengkap: namaLengkap, namaPanggilan: namaPanggilan, jenisKelamin: jenisKelamin, tanggalLahir: tanggalLahir, nomorTelepon: nomorTelepon, email: email, alamat: alamat, password: password})
        return res.status(200).json(updatedPatient)
    } catch (error) {
        console.log({error: error.message})
    }
}

export const addProfileImage = async (req, res) => {
    try {
        const { id } = req.params
        const image = req.file ? `/images/${req.file.filename}` : ''

        await Pasien.findByIdAndUpdate(id, {foto_profil: image})

        return res.status(200).json({message: "Image has been updated!"})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Patient get certain speciality
export const getCertainSpeciality = async (req, res) => {
    try {
        const {id} = req.params
        console.log("this is id : ", id)
        const targetSpecialist = await Spesialis.findOne({_id: id})
        
        return res.status(200).json(targetSpecialist)
    } catch (error) {
        console.log("This is error",{error: error.message})
    }
}

export const getHistory = async (req, res) => {
    try {
        const {id} = req.params

        // fetch data history
        const respond = await Pemeriksaan.findOne({id_pasien: id})
        
        // fetch doctor detail
        const docDetail = await Doctor.findById(respond.id_dokter)

        // fetch visit data
        const visitHistory = await Daftar.findOne({id_pasien: id})

        // fetch prescription data
        const prescriptionData = await Resep.findOne({id_pemeriksaan: respond._id})
        
        const formatted = {
            _id: respond._id,
            id_pasien: respond.id_pasien,
            id_dokter: respond.id_dokter,
            namaDokter: docDetail.namaLengkap,
            tanggalPeriksa: respond.tanggalPeriksa,
            keluhan: respond.keluhan,
            diagnosa: respond.diagnosa,
            obat: prescriptionData.obat,
            status: visitHistory.status
        }
        
        console.log("(BACKEND) This is history: ", formatted)
        return res.status(200).json(formatted)
    } catch (error) {
        console.log({error: error.message})
    }
}

// Patient get certain prescription
export const getCertainPrescription = async (req, res) => {
    try {
        console.log(("get Prescription"))
    } catch (error) {
        console.log({error: error.message})   
    }
}
