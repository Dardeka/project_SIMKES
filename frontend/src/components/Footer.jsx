
const Footer = () => {
  return (
    <footer className="bg-[#04998E] bottom-0 mt-[100px] pt-[56px] pl-[62px] pb-[56px]">
      <div className="flex flex-row text-white">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">SIMKES</h1>
          <p className="w-[597px]">Rumah Sakit tobot adalah rumah sakit yang didirikan oleh Ryan Love Andris yang berlokasi di Johar dekat cikunir</p>
        </div>
        <div className="flex flex-col ml-[200px] gap-2">
          <h1 className="font-bold text-2xl">Kontak Kami</h1>
          <p>(+62) 12345678910</p>
          <p>Jalan Geboy Mujaer Nang Ning Nong</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;