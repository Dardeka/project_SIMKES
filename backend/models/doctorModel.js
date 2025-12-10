import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
    namaLengkap: {
        type: String,
        required: true
    },
    jenisKelamin: {
        type: String,
        required: true
    },
    spesialis: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pendidikan: {
        type: String,
        required: true
    },
    pengalaman: {
        type: String,
        required: true
    },
    foto_profil: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("Dokter", doctorSchema, "Dokter")