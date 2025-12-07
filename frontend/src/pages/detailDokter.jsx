import {useState} from "react"
import { ChevronDownIcon } from "lucide-react"
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
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function DetailDokter() {
    const [date, setDate] = useState(new Date())

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