import Dokter from "../models/doctorModel.js"
import Admin from "../models/adminModel.js"
import Fasilitas from "../models/facilityModel.js"
import Spesialis from "../models/specialityModel.js"
import Pasien from "../models/patientModel.js"

import pkg from 'jsonwebtoken'
const { sign } = pkg

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const targetAdmin = await Admin.findOne({email: email})

        if(!targetAdmin){
            return res.json({error: "Admin account not found"})
        }

        if(password === targetAdmin.password){
            const accessToken = sign(
                {email: targetAdmin.email, id: targetAdmin._id},
                "importantsecret"
            )
            return res.json({accessToken: accessToken})
        }
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin get patient
export const getAllPatient = async (req, res) => {
    try {
        const allPatients = await Pasien.find()

        return res.status(200).json(allPatients)
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin add doctor
export const addDoctor = async (req, res) => {
    try {
        const { namaDokter, jenisKelamin, pendidikanDokter, pengalamanDokter, deskripsiDokter, spesialisDokter, emailDokter, passwordDokter } = req.body
        const image = req.file ? `/images/${req.file.filename}` : ''
        
        const newDoctor = await Dokter.create({
            foto_profil: image,
            namaLengkap: namaDokter,
            jenisKelamin: jenisKelamin,
            pendidikan: pendidikanDokter,
            pengalaman: pengalamanDokter,
            deskripsi: deskripsiDokter,
            spesialis: spesialisDokter,
            email: emailDokter,
            password: passwordDokter,
            status: "Aktif"
        })
        
        const addedData = await newDoctor.save()
        
        console.log("Added doctor data to the database")
        return res.status(200).json({addedData})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin show all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctorData = await Dokter.find()
        return res.status(200).json(doctorData)
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({error: error.message})
    }
}

// Admin update doctor status
export const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body
        console.log("This is body : ", req.body)
        await Dokter.findByIdAndUpdate(id, {status: status})

        return res.status(200).json({message: "Status diperbarui!"})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin add facility
export const addFacility = async (req, res) => {
    try {
        const { namaFasilitas, deskripsiFasilitas } = req.body
        const image = req.file ? `/images/${req.file.filename}` : ''

        const newFacility = await Fasilitas.create({
            nama: namaFasilitas,
            deskripsi: deskripsiFasilitas,
            gambar: image
        })

        await newFacility.save()
        return res.status(200).json({message: "Fasilitas baru berhasil ditambahkan!"})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin get all facilities
export const getAllFacilities = async (req, res) => {
    try {
        const facilitiesData = await Fasilitas.find()
        return res.status(200).json(facilitiesData)
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin add speciality
export const addSpeciality = async (req, res) => {
    try {
        // console.log("ini isi body ", req.body)
        const { namaSpesialis, deskripsi } = req.body
        const image = req.file ? `/images/${req.file.filename}` : ''
        
        const newSpeciality = await Spesialis.create({
            nama: namaSpesialis,
            deskripsi: deskripsi,
            gambar: image
        })
        
        const newData = await newSpeciality.save()
        return res.status(200).json({newData})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin get all speciality
export const getAllSpeciality = async (req, res) => {
    try {
        const allSpeciality = await Spesialis.find()
        return res.status(200).json(allSpeciality)
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin update Speciality
export const updateSpeciality = async (req, res) => {
    try {
        const { _id, namaSpesialis, deskripsi } = req.body
        const image = req.file ? `/images/${req.file.filename}` : ''
        
        await Spesialis.findByIdAndUpdate(_id,{nama: namaSpesialis, deskripsi: deskripsi, gambar: image })
        
        return res.status(200).json({message: "Spesialis berhasil diperbarui"})
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin update facility
export const updatefacility = async (req, res) => {
    try {
        const { id } = req.params
        const { namaFasilitas, deskripsiFasilitas } = req.body
        const image = req.file ? `/images/${req.file.filename}` : ''
        
        const data = await Fasilitas.findByIdAndUpdate(id, {nama: namaFasilitas, deskripsi: deskripsiFasilitas, gambar: image})

        return res.status(200).json(data)
    } catch (error) {
        console.log({error: error.message})
    }
}

// Admin delete facility
export const deleteFacility = async (req, res) => {
    try {
        const {id} = req.params

        const respond = await Fasilitas.findByIdAndDelete(id)

        return res.status(200).json(respond)
    } catch (error) {
        console.log({error: error.message})
    }
}