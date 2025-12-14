import {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import { CalendarIcon } from "lucide-react"
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
import { decode } from "punycode"
import { Field } from "formik"

function DetailDokter() {
    const {state} = useLocation();
    const doctor = state?.doctor;
    const [date, setDate] = useState(new Date())
    const [userId, setUserId] = useState(null);
    const [keluhanPasien, setKeluhanPasien] = useState("")

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
        console.log('Received doctor data:', doctor);
        const token = sessionStorage.getItem('accessToken');
        const data = decodeJWT(token);
        console.log('Decoded JWT data:', data);
        if (data && data.id) {
            setUserId(data.id);
        }
    }, []);

    const handleConfirm = async (userId, keluhanPasien) => {
        // Logic untuk mengonfirmasi janji temu
        console.log("Janji temu dikonfirmasi untuk tanggal:", date);
        console.log("Dengan dokter:", doctor.namaLengkap);
        console.log("ID Dokter:", doctor._id);
        console.log("ID Pasien:", userId);

        await fetch('http://localhost:3001/api/createAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctorId: doctor._id,
                patientId: userId,
                date: date,
                keluhanPasien: keluhanPasien,
                createdTime: new Date().toISOString()
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    if(!doctor) {
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xl text-red-600">
                        Error: Data dokter tidak ditemukan.
                    </p>
                    {/* Anda bisa menambahkan tombol untuk kembali, atau gunakan useEffect untuk auto-redirect */}
                    <Button onClick={() => navigate('/cariDokter')}>
                        Kembali
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <div className="mt-[150px] ml-[116px]">
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
                            <BreadcrumbPage  readcrumbPage>{doctor.namaLengkap}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-row mt-[50px] ml-[116px]">
                <img src={`http://localhost:3001${doctor.foto_profil}`} alt="" width="348px" height="348px"/>
                <div className="flex flex-col ml-[82px] mt-[23px]">
                    <h1 className="text-3xl font-semibold">{doctor.namaLengkap}</h1>
                    <div className="flex flex-col w-[500px] mt-[20px] gap-[32px] opacity-[0.75]">
                        <p>Spesialis {doctor.spesialis}</p>
                        <p>{doctor.deskripsi}</p>
                    </div>
                    <div className="flex justify-end mt-auto mb-[20px]">
                        <Dialog>
                            <DialogTrigger className=" !bg-[#2D7DD2] text-white font-bold w-[150px] h-[45px] mt-[40px] rounded-[12px] cursor-pointer hover:!bg-blue-700">Buat Janji</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Buat Janji Kunjungan</DialogTitle>
                                <DialogDescription>
                                    Pilih tanggal dan masukkan keluhan Anda sebelum mengonfirmasi janji kunjungan dengan {doctor.namaLengkap}.
                                </DialogDescription>
                                </DialogHeader>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                                <input name="keluhanPasien" placeholder="Masukkan keluhan Anda" className="border-1 border-solid border-black/20 p-2 rounded-[5px]" onChange={(e) => setKeluhanPasien(e.target.value)} />
                                <DialogClose asChild>
                                    <Button className="mt-4 !bg-[#2D7DD2] text-white font-bold w-[100px] h-[40px] rounded-[12px] cursor-pointer hover:!bg-blue-700" onClick={() => handleConfirm(userId, keluhanPasien)}>Konfirmasi</Button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="ml-[116px] mt-[72px] px-[71px] py-[55px] flex flex-row justify-around bg-[#D9D9D9] w-[700px] h-[190px] rounded-[12px]">
                <div className="flex flex-col">
                    <h2>Spesialis</h2>
                    <p className="font-semibold">{doctor.spesialis}</p>
                </div>
                <div className="flex flex-col">
                    <h2>Pengalaman</h2>
                    <p className="font-semibold">{doctor.pengalaman}</p>
                </div>
                <div className="flex flex-col">
                    <h2>Pendidikan</h2>
                    <p className="font-semibold">{doctor.pendidikan}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailDokter