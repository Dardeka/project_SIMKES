import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function CariDokter() {
    const navigate = useNavigate()
    const [allDoctors, setAllDoctors] = useState([])

    const handleDetail = (doctor) => {
        navigate('/detailDokter', { state: { doctor } })
    }

    useEffect(() => {
        const fetchAllDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/getAllDoctor');
                const data = await response.json();
                console.log('Data Dokter:', data);
                
                const formattedDoctors = await Promise.all(
                    data.map(async (doctor) => {
                        console.log('Fetching spesialis for doctor:', doctor.spesialis);
                        const specialistDetail = await fetch(`http://localhost:3001/api/getCertainSpeciality/${doctor.spesialis}`);
                        const specialistData = await specialistDetail.json();
                        console.log('Spesialis Data:', specialistData);
                        return {
                            foto_profil: doctor.foto_profil,
                            namaLengkap: doctor.namaLengkap,
                            spesialis: specialistData.nama,
                            deskripsi: doctor.deskripsi,
                            pengalaman: doctor.pengalaman,
                            pendidikan: doctor.pendidikan,
                            _id: doctor._id,
                            status: doctor.status
                        }
                    }
                ))

                setAllDoctors(formattedDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchAllDoctors();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mt-[100px] bg-[url('/hero-dokter.png')] bg-no-repeat bg-center bg-cover h-[500px]">
                <div className="text-center text-[#4A4A4A]"> 
                    <h1 className="text-4xl font-bold mb-4">
                        Temukan Dokter Terbaik<br /> untuk Kebutuhan Anda
                    </h1>
                    <p>Layanan kesehatan lebih mudah dengan pencarian dokter yang cepat, akurat, dan terpercaya.</p>
                </div>
            </div>
            <div className="mt-[100px] mx-auto flex flex-col items-center">
                <div className="grid grid-cols-2 gap-x-[50px] gap-y-[30px]">
                    {allDoctors.filter((doctor) => doctor.status === 'Aktif').map((doctor) => (
                        <div key={doctor._id} className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                            <img src={`http://localhost:3001${doctor.foto_profil}`} alt=""/>
                            <div className="flex flex-col ml-[23px] pt-[22px] min-w-[260px] w-[300px]">
                                <p className="text-xl font-semibold">{doctor.namaLengkap}</p>
                                <p>{doctor.spesialis}</p>
                                <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={() => handleDetail(doctor)}>Lihat Detail</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CariDokter;