import CustomSidebar from "../../components/adminCustomSidebar";
import { Button } from "../../components/ui/button"; 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table" 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from "react"; // Tambahkan React ke import
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Tambah ikon untuk aksi

// DUMMY DATA (untuk memastikan tampilan rapi jika API gagal)
const dummyFacilities = [
    { _id: '60c72b9f', nama: 'Ruang Operasi', deskripsi: 'Dilengkapi peralatan bedah modern dan sistem monitoring pasien terbaru.', gambar: '/images/dummy-op.jpg' },
    { _id: '60c72b12', nama: 'Laboratorium Medis', deskripsi: 'Menyediakan layanan tes darah, urine, dan pemeriksaan patologi anatomi dengan hasil akurat.', gambar: '/images/dummy-lab.jpg' },
    { _id: '60c72b56', nama: 'Instalasi Gawat Darurat', deskripsi: 'Layanan 24 jam dengan tim medis ahli untuk penanganan kasus darurat.', gambar: '/images/dummy-igd.jpg' },
];

function KelolaFasilitas() {
    const navigate = useNavigate();
    // Gunakan dummy data sebagai fallback atau inisialisasi
    const [facilities, setFacilities] = useState(dummyFacilities); 
    const [facilityImage, setFacilityImage] = useState(null);

    // DUMMY FETCH, akan menggunakan yang dari kode Anda aslinya
    useEffect(() => {
        const facilitiesData = async () => {
             // Menggunakan data dummy sementara
             // setFacilities(dummyFacilities); 

            await fetch('http://localhost:3001/api/admin/getAllFacilities')
            .then(response => response.json())
            .then(data => {
                if(data && data.length > 0) {
                    setFacilities(data);
                } else {
                    setFacilities(dummyFacilities); // Fallback ke dummy jika data kosong
                }
            })
            .catch((error) => {
                console.error('Error fetching facilities:', error);
                setFacilities(dummyFacilities); // Fallback jika error
            });
        };
        facilitiesData();
    }, []);

    const initialValues = {
        namaFasilitas: '',
        deskripsiFasilitas: '',
        // gambarFasilitas tidak perlu di initialValues Formik karena ini adalah file
    };

    const submitFacilityForm = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('namaFasilitas', values.namaFasilitas);
        formData.append('deskripsiFasilitas', values.deskripsiFasilitas);
        if(facilityImage){
            formData.append('gambarFasilitas', facilityImage);
        }

        try {
            const response = await fetch('http://localhost:3001/api/admin/addFacility', {
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();

            if(response.ok) {
                console.log('Success:', data);
                alert('Fasilitas berhasil ditambahkan!');
                // Perlu me-refetch data atau memperbarui state facilities secara lokal
                // setFacilities(prev => [...prev, data.newFacility]); // Jika API mengembalikan objek baru
                resetForm();
                setFacilityImage(null);
                // navigate('/admin/kelolaFasilitas', { replace: true }); // Hindari navigasi penuh jika modal hanya ditutup
                // Tutup Modal secara manual jika diperlukan (perlu state tambahan untuk modal)
            } else {
                 alert(`Gagal menambahkan fasilitas: ${data.message || 'Terjadi kesalahan.'}`);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menghubungi server.');
        }
    }

    // Aksi Dummy Tambahan
    const handleEdit = (facility) => alert(`Mengedit fasilitas: ${facility.nama}`);
    const handleDelete = (facility) => alert(`Menghapus fasilitas: ${facility.nama}`);

    return(
        <div className="flex bg-gray-50 min-h-screen">
            <CustomSidebar/>
            
            {/* Konten Utama - Offset Sidebar (Asumsi w-64) */}
            <div className="flex-grow p-8 md:ml-24"> 
                
                {/* Header & Tombol Aksi */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pt-4">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">Kelola Fasilitas</p>
                        <p className="text-lg text-gray-500 mt-1">Daftar fasilitas yang tersedia di Rumah Sakit.</p>
                    </div>

                    {/* Tombol Tambah Fasilitas */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center space-x-2"
                            >
                                <FaPlus size={14}/> <span>Tambah Fasilitas</span>
                            </Button>
                        </DialogTrigger>
                        
                        {/* Modal Tambah Fasilitas */}
                        <DialogContent className="sm:max-w-[425px] bg-white rounded-xl p-6">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800">Tambah Fasilitas Baru</DialogTitle>
                                <DialogDescription>
                                    Silakan isi form di bawah untuk menambahkan fasilitas baru.
                                </DialogDescription>
                            </DialogHeader>
                            
                            <Formik
                                initialValues={initialValues}
                                onSubmit={submitFacilityForm}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="flex flex-col gap-4 mt-4">
                                        {/* Nama Fasilitas */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="namaFasilitas" className="font-medium text-gray-700">Nama Fasilitas</label>
                                            <Field 
                                                id="namaFasilitas" 
                                                name="namaFasilitas" 
                                                placeholder="Masukkan nama fasilitas" 
                                                className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition"
                                                required
                                            />
                                            <ErrorMessage name="namaFasilitas" className='text-red-500 text-sm' component="span"/>
                                        </div>
                                        
                                        {/* Deskripsi Fasilitas */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="deskripsiFasilitas" className="font-medium text-gray-700">Deskripsi Fasilitas</label>
                                            <Field 
                                                as="textarea" // Menggunakan textarea untuk deskripsi
                                                id="deskripsiFasilitas" 
                                                name="deskripsiFasilitas" 
                                                placeholder="Deskripsikan fungsi dan keunggulan fasilitas"
                                                rows="4"
                                                className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition resize-none"
                                                required
                                            />
                                            <ErrorMessage name="deskripsiFasilitas" className='text-red-500 text-sm' component="span"/>
                                        </div>
                                        
                                        {/* Gambar Fasilitas */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="gambarFasilitas" className="font-medium text-gray-700">Gambar Fasilitas</label>
                                            <input 
                                                type="file" 
                                                id="gambarFasilitas" 
                                                name="gambarFasilitas" 
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                                onChange={(e) => setFacilityImage(e.target.files[0])}
                                            />
                                            <ErrorMessage name="gambarFasilitas" className='text-red-500 text-sm' component="span"/>
                                        </div>
                                        
                                        {/* Tombol Submit */}
                                        <Button 
                                            type="submit" 
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg mt-4 transition shadow-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Menyimpan...' : 'Simpan Fasilitas'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tabel Daftar Fasilitas */}
                <div className="bg-white shadow-xl rounded-xl overflow-x-auto border border-gray-200">
                    <Table className="min-w-full divide-y divide-gray-200">
                        
                        {/* Header Tabel */}
                        <TableHeader className="bg-teal-600">
                            <TableRow className="border-b-teal-700">
                                <TableHead className="w-[10%] text-white font-bold text-sm uppercase">ID</TableHead>
                                <TableHead className="w-[15%] text-white font-bold text-sm uppercase">Gambar</TableHead>
                                <TableHead className="w-[20%] text-white font-bold text-sm uppercase">Nama Fasilitas</TableHead>
                                <TableHead className="w-[45%] text-white font-bold text-sm uppercase">Deskripsi</TableHead>
                                <TableHead className="w-[10%] text-center text-white font-bold text-sm uppercase">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        {/* Body Tabel */}
                        <TableBody className="divide-y divide-gray-100">
                            {facilities.map((facility) => (
                                <TableRow key={facility._id} className="hover:bg-gray-50 transition duration-150">
                                    <TableCell className="font-medium text-xs text-gray-600 align-top py-4">
                                        {facility._id ? facility._id.substring(0, 8) : 'N/A'}...
                                    </TableCell>
                                    <TableCell className="align-top py-4">
                                        {/* Menggunakan URL lengkap dari backend */}
                                        <img 
                                            src={facility.gambar ? `http://localhost:3001${facility.gambar}` : '/images/default-facility.jpg'} 
                                            alt={facility.nama} 
                                            className="w-20 h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900 align-top py-4">
                                        {facility.nama}
                                    </TableCell>
                                    <TableCell className="text-left text-sm text-gray-700 align-top whitespace-normal break-words py-4"> 
                                        {facility.deskripsi}
                                    </TableCell>
                                    <TableCell className="text-center align-top py-4">
                                        <div className="flex justify-center space-x-2">
                                            <Button 
                                                onClick={() => handleEdit(facility)}
                                                variant="outline"
                                                className="text-blue-600 hover:text-blue-800 p-2 h-8 w-8 rounded-full border-blue-100 hover:bg-blue-50 transition"
                                            >
                                                <FaEdit size={14} />
                                            </Button>
                                            <Button 
                                                onClick={() => handleDelete(facility)}
                                                variant="outline"
                                                className="text-red-600 hover:text-red-800 p-2 h-8 w-8 rounded-full border-red-100 hover:bg-red-50 transition"
                                            >
                                                <FaTrashAlt size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {facilities.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                        Tidak ada data fasilitas.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        
                    </Table>
                </div>
                
            </div>
        </div>
    )
}

export default KelolaFasilitas;