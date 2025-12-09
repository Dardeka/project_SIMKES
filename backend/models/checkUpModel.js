import mongoose from "mongoose";

const checkUpSchema = mongoose.Schema({
    id_pasien: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_dokter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tanggalPeriksa: {
        type: Date,
        required: true
    },
    diagnosa: {
        type: String,
        required: true
    }
})

export default mongoose.model("Pemeriksaan", checkUpSchema, "Pemeriksaan")