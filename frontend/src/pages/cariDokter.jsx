import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { FaUserMd, FaGraduationCap, FaBriefcase } from "react-icons/fa";

function CariDokter() {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDetail = (doctor) => {
    navigate('/detailDokter', { state: { doctor } });
  };

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getAllDoctor`);
        const data = await response.json();

        const formattedDoctors = await Promise.all(
          data.map(async (doctor) => {
            const specialistDetail = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/getCertainSpeciality/${doctor.spesialis}`
            );
            const specialistData = await specialistDetail.json();

            return {
              foto_profil: doctor.foto_profil,
              namaLengkap: doctor.namaLengkap,
              spesialis: specialistData.nama,
              pengalaman: doctor.pengalaman,
              deskripsi: doctor.deskripsi,
              pendidikan: doctor.pendidikan,
              _id: doctor._id,
              status: doctor.status,
            };
          })
        );

        setAllDoctors(formattedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen items-center justify-center">
        <div className="text-xl font-semibold text-teal-600">Loading Halaman Dokter...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* HERO */}
      <div className="flex items-center justify-center mt-[100px] bg-[url('/hero-dokter.png')] bg-no-repeat bg-center bg-cover h-[500px]">
        <div className="text-center text-[#4A4A4A]"> 
          <h1 className="text-4xl font-bold mb-4">
            Temukan Dokter Terbaik<br /> untuk Kebutuhan Anda
          </h1>
          <p>
            Layanan kesehatan lebih mudah dengan pencarian dokter yang cepat, akurat, dan terpercaya.
          </p>
        </div>
      </div>

      {/* LIST DOKTER */}
      <div className="mt-[100px] mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {allDoctors
            .filter((doctor) => doctor.status === 'Aktif')
            .map((doctor) => (
              <div
                key={doctor._id}
                className="
                  relative bg-white rounded-b-3xl
                  border border-gray-100
                  shadow-md hover:shadow-2xl
                  transition-all duration-300
                  p-6
                "
              >
                {/* ACCENT LINE */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-200 rounded-t-3xl" />

                <div className="flex gap-6">
                  {/* FOTO */}
                  {doctor.foto_profil ? (
                    <img
                      src={`${doctor.foto_profil}`}
                      alt={doctor.namaLengkap}
                      className="
                        w-28 h-28 object-cover
                        rounded-2xl
                        border-4 border-white
                        shadow-lg
                      "
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center shadow-inner">
                      <FaUserMd className="text-gray-400 text-4xl" />
                    </div>
                  )}

                  {/* INFO */}
                  <div className="flex flex-col flex-1">
                    <p className="text-xl font-bold text-gray-900">
                      {doctor.namaLengkap}
                    </p>

                    <span className="w-fit mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                      {doctor.spesialis}
                    </span>

                    {/* PENGALAMAN */}
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                      <FaBriefcase className="text-blue-500" />
                      <span>{doctor.pengalaman || 'Pengalaman tidak tersedia'}</span>
                    </div>

                    {/* PENDIDIKAN */}
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <FaGraduationCap className="text-blue-500" />
                      <span>{doctor.pendidikan || 'Pendidikan tidak tersedia'}</span>
                    </div>

                    <Button
                      className="
                        mt-auto ml-auto
                        bg-green-600
                        hover:!bg-green-900
                        text-white
                        rounded-xl
                        px-6
                      "
                      onClick={() => handleDetail(doctor)}
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CariDokter;
