import mongoose from "mongoose";

const checkUpSchema = mongoose.Schema({
    id_pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        required: true
    },
    id_dokter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dokter',
        required: true
    },
    id_pendaftaran: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pendaftaran',
        required: true
    },
    obat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResepObat'
    },
    tanggalPeriksa: {
        type: Date,
        required: true
    },
    keluhan: {
        type: String,
        required: true,
    },
    diagnosa: {
        type: String,
        default: ""
    }
})

export default mongoose.model("Pemeriksaan", checkUpSchema, "Pemeriksaan")