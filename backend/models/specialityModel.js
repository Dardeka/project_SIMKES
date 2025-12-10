import mongoose from "mongoose";

const specialitySchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    gambar: {
        type: String,
        required: true
    }
})

export default mongoose.model("Spesialis", specialitySchema, "Spesialis")