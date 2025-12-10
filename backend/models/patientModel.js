import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    nik: {
        type: String,
        required: true
    },
    namaLengkap: {
        type: String,
        required: true
    },
    namaPanggilan: {
        type: String,
        default: ""
    },
    jenisKelamin: {
        type: String,
        required: true
    },
    tanggalLahir: {
        type: Date,
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
    alamat: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    resepObat: []
})

export default mongoose.model("Pasien", patientSchema, "Pasien")