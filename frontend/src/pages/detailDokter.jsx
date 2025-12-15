import {useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CalendarIcon, GraduationCap, BriefcaseMedical, Stethoscope } from "lucide-react" 
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BASE_IMAGE_URL = 'http://localhost:3001'; 


function DetailDokter() {
    const {state} = useLocation();
    const navigate = useNavigate(); // Gunakan useNavigate
    const doctor = state?.doctor;
    const [date, setDate] = useState(new Date())
    const [userId, setUserId] = useState(null);
    const [keluhanPasien, setKeluhanPasien] = useState("")

    // Fungsi JWT decode 
    function decodeJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        const data = decodeJWT(token);
        if (data && data.id) {
            setUserId(data.id);
        }
    }, []);

    const handleConfirm = async (userId, keluhanPasien) => {
        // Pastikan pengguna sudah login dan tanggal sudah dipilih
        if (!userId) {
            alert("Anda harus login untuk membuat janji temu.");
            return;
        }
        if (!date) {
            alert("Mohon pilih tanggal janji temu.");
            return;
        }
        
        // Cek jika keluhan kosong
        if (!keluhanPasien.trim()) {
            alert("Mohon masukkan keluhan Anda.");
            return;
        }


        // Logic untuk mengonfirmasi janji temu (tidak diubah)
        const appointmentTime = format(date, "yyyy-MM-dd HH:mm:ss"); // Format tanggal

        try {
            const response = await fetch('http://localhost:3001/api/createAppointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: doctor._id,
                    patientId: userId,
                    date: appointmentTime,
                    keluhanPasien: keluhanPasien,
                    createdTime: new Date().toISOString()
                }),
            });
            
            if(response.ok) {
                 alert("Janji temu berhasil dibuat! Silakan cek status di akun Anda.");
            } else {
                 const data = await response.json();
                 alert(`Gagal membuat janji: ${data.message || 'Terjadi kesalahan.'}`);
            }

        } catch (error) {
            console.error('Error:', error);
            alert("Gagal menghubungi server untuk membuat janji temu.");
        }
    }

    if(!doctor) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-col items-center justify-center flex-grow bg-gray-50 p-8">
                    <p className="text-2xl font-bold text-red-600 mb-6">
                        Data Dokter Tidak Ditemukan.
                    </p>
                    <Button 
                        onClick={() => navigate('/cariDokter')}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                    >
                        Cari Dokter Lain
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    
    // ----------------------------------------------------
    // TAMPILAN UTAMA
    // ----------------------------------------------------
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            {/* Breadcrumb Section */}
            <div className="max-w-7xl mx-auto w-full pt-8 pb-4 px-4 sm:px-6 lg:px-8 mt-[90px]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/cariDokter">Cari Dokter</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{doctor.namaLengkap}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Main Content: Foto, Deskripsi, dan Tombol */}
            <div className="max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden p-8 flex flex-col lg:flex-row gap-10">
                    
                    {/* Kiri: Foto Dokter */}
                    <div className="flex-shrink-0">
                        <img 
                            src={`${BASE_IMAGE_URL}${doctor.foto_profil}`} 
                            alt={`Foto Dr. ${doctor.namaLengkap}`} 
                            // Ukuran dan styling foto baru
                            className="w-full max-w-xs h-auto rounded-xl object-cover border-3 border-teal-600 shadow-lg"
                        />
                    </div>
                    
                    {/* Kanan: Detail & Aksi */}
                    <div className="flex flex-col flex-grow">
                        <div className="border-b pb-4 mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900">{doctor.namaLengkap}</h1>
                            <p className="text-xl font-semibold text-teal-600 mt-2 flex items-center space-x-2">
                                <Stethoscope className="w-5 h-5"/>
                                <span>Spesialis {doctor.spesialis}</span>
                            </p>
                        </div>
                        
                        {/* Deskripsi */}
                        <div className="text-gray-700 space-y-4 text-justify flex-grow">
                            <p className="font-medium">Tentang Dokter:</p>
                            <p>{doctor.deskripsi}</p>
                        </div>
                        
                        {/* Tombol Buat Janji */}
                        <div className="mt-8 pt-4 border-t flex justify-end">
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button 
                                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition"
                                    >
                                        Buat Janji Kunjungan
                                    </Button>
                                </DialogTrigger>
                                
                                {/* Modal Janji Kunjungan */}
                                <DialogContent className="sm:max-w-[425px] bg-white rounded-xl p-6">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-gray-800">Buat Janji Kunjungan</DialogTitle>
                                        <DialogDescription>
                                            Pilih tanggal dan masukkan keluhan Anda sebelum mengonfirmasi janji dengan <span className="font-semibold text-teal-600">{doctor.namaLengkap}</span>.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="flex flex-col gap-4 py-4">
                                        {/* Input Tanggal */}
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Pilih Tanggal</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                                        {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                        // disable dates in the past (optional)
                                                        disabled={(date) =>
                                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Input Keluhan */}
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium text-gray-700" htmlFor="keluhanPasien">Keluhan Anda</label>
                                            <textarea 
                                                id="keluhanPasien"
                                                placeholder="Contoh: Sakit kepala sebelah sejak 3 hari lalu." 
                                                className="border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition resize-none" 
                                                rows="4"
                                                onChange={(e) => setKeluhanPasien(e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Tombol Konfirmasi */}
                                    <DialogClose asChild>
                                        <Button 
                                            className="mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg shadow-md w-full" 
                                            onClick={() => handleConfirm(userId, keluhanPasien)}
                                            disabled={!userId} // Nonaktifkan jika belum login
                                        >
                                            {userId ? 'Konfirmasi Janji' : 'Anda Harus Login'}
                                        </Button>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Card: Spesialis, Pengalaman, Pendidikan */}
            <div className="max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-teal-50 shadow-xl border-t-4 border-teal-600 rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Spesialis */}
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Stethoscope className="w-8 h-8 text-teal-600"/>
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-1 border-gray-300">Spesialis</h2>
                        <p className="font-semibold text-teal-800 text-xl">{doctor.spesialis}</p>
                    </div>
                    
                    {/* Pengalaman */}
                    <div className="flex flex-col items-center text-center space-y-3">
                        <BriefcaseMedical className="w-8 h-8 text-teal-600"/>
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-1 border-gray-300">Pengalaman</h2>
                        <p className="font-semibold text-teal-800 text-xl">{doctor.pengalaman}</p>
                    </div>
                    
                    {/* Pendidikan */}
                    <div className="flex flex-col items-center text-center space-y-3">
                        <GraduationCap className="w-8 h-8 text-teal-600"/>
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-1 border-gray-300">Pendidikan</h2>
                        <p className="font-semibold text-teal-800 text-xl">{doctor.pendidikan}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default DetailDokter;