import mongoose from "mongoose";

const facilitySchema = mongoose.Schema({
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

export default mongoose.model("Fasilitas", facilitySchema, "Fasilitas")