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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

// Base URL untuk API
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`; 

function KelolaAkunDokter() {
    const [doctorData, setDoctorData] = useState([]);
    const [specialistData, setSpecialistData] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- FETCH LOGIC ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const doctorResponse = await fetch(`${API_BASE_URL}/allData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accessToken': sessionStorage.getItem('accessToken'),
                },
            });
            const doctors = await doctorResponse.json();
            setDoctorData(doctors);

            const specialistResponse = await fetch(`${API_BASE_URL}/getAllSpecialities`);
            const specialists = await specialistResponse.json();
            setSpecialistData(specialists);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    // ... [Initial Values dan Handlers lainnya tidak berubah]

    const initialValues = {
        namaDokter: '',
        jenisKelamin: '',
        pendidikanDokter: '',
        pengalamanDokter: '',
        deskripsiDokter: '',
        spesialisDokter: '',
        emailDokter: '',
        passwordDokter: '',
        gambarDokter: profilePicture ||null,
    };

    const addDoctorData = async (doctor, { resetForm }) => {
        const newData = new FormData();
        if(profilePicture){
            newData.append('gambarDokter', profilePicture);
        }
        newData.append('namaDokter', doctor.namaDokter);
        newData.append('jenisKelamin', doctor.jenisKelamin);
        newData.append('pendidikanDokter', doctor.pendidikanDokter);
        newData.append('pengalamanDokter', doctor.pengalamanDokter);
        newData.append('deskripsiDokter', doctor.deskripsiDokter);
        newData.append('spesialisDokter', doctor.spesialisDokter);
        newData.append('emailDokter', doctor.emailDokter);
        newData.append('passwordDokter', doctor.passwordDokter);

        try {
            const response = await fetch(`${API_BASE_URL}/addDoctor`, {
                method: 'POST',
                body: newData,
            });
            
            if (response.ok) {
                alert("Dokter berhasil ditambahkan!");
                resetForm();
                setProfilePicture(null);
                fetchData();
            } else {
                const data = await response.json();
                alert(`Gagal menambahkan dokter: ${data.message || 'Terjadi kesalahan.'}`);
            }
            
        } catch (error) {
            console.error('Add doctor error:', error);
            alert("Gagal menghubungi server.");
        }
    }

    const handleUpdateStatus = async (doctorId, currentStatus) => {
        const newStatus = currentStatus === 'Aktif' ? 'Nonaktif' : 'Aktif';

        try {
             await fetch(`${API_BASE_URL}/updateStatus`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id: doctorId, 
                    status: newStatus 
                }),
            });
            setDoctorData(prev => 
                prev.map(doc => 
                    doc._id === doctorId ? { ...doc, status: newStatus } : doc
                )
            );
        } catch (error) {
            console.error('Update status error:', error);
            alert('Gagal memperbarui status. Periksa konsol server.');
        }
    }
    
    const handleDelete = (doctorId, doctorName) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus akun ${doctorName}?`)) {
            console.log(`Deleting doctor ID: ${doctorId}`);
            alert(`Dokter ${doctorName} dihapus (Aksi dummy).`);
            setDoctorData(prev => prev.filter(doc => doc._id !== doctorId)); 
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <CustomSidebar/>
                <p className="text-xl font-semibold text-teal-600 ml-64">Memuat data dokter...</p>
            </div>
        );
    }


    return(
        <div className="flex bg-gray-50 min-h-screen">
            <CustomSidebar/>
            
            {/* Konten Utama - Offset Sidebar */}
            <div className="flex-grow p-8 md:ml-10"> 
                
                {/* Header & Tombol Aksi */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pt-4 border-b pb-4">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">Kelola Akun Dokter</p>
                        <p className="text-lg text-gray-500 mt-1">Mengelola daftar dan status akun dokter di sistem SIMKES.</p>
                    </div>

                    {/* Tombol Tambah Akun Dokter */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-200 flex items-center space-x-2 transform hover:scale-[1.02]"
                            >
                                <FaPlus size={14}/> <span>Tambah Akun Dokter</span>
                            </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="lg:max-w-4xl bg-white rounded-xl p-8">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800">Tambah Akun Dokter Baru</DialogTitle>
                                <DialogDescription>
                                    Silakan isi semua detail profil dan akun untuk dokter baru.
                                </DialogDescription>
                            </DialogHeader>
                            
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                onSubmit={addDoctorData}
                            >
                                {({ setFieldValue }) => (
                                    <Form className="space-y-6 mt-4">
                                        
                                        {/* Row Gambar */}
                                        <div className="flex flex-col gap-2 border p-4 rounded-lg bg-teal-50">
                                            <label htmlFor="gambarDokter" className="font-semibold text-gray-700">Foto Profil Dokter</label>
                                            <input type="file" id="gambarDokter" name="gambarDokter" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200" onChange={(e) => setProfilePicture(e.target.files[0])} />
                                        </div>
                                        
                                        {/* Row Input (2 Kolom) */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                            {/* KOLOM KIRI */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Detail Personal & Spesialisasi</h3>

                                                {/* Nama Dokter */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="namaDokter" className="font-medium text-gray-700">Nama Lengkap</label>
                                                    <Field id="namaDokter" name="namaDokter" placeholder="Nama Lengkap Dokter" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"/>
                                                </div>
                                                
                                                {/* Jenis Kelamin */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="jenisKelamin" className="font-medium text-gray-700">Jenis Kelamin</label>
                                                     <Field as="select" id="jenisKelamin" name="jenisKelamin" className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-teal-500 focus:border-teal-500">
                                                        <option value="">Pilih Jenis Kelamin</option>
                                                        <option value="Laki-laki">Laki-laki</option>
                                                        <option value="Perempuan">Perempuan</option>
                                                    </Field>
                                                </div>
                                                
                                                {/* Spesialis */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="spesialisDokter" className="font-medium text-gray-700">Spesialis</label>
                                                    <Select id="spesialisDokter" name="spesialisDokter" onValueChange={(value) => setFieldValue('spesialisDokter', value)}>
                                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500">
                                                            <SelectValue placeholder="Pilih Spesialisasi" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {specialistData.map((specialist) => (
                                                                <SelectItem key={specialist._id} value={specialist._id}>{specialist.nama}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Pendidikan */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="pendidikanDokter" className="font-medium text-gray-700">Pendidikan Terakhir</label>
                                                    <Field id="pendidikanDokter" name="pendidikanDokter" placeholder="Contoh: S1 Kedokteran" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"/>
                                                </div>
                                                
                                                {/* Pengalaman */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="pengalamanDokter" className="font-medium text-gray-700">Pengalaman Kerja</label>
                                                    <Field id="pengalamanDokter" name="pengalamanDokter" placeholder="Contoh: 5 Tahun di RS X" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"/>
                                                </div>
                                            </div>

                                            {/* KOLOM KANAN */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Detail Akun & Deskripsi</h3>
                                                
                                                {/* Deskripsi */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="deskripsiDokter" className="font-medium text-gray-700">Deskripsi (Tentang Dokter)</label>
                                                    <Field as="textarea" id="deskripsiDokter" name="deskripsiDokter" placeholder="Tuliskan deskripsi profesional dokter" rows="5" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 resize-none"/>
                                                </div>
                                                
                                                {/* Email */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="emailDokter" className="font-medium text-gray-700">Email (Akun Login)</label>
                                                    <Field type="email" id="emailDokter" name="emailDokter" placeholder="email@contoh.com" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"/>
                                                </div>
                                                
                                                {/* Password */}
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="passwordDokter" className="font-medium text-gray-700">Password</label>
                                                    <Field type="password" id="passwordDokter" name="passwordDokter" placeholder="Password Awal" className="border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"/>
                                                </div>

                                                <ErrorMessage name="namaDokter" className='hidden' component="span"/>
                                                <ErrorMessage name="jenisKelamin" className='hidden' component="span"/>
                                            </div>
                                        </div>

                                        {/* Tombol Simpan */}
                                        <div className="flex justify-end pt-4">
                                            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">Simpan Akun</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tabel Daftar Dokter */}
                <div className="bg-white shadow-xl rounded-xl overflow-x-auto border border-gray-200 mt-8">
                    <Table className="min-w-full w-full divide-y divide-gray-200">
                        <TableHeader className="bg-teal-600">
                            <TableRow>
                                <TableHead className="w-[7%] text-white font-bold text-xs uppercase tracking-wider">Foto</TableHead>
                                <TableHead className="w-[15%] text-white font-bold text-xs uppercase tracking-wider">Nama Dokter</TableHead>
                                <TableHead className="w-[13%] text-white font-bold text-xs uppercase tracking-wider">Spesialis</TableHead>
                                <TableHead className="w-[10%] text-white font-bold text-xs uppercase tracking-wider">Pendidikan</TableHead>
                                <TableHead className="w-[15%] text-white font-bold text-xs uppercase tracking-wider">Detail Akun</TableHead>
                                <TableHead className="w-[30%] text-center text-white font-bold text-xs uppercase tracking-wider">Status</TableHead>
                                <TableHead className="w-[10%] text-center text-white font-bold text-xs uppercase tracking-wider">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100">
                            {doctorData.map((doctor) => (
                                <TableRow key={doctor._id} className="hover:bg-gray-50 transition duration-150">
                                    <TableCell className="w-[7%] py-3 align-top">
                                        <img 
                                            src={`${doctor.foto_profil}`} 
                                            alt={doctor.namaLengkap} 
                                            className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200"
                                        />
                                    </TableCell>
                                    <TableCell className="w-[15%] font-semibold text-gray-900 text-sm align-top">{doctor.namaLengkap}</TableCell>
                                    
                                    {/* --- PERBAIKAN LOGIKA SPESIALIS DI SINI --- */}
                                    <TableCell className="w-[13%] text-gray-700 text-sm align-top">
                                        {
                                            // 1. Coba ambil nama jika sudah dipopulasi oleh API (object)
                                            doctor.spesialis?.nama ||
                                            // 2. Jika hanya ID, cari nama spesialis di array specialistData
                                            specialistData.find(s => s._id === doctor.spesialis)?.nama ||
                                            // 3. Fallback jika tidak ditemukan (misalnya, tampilkan 'ID Tidak Dikenal')
                                            'ID Tidak Dikenal'
                                        }
                                    </TableCell>
                                    {/* ------------------------------------------- */}

                                    <TableCell className="w-[10%] text-gray-700 text-sm align-top">{doctor.pendidikan}</TableCell>
                                    <TableCell className="w-[15%] text-start text-xs text-gray-600 align-top">
                                        <div className="space-y-1">
                                            <p className='truncate'><span className="font-semibold">Email:</span> {doctor.email}</p>
                                            <p><span className="font-semibold">Pass:</span> {doctor.password}</p>
                                        </div> 
                                    </TableCell>
                                    <TableCell className="w-[30%] text-center align-top">
                                        <NativeSelect 
                                            defaultValue={doctor.status} 
                                            className={
                                                doctor.status === 'Aktif' 
                                                ? "w-full border-0 bg-green-200 text-green-800 text-center font-semibold rounded-full text-xs py-1" 
                                                : "w-full border-0 bg-red-200 text-red-800 text-center font-semibold rounded-full text-xs py-1"
                                            } 
                                            onChange={(e) => handleUpdateStatus(doctor._id, doctor.status)}
                                        >
                                            <NativeSelectOption value="Aktif">Aktif</NativeSelectOption>
                                            <NativeSelectOption value="Nonaktif">Nonaktif</NativeSelectOption>
                                        </NativeSelect>
                                    </TableCell>
                                    <TableCell className="w-[10%] text-center align-top">
                                        <Button 
                                            onClick={() => handleDelete(doctor._id, doctor.namaLengkap)}
                                            className="!bg-red-600 hover:!bg-red-700 text-white font-semibold rounded-lg p-2 h-8 w-auto text-sm flex items-center shadow-md transition duration-200 hover:scale-[1.05]"
                                        >
                                            <FaTrashAlt size={14} className="mr-1"/> Hapus
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {doctorData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                                        Tidak ada data dokter.
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

export default KelolaAkunDokter;