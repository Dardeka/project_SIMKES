import { useState } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "./ui/button";
import { FaFlask, FaTachometerAlt, FaUser, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CustomSidebar() {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/admin/dashboard');
    }

    const handleFacility = () => {
        navigate('/admin/kelolaFasilitas');
    }

    const handleSpecialist = () => {
        navigate('/admin/spesialis');
    }

    const handleDoctor = () => {
        navigate('/admin/kelolaDokter');
    }

    const handleAccount = () => {
        navigate('/admin/daftarakun');
    }

    return(
        <aside 
            className={`h-screen bg-teal-700 shadow-xl/30 transition-all duration-300 
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
                        <div className="flex items-center gap-5 hover:bg-gray-200/20 py-2 pl-4 rounded-lg">
                            <FaTachometerAlt color="white"/> 
                            {expanded && (
                                <Button 
                                    className="!bg-transparent justify-start w-[150px] text-lg rounded-none pl-0"
                                    onClick={handleDashboard}
                                >
                                    <span>Dashboard</span>
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-5 hover:bg-gray-200/20 py-2 pl-4 rounded-lg">
                            <FaFlask color="white" /> 
                            {expanded && (
                                <Button 
                                    className="!bg-transparent justify-start w-[150px] text-lg rounded-none"
                                    onClick={handleFacility}
                                >
                                    <span>Fasilitas</span>
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-5 hover:bg-gray-200/20 py-2 pl-4 rounded-lg">
                            <FaUserMd color="white" /> 
                            {expanded && (
                                <Button 
                                    className="!bg-transparent justify-start w-[150px] text-lg rounded-none"
                                    onClick={handleSpecialist}
                                >
                                    <span>Spesialis</span>
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-5 hover:bg-gray-200/20 py-2 pl-4 rounded-lg">
                            <FaUser color="white" /> 
                            {expanded && (
                                <Button 
                                    className="!bg-transparent justify-start w-[150px] text-lg rounded-none"
                                    onClick={handleDoctor}
                                >
                                    <span>Dokter</span>
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center gap-5 hover:bg-gray-200/20 py-2 pl-4 rounded-lg">
                            <FaUser color="white" /> 
                            {expanded && (
                                <Button 
                                    className="!bg-transparent justify-start w-[150px] text-lg rounded-none"
                                    onClick={handleAccount}
                                >
                                    <span>Akun</span>
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
