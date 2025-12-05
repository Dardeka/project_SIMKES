import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";

function CariDokter() {
    const navigate = useNavigate()

    const handleDetail = () => {
        navigate('/detailDokter')
    }

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
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                    <div className="flex flex-row w-[500px] h-[200px] py-[25px] pl-[29px] pr-[38px] bg-[#D9D9D9] rounded-[12px] shadow-xl/20">
                        <img src="/dokter.png" alt="" width="150px" height="150px"/>
                        <div className="flex flex-col ml-[23px] pt-[22px] w-[260px]">
                            <p className="text-xl font-semibold">dr. Amanda Siti</p>
                            <p>Spesialis Anak</p>
                            <Button className="!bg-[#2D7DD2] text-white mt-[36px] ml-auto cursor-pointer hover:!bg-blue-700" onClick={handleDetail}>Lihat Detail</Button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CariDokter;