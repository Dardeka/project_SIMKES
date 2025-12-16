import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPlus } from 'react-icons/fa';

const BASE_IMAGE_URL = 'http://localhost:3001';

const FasilitasUtama = () => {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(`${BASE_IMAGE_URL}/api/admin/getAllfacilities`);
        const data = await res.json();
        setFacilities(data || []);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // 🔹 klik 1 fasilitas
  const handleDetail = (facility) => {
    navigate('/detail-fasilitas', { state: { facility } });
  };

  // 🔹 klik tombol hijau
  const handleAllFacilities = () => {
    navigate('/fasilitas');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative h-[550px] overflow-hidden bg-gray-200">
          <img
            src="/images/rumahsakitrawamangun.png"
            alt="Fasilitas Rumah Sakit"
            className="w-full h-full object-cover absolute inset-0 brightness-75"
            style={{ objectPosition: 'center 25%' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div className="max-w-4xl text-white">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                Fasilitas Lengkap untuk Mendukung Kesehatan Anda
              </h1>
              <p className="text-xl opacity-90">
                Kami menghadirkan berbagai fasilitas kesehatan yang modern dan
                terintegrasi sebagai wujud kepedulian kami.
              </p>
            </div>
          </div>
        </section>

        {/* HEADLINE */}
        <section className="max-w-7xl mx-auto pt-16 px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Layanan Kesehatan di Rumah Sakit Rawamangun
          </h2>
          <p className="text-lg text-gray-600">
            Kami hadir untuk melayani Anda dengan sepenuh hati
          </p>
        </section>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          {loading ? (
            <p className="text-center text-xl text-teal-600">
              Memuat fasilitas...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {facilities.map((facility) => (
                  <div
                    key={facility._id}
                    className="bg-white rounded-xl shadow-xl overflow-hidden border hover:shadow-2xl transition"
                  >
                    {/* GAMBAR */}
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`${BASE_IMAGE_URL}${facility.gambar}`}
                        alt={facility.nama}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* TEKS */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-teal-700 mb-2">
                        {facility.nama}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 h-[60px]">
                        {facility.deskripsi}
                      </p>

                      <button
                        onClick={() => handleDetail(facility)}
                        className="mt-4 text-teal-600 font-semibold text-sm flex items-center gap-1 hover:underline"
                      >
                        Lihat Detail <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FasilitasUtama;
