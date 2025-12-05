import { Button } from "../components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed w-screen h-[100px] top-0 left-0 bg-[#06BAA5] flex items-center shadow-xl/30 z-10">
      <div className="flex flex-row ml-[50px]">
        <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[60px] h-[60px] m-4" />
        <div className="flex flex-col text-white my-auto">
          <h2 className="font-bold">SIMKES</h2>
          <h4 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h4>
        </div>
      </div>
      <div className="flex ml-auto gap-[71px] mr-[60px]">
        <Button className="!bg-transparent text-base text-white pb-0 rounded-none hover:border-b-2 border-white">
          Cari Dokter
        </Button>
        <Button className="!bg-transparent text-base text-white pb-0 rounded-none hover:border-b-2 border-white">
          Fasilitas
        </Button>
        <Button className="bg-[#1D8B7E] text-base text-white w-[135px] h-[45px]">
          Login
        </Button>
      </div>
  </header>
  );
};

export default Navbar;