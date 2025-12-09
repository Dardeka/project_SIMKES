import mongoose from "mongoose";

const registSchema = mongoose.Schema({
    id_pasien: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_dokter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
        required: true
    }
})

export default mongoose.model("Pendaftaran", registSchema, "Pendaftaran")