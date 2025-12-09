import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "Pasien"
    },
    nik: {
        type: String,
        required: true
    },
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
    nomorTelepon: {
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
    }
})

export default mongoose.model("Dokter", doctorSchema, "Dokter")