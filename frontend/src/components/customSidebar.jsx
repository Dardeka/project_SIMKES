import { useState } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "./ui/button";

function CustomSidebar() {
    const [expanded, setExpanded] = useState(true);

    return(
        <aside 
            className={`h-screen bg-[#04998E] shadow-xl/30 transition-all duration-300 
            ${expanded ? "w-[280px]" : "w-[150px]"}`}
        >
            <nav className="h-full border-r shadow-sm">
                <div className="h-full p-4 flex flex-col gap-5">

                    {/* HEADER LOGO + TOGGLE */}
                    <div className="flex items-center">
                        <img 
                            src="/logo/logo_SIMKES.png" 
                            alt="Logo" 
                            className="w-[50px] h-[50px] m-4"
                        />

                        {/* TEXT DISAPPEAR WHEN COLLAPSED */}
                        {expanded && (
                            <div className="flex flex-col text-white">
                                <p className="font-bold text-base">SIMKES</p>
                                <p className="font-light text-[10px]">
                                    Sistem Manajemen Pelayanan Kesehatan
                                </p>
                            </div>
                        )}

                        <Button 
                            onClick={() => setExpanded(!expanded)} 
                            className="!bg-transparent ml-1 mr-2 hover:!bg-gray-200/20"
                        >
                            {expanded ? <ChevronFirst/> : <ChevronLast/>} 
                        </Button>
                    </div>

                    {/* MENU */}
                    <div className="flex flex-col gap-5 mt-10 ml-5 mr-6">
                        <div className="flex items-center gap-3 hover:bg-gray-200/20 p-2 rounded-lg">
                            <img src="/icons/dashboard.png" width="30" />
                            {expanded && (
                                <Button className="!bg-transparent justify-start w-full text-lg rounded-none">
                                    Dashboard
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 hover:bg-gray-200/20 p-2 rounded-lg">
                            <img src="/icons/fasilitas.png" width="30" />
                            {expanded && (
                                <Button className="!bg-transparent justify-start w-full text-lg rounded-none">
                                    Fasilitas
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 hover:bg-gray-200/20 p-2 rounded-lg">
                            <img src="/icons/kelolaAkun.png" width="30" />
                            {expanded && (
                                <Button className="!bg-transparent justify-start w-full text-lg rounded-none">
                                    Dokter
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* ADMIN BOX */}
                    <div 
                        className={`mt-auto h-[100px] p-4 rounded-lg flex flex-col gap-4 
                        transition-all duration-300 
                        ${expanded ? "w-[200px] mx-auto" : "w-[100px] mx-auto"}
                        `}
                    >
                        <Button className="!bg-red-500 hover:!bg-red-700">
                            <img src="/icons/logout.png" alt="Logout Icon" width="20" />
                        {expanded && 
                            <span>Logout</span>
                        }
                        </Button>
                    </div>

                </div>
            </nav>
        </aside>
    )
}

export default CustomSidebar;
