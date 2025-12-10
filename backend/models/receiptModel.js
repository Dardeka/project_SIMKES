import mongoose from "mongoose";

const receiptSchema = mongoose.Schema({
    id_pasien: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_dokter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_kunjungan: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tanggal_terbit: {
        type: Date,
        required: true
    },
    obat: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

export default mongoose.model("ResepObat", receiptSchema, "ResepObat")