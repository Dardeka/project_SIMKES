import Pasien from "../models/patientModel.js"

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

        const newUser = await Pasien.create({
            nik,
            namaLengkap,
            jenisKelamin,
            tanggalLahir,
            nomorTelepon,
            email,
            password
        })

        await newUser.save()
        res.status(200).json("SUCCESS")
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        console.log("Entering login section")
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}