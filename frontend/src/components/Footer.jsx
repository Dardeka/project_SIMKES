import { FaLocationArrow, FaMapPin, FaPhone, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#04998E] bottom-0 mt-[100px] pt-[56px] pl-[62px] pb-[56px]">
      <div className="flex flex-row text-white">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">SIMKES</h1>
          <p className="w-[597px] text-justify">RS Rawamangun merupakan fasilitas layanan kesehatan yang berlokasi di kawasan Rawamangun, Jakarta Timur, dan berkomitmen memberikan pelayanan medis yang berkualitas, modern, serta berorientasi pada keselamatan dan kenyamanan pasien.</p>
        </div>
        <div className="flex flex-col ml-[200px] gap-2">
          <h1 className="font-bold text-2xl">Kontak Kami</h1>
          <div className="flex flex-row items-center gap-2">
            <FaPhoneAlt />
            <p> (+62) 12345678910</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaMapPin className="mb-auto mt-1" />
            <p>Jl. Rawamangun Muka Raya, Kec. Pulogadung, Jakarta Timur</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;