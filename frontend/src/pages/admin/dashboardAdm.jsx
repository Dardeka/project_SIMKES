import CustomSidebar from "../../components/adminCustomSidebar";


function DashboardAdm(){
    return(
        <div className="flex">
            <CustomSidebar/>
            <div className="flex flex-col mt-[64px] mx-auto">
                <p className="text-2xl font-bold text-center">Admin SIMKES</p>
                <div className="mt-[147px] flex gap-10 grid grid-cols-2">
                    {/* Section penjelasan */}
                    <div className="w-[402px] h-[137px] bg-[#55D6C2] pt-[18px] pl-[31px] pr-[21px] rounded-[12px] shadow-xl/20">
                        <div className="flex flex-row justify-between">
                            <h3>Jumlah Dokter</h3>
                            <img src="/icons/details.png" alt="" width="30" />
                        </div>
                        <p>12</p>
                    </div>
                    <div className="w-[402px] h-[137px] bg-[#55D6C2] pt-[18px] pl-[31px] pr-[21px] rounded-[12px] shadow-xl/20">
                        <div className="flex flex-row justify-between">
                            <h3>Jumlah Pasien</h3>
                            <img src="/icons/details.png" alt="" width="30" />
                        </div>
                        <p>26</p>
                    </div>
                    <div className="w-[402px] h-[137px] bg-[#55D6C2] pt-[18px] pl-[31px] pr-[21px] rounded-[12px] shadow-xl/20">
                        <div className="flex flex-row justify-between">
                            <h3>Jumlah Spesialis</h3>
                            <img src="/icons/details.png" alt="" width="30" />
                        </div>
                        <p>9</p>
                    </div>
                    <div className="w-[402px] h-[137px] bg-[#55D6C2] pt-[18px] pl-[31px] pr-[21px] rounded-[12px] shadow-xl/20">
                        <div className="flex flex-row justify-between">
                            <h3>Jumlah Fasilitas</h3>
                            <img src="/icons/details.png" alt="" width="30" />
                        </div>
                        <p>15</p>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default DashboardAdm;