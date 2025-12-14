import mongoose from "mongoose";

const registSchema = mongoose.Schema({
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
    id_pemeriksaan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pemeriksaan',
        default: null
    },
    tglRencanaKunjungan: {
        type: Date,
        required: true
    },
    nomorAntrian: {
        type: Number,
        required: true
    },
    keluhan: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Menunggu"
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export default mongoose.model("Pendaftaran", registSchema, "Pendaftaran")