import { FaLocationArrow, FaMapPin, FaPhone, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#04998E] bottom-0 mt-[100px] pt-[56px] pl-[62px] pb-[56px]">
      <div className="flex flex-row text-white">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">SIMKES</h1>
          <p className="w-[597px] text-justify">Rumah Sakit Tobot merupakan fasilitas layanan kesehatan yang didirikan oleh Ryan dan Andris. Rumah sakit ini berlokasi di daerah Johar, dekat Cikunir, dan berkomitmen untuk memberikan pelayanan medis yang berkualitas, modern, dan berorientasi pada keselamatan serta kenyamanan pasien.</p>
        </div>
        <div className="flex flex-col ml-[200px] gap-2">
          <h1 className="font-bold text-2xl">Kontak Kami</h1>
          <div className="flex flex-row items-center gap-2">
            <FaPhoneAlt />
            <p> (+62) 12345678910</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaMapPin />
            <p>Jln. Cikunir Raya No.30</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;