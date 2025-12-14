import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState("");

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
    setAccessToken(token);
    const data = decodeJWT(token);
    if (data && data.namaLengkap) {
      setUserName(data.namaLengkap);
    }
  }, []);

  const handleDashboard = () => {
    navigate('/')
  }

  const handleSearchDoctor = () => {
    navigate('/cariDokter')
  }

  const handleFasilitas = () => {
    navigate('/fasilitas')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const navigateToProfile = () => {
    navigate('/profil')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/')
    window.location.reload();
  }

  return (
    <header className="fixed w-screen h-[100px] top-0 left-0 bg-[#06BAA5] flex items-center shadow-xl/30 z-10">
      <div className="flex flex-row ml-[50px]" onClick={handleDashboard} style={{cursor: 'pointer'}}>
        <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[60px] h-[60px] m-4" />
        <div className="flex flex-col text-white my-auto">
          <h2 className="font-bold">SIMKES</h2>
          <h4 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h4>
        </div>
      </div>
      <div className="flex ml-auto gap-[71px] mr-[100px]">
        <Button className="!bg-transparent text-base text-white pb-0 rounded-none cursor-pointer hover:border-b-2 border-white" onClick={handleSearchDoctor}>
          Cari Dokter
        </Button>
        <Button className="!bg-transparent text-base text-white pb-0 rounded-none cursor-pointer hover:border-b-2 border-white" onClick={handleFasilitas}>
          Fasilitas
        </Button>
        {accessToken ?
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white text-base text-white w-[45px] h-[45px] rounded-full hover:bg-gray-200/70 p-2 flex items-center justify-center"><FaUser color="black"/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={navigateToProfile}>Lihat Profil</DropdownMenuItem>
              <DropdownMenuItem className="mt-1 bg-red-600 text-white hover:!bg-red-800 hover:!text-white" onClick={handleLogout}><FaSignOutAlt color="white" /> Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          :
          <Button className="bg-[#1D8B7E] text-base text-white w-[135px] h-[45px]" onClick={handleLogin}>
            Login
          </Button>
        }
      </div>
  </header>
  );
};

export default Navbar;