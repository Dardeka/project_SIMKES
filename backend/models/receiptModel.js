import mongoose from "mongoose";

const obatSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    dosis: {
        type: String,
        required: true
    },
    jumlah: {
        type: Number,
        required: true
    }
}, {_id: false})

const receiptSchema = mongoose.Schema({
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
        required: true
    },
    tanggal_terbit: {
        type: Date,
        required: true
    },
    obat: [obatSchema],
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
})

export default mongoose.model("ResepObat", receiptSchema, "ResepObat")