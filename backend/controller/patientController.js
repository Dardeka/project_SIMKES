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
            return res.json({token: accessToken, role : targetUser.role})
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}