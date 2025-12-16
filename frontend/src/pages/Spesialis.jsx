import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BASE_URL = 'http://localhost:3001';

const Spesialis = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🔹 data utama dikirim dari halaman sebelumnya (SAMA KAYA FASILITAS)
  const specialist = state?.specialist;

  const [specialists, setSpecialists] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // 🔹 fetch hanya untuk data pendukung
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/getAllSpecialities`);
        const data = await res.json();
        setSpecialists(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/getAllDoctor`);
        const data = await res.json();
        setDoctors(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpecialists();
    fetchDoctors();
  }, []);

  // 🔹 klik detail spesialis lain
  const handleDetail = (item) => {
    navigate('/spesialis', { state: { specialist: item } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= TITLE ================= */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {specialist?.nama}
          </h1>

          {/* ================= IMAGE + DESCRIPTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img
                src={`${BASE_URL}${specialist?.gambar}`}
                alt={specialist?.nama}
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {specialist?.deskripsi}
              </p>

              {specialist?.deskripsi2 && (
                <p className="text-gray-600 leading-relaxed">
                  {specialist.deskripsi2}
                </p>
              )}
            </div>
          </div>

          {/* ================= DOCTOR LIST ================= */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Lihat Dokter Spesialis yang tersedia
          </h2>

          <div className="flex flex-wrap gap-6 mb-16">
            {doctors
              .filter(d => d.spesialis === specialist?.nama)
              .map((doctor) => (
                <div
                  key={doctor._id}
                  className="w-full sm:w-1/2 md:w-1/5 bg-white p-3 rounded-lg shadow-md border border-gray-100 text-center"
                >
                  <img
                    src={`${BASE_URL}${doctor.foto_profil}`}
                    alt={doctor.namaLengkap}
                    className="w-full h-52 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800">
                    {doctor.namaLengkap}
                  </p>
                  <p className="text-xs text-teal-600">
                    Dokter Spesialis {specialist?.nama}
                  </p>

                  <button className="mt-2 w-full bg-teal-600 text-white text-xs py-1 rounded hover:bg-teal-700 transition">
                    Buat Janji
                  </button>
                </div>
              ))}
          </div>

          {/* ================= RELATED SPECIALISTS ================= */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Lihat Spesialis Lainnya di Rumah Sakit Rawamangun
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {specialists
              .filter(item => item._id !== specialist?._id)
              .map(item => (
                <div
                  key={item._id}
                  onClick={() => handleDetail(item)}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100
                             cursor-pointer hover:shadow-lg transition group"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={`${BASE_URL}${item.gambar}`}
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      {item.nama}
                    </p>

                    {/* BUTTON STYLE SAMA SEPERTI SEBELUMNYA */}
                    <span className="text-teal-600 font-semibold text-sm group-hover:underline">
                      Lihat Detail
                    </span>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Spesialis;
