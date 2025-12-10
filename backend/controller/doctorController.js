import Dokter from "../models/doctorModel.js"


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
    }
}

// get schedule
export const getSchedule = async (req, res) => {

}