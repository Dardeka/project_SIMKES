import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function DetailDokter() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-row mt-[150px] ml-[116px]">
                <img src="/dokter.png" alt="" width="348px" height="348px"/>
                <div className="flex flex-col ml-[82px] mt-[23px]">
                    <h1 className="text-3xl font-semibold">dr. Amanda Siti</h1>
                    <div className="flex flex-col mt-[20px] gap-[32px] opacity-[0.75]">
                        <p>Spesialis Anak</p>
                        <p>Seorang dokter dengan jam terbang tinggi selama 10 abad terakhir.<br /> Beliau mengenyam pendidikan di Harvard University dan mengambil<br /> spesialis pegal linu.</p>
                    </div>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger className=" !bg-[#2D7DD2] text-white font-bold w-[150px] h-[45px] mt-[40px] rounded-[12px] cursor-pointer hover:!bg-blue-700">Buat Janji</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Pilih Tanggal</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="ml-[116px] mt-[72px] px-[71px] py-[55px] flex flex-row justify-around bg-[#D9D9D9] w-[700px] h-[190px] rounded-[12px]">
                <div className="flex flex-col">
                    <h2>Spesialis</h2>
                    <p className="font-semibold">Anak</p>
                </div>
                <div className="flex flex-col">
                    <h2>Spesialis</h2>
                    <p className="font-semibold">Anak</p>
                </div>
                <div className="flex flex-col">
                    <h2>Pendidikan</h2>
                    <p className="font-semibold">Harvard University</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailDokter