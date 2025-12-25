import Dokter from "../models/doctorModel.js"
import Kunjungan from "../models/registerModel.js"
import Resep from "../models/receiptModel.js"
import Pemeriksaan from "../models/checkUpModel.js"

import pkg from 'jsonwebtoken'
const { sign } = pkg

// login
export const doctorLogin = async (req, res) => {
    try {
        const {email, password} = req.body
    
        const targetDoctor = await Dokter.findOne({email: email})
    
        if(!targetDoctor){
            return res.status(400).json({message: "Dokter tidak terdaftar di database"})
        }
    
        if(password === targetDoctor.password){
            const accessToken = sign(
                {namaLengkap: targetDoctor.namaLengkap, id: targetDoctor._id},
                "importantsecret"
            )
            return res.json({accessToken: accessToken})
        }
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to login"})
    }
}

// get doctor detail
export const getDoctorDetail = async (req, res) => {
    try {
        const { id } = req.params
        console.log("Ini id dokter: ", id)
        const targetUser = await Dokter.findById(id)

        console.log("ini data dokter: ", targetUser)
        return res.status(200).json(targetUser)
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to fetch doctor detail"})
    }
}

// get all patient appointment 
export const getAllAppointment = async (req, res) => {
    try {
        const response = await Kunjungan.find()
        return res.status(200).json(response)
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to fetch all appointments"})
    }
}

// Handle update examinationId according to visit id
export const updateExamId = async (req, res) => {
    try {
        const { id } = req.params
        const { examId } = req.body

        console.log("This is exam id", examId, " idKunjungan: ",id )

        await Kunjungan.findByIdAndUpdate(id, {id_pemeriksaan: examId}, {new: true})

        return res.status(200).json({"id_kunjungan": id,"status": 'Selesai'})
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to update examination ID"})
    }
}

// Handle status Change
export const updateStatus = async (req, res) => {
    try {
        const {id} = req.params
        const { newStatus } = req.body

        await Kunjungan.findByIdAndUpdate(id, {status: newStatus})
        
        return res.status(200).json({message: `Update berhasil dengan id ${id} dan status ${newStatus}`})
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to update status"})
    }
}

// Handle add prescription
export const addPrescription = async (req, res) => {
    try {
        const { id_pasien, id_dokter, id_pemeriksaan, tanggal_terbit, obat } = req.body

        console.log("Adding prescription!")
        // console.log("Isi req body :", req.body)
        const addData = await Resep.create({
            id_pasien: id_pasien,
            id_dokter: id_dokter,
            id_pemeriksaan: id_pemeriksaan,
            tanggal_terbit: tanggal_terbit,
            obat: obat
        })

        const savedData = await addData.save()
        console.log("(BACKEND) this is saved data: ", savedData)
        return res.status(200).json("id_resepObat", savedData._id)
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to add prescription"})
    }
}

// Handle get prescription
export const getCertainPrescription = async (req, res) => {
    try {
        const { id } = req.params
        console.log("Id nya : ", id)
        const targetData = await Resep.findOne({id_pemeriksaan: id})

        console.log("This is the prescription: ", targetData)
        
        return res.status(200).json(targetData || {})
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to fetch certain prescription"})
    }
}

// Handle add Check up
export const addInitialCheckupData = async (req, res) => {
    try {
        const { idKunjungan, idDokter, idPasien, tanggalPeriksa, keluhan } = req.body

        const data = await Pemeriksaan.create({
            id_pasien: idPasien,
            id_dokter: idDokter,
            id_pendaftaran: idKunjungan,
            tanggalPeriksa: tanggalPeriksa,
            keluhan: keluhan
        })

        const savedData = await data.save()
        return res.status(200).json({"id_pemeriksaan": savedData._id})
    } catch (error) {
        console.log("Ini error bagian initial periksa : ",{error: error.message})
        return res.status(500).json({message: "Failed to create initial examination data"})
    }
}

// Handle update checkup
export const updateCheckupData = async (req, res) => {
    try {
        const { id } = req.params
        const { diagnosa } = req.body
        console.log("(BACKEND) This is diagnosis: ", diagnosa)

        const updateData = await Pemeriksaan.findByIdAndUpdate(id, {diagnosa: diagnosa}, {new: true})

        if(!updateData){
            console.log("\n Update failed!")
            return res.status(404).json({error: "Failed bro"})
        }
        
        return res.status(200).json({updateData})
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to update checkup data"})
    }
}

// Handle get history
export const getHistory = async (req, res) => {
    try {
        const {id} = req.params

        let data = []
        // fetch data history
        const respond = await Pemeriksaan.find({id_pasien: id})
        
        for(const x in respond){
            // fetch doctor detail
            const docDetail = await Dokter.findById(respond[x].id_dokter)

            // fetch prescription data
            const prescriptionData = await Resep.findOne({
                id_pasien: id,
                id_pemeriksaan: respond[x]._id
            })

            const formatted = {
                _id: respond[x]._id,
                id_pasien: respond[x].id_pasien,
                id_dokter: respond[x].id_dokter,
                namaDokter: docDetail.namaLengkap,
                tanggalPeriksa: respond[x].tanggalPeriksa,
                keluhan: respond[x].keluhan,
                diagnosa: respond[x].diagnosa,
                obat: prescriptionData?.obat
            }

            data.push(formatted)
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log({error: error.message})
        return res.status(500).json({message: "Failed to fetch history"})
    }
}

