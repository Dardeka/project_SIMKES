import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPlus } from 'react-icons/fa';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselNav } from '../components/ui/carousel';

const Dashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('fasilitas');
  const [facilities, setFacilities] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllFacilities`)
      .then(res => res.json())
      .then(data => setFacilities(data || []));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllSpecialities`)
      .then(res => res.json())
      .then(data => setSpecialists(data || []));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getAllDoctor`)
      .then(res => res.json())
      .then(data => setDoctors(data || []));
  }, []);

  const currentContent =
    activeTab === 'fasilitas' ? facilities : specialists;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">

        {/* ================= HERO ================= */}
        <section className="relative h-[450px] overflow-hidden">
          <img
            src="/images/doctor-slider.jpg"
            alt="Tim Dokter"
            className="w-full h-full object-cover"
          />
        </section>

        {/* ================= ABOUT ================= */}
        {/* About Section */}
<section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    <div className="relative">
      <div className="bg-teal-600 text-white text-sm font-semibold py-1 px-4 rounded-full absolute top-0 left-0 -mt-3 -ml-3 z-8">
        10+ Years Experience
      </div>
      <img
        src="/images/doctor-therapist.jpg"
        alt="Pengalaman Dokter"
        className="w-full h-auto rounded-lg shadow-xl"
      />
    </div>

    {/* Text Content */}
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Ayo Peduli Kesehatan
      </h2>
      <p className="text-gray-600 mb-4">
        Ayo Peduli Kesehatan adalah langkah awal untuk hidup lebih baik.
        Di tengah kesibukan dan aktivitas sehari-hari, menjaga kesehatan
        sering kali terlupakan. Padahal, tubuh yang sehat membantu kita
        tetap aktif, produktif, dan menikmati setiap momen bersama
        keluarga serta orang-orang terdekat.
      </p>
      <p className="text-gray-600">
        Dengan lebih peduli pada kesehatan, kita dapat mengenali kondisi
        tubuh sejak dini dan mencegah masalah yang lebih serius. Rumah
        Sakit Rawamangun hadir sebagai mitra kesehatan Anda, siap
        memberikan pelayanan medis yang aman, nyaman, dan terpercaya
        untuk mendukung hidup yang lebih sehat setiap hari.
      </p>
    </div>
  </div>
</section>


        {/* ================= FASILITAS / SPESIALIS ================= */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto text-center px-4">

            <h2 className="text-3xl font-bold mb-8">
              Layanan Kesehatan Rumah Sakit Rawamangun
            </h2>

            {/* SWITCH */}
            <div className="flex justify-center gap-4 mb-10">
              <button
                onClick={() => setActiveTab('fasilitas')}
                className={`px-6 py-2 rounded-md font-semibold transition
                  ${activeTab === 'fasilitas'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-teal-600 border border-teal-600'}
                `}
              >
                Fasilitas
              </button>

              <button
                onClick={() => setActiveTab('spesialis')}
                className={`px-6 py-2 rounded-md font-semibold transition
                  ${activeTab === 'spesialis'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-teal-600 border border-teal-600'}
                `}
              >
                Spesialis
              </button>
            </div>

            {/* CONTENT */}
            <Carousel>
              <CarouselContent className="flex pl-4">
                {currentContent.map(item => (
                  <CarouselItem
                    key={item._id}
                    className="basis-1/4 px-2"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">

                      <div className="h-40">
                        <img
                          src={`${item.gambar}`}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                          {item.nama}
                        </p>

                        <button
                          onClick={() =>
                            activeTab === 'fasilitas'
                              ? navigate('/detail-fasilitas', { state: { facility: item } })
                              : navigate('/spesialis', { state: { specialist: item } })
                          }
                          className="text-teal-600 font-semibold text-sm flex items-center justify-center gap-1 hover:underline"
                        >
                          {activeTab === 'fasilitas'
                            ? 'Lihat Detail'
                            : 'Lihat Spesialis'}
                          <FaPlus size={10} />
                        </button>
                      </div>

                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNav />
            </Carousel>
          </div>
        </section>

        {/* ================= DOKTER ================= */}
        {/* Doctor List */}
<section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
    Daftar Dokter Keren di Rumah Sakit Rawamangun
  </h2>

  <div className="flex gap-8 justify-center items-center">
    <Carousel className="flex flex-row mx-auto">
      <CarouselContent className="flex pl-4 items-center h-70 overflow-visible">
        {doctors
          .filter(d => d.status === 'Aktif')
          .map((doctor) => (
            <CarouselItem
              key={doctor._id}
              className="basis-1/4 pl-1 mx-auto overflow-visible"
            >
              <div
                className="w-[170px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* FOTO */}
                <div className="flex justify-center pt-6">
                  <div className="w-[110px] h-[110px] rounded-t-2xl overflow-hidden bg-gray-100 shadow-inner">
                    <img
                      src={`${doctor.foto_profil}`}
                      alt={doctor.namaLengkap}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* INFO */}
                <div className="px-4 py-4 text-center">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {doctor.namaLengkap}
                  </p>

                  <div className="mt-2 inline-block px-3 py-1 text-[11px] rounded-full bg-teal-50 text-teal-700 font-medium">
                    Dokter RS Rawamangun
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNav />
    </Carousel>
  </div>
</section>


      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
