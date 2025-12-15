import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('fasilitas');

  const [facilities, setFacilities] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // ================== FASILITAS ==================
    fetch('http://localhost:3001/api/admin/getAllFacilities')
      .then(res => res.json())
      .then(data => {
        console.log('Facilities:', data);
        setFacilities(data || []);
      })
      .catch(err => console.error('Facilities error:', err));

    // ================== SPESIALIS ==================
    fetch('http://localhost:3001/api/admin/getAllSpecialities')
      .then(res => res.json())
      .then(data => {
        console.log('Specialists:', data);
        setSpecialists(data || []);
      })
      .catch(err => console.error('Specialists error:', err));

    // ================== DOKTER ==================
    fetch('http://localhost:3001/api/getAllDoctor')
      .then(res => res.json())
      .then(data => {
        console.log('Doctors:', data);
        setDoctors(data || []);
      })
      .catch(err => console.error('Doctors error:', err));
  }, []);

  const currentContent =
    activeTab === 'fasilitas' ? facilities : specialists;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Jumbotron/Hero Section */}
        <section className="relative h-[450px] overflow-hidden">
          <img
            src="/images/doctor-slider.jpg"
            alt="Tim Dokter"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </section>

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

        {/* Service Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Layanan Kesehatan di Rumah Sakit Rawamangun
            </h2>
            <p className="text-gray-600 mb-8">
              kami hadir untuk melayani anda dengan sepenuh hati
            </p>

            {/* Switch Button — JANGAN DIUBAH */}
            <div className="flex justify-center space-x-4 mb-10">
              <button
                onClick={() => setActiveTab('fasilitas')}
                className={`py-2 px-6 rounded-md font-semibold transition-colors duration-300 ${
                  activeTab === 'fasilitas'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50'
                }`}
              >
                Fasilitas
              </button>
              <button
                onClick={() => setActiveTab('spesialis')}
                className={`py-2 px-6 rounded-md font-semibold transition-colors duration-300 ${
                  activeTab === 'spesialis'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50'
                }`}
              >
                Spesialis
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {currentContent.map(item => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-40 w-full">
                    <img
                      src={`http://localhost:3001${item.gambar}`}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.nama}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor List */}
    
        <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Daftar Dokter Keren di Rumah Sakit Rawamangun
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
            {doctors
              .filter(d => d.status === 'Aktif')
              .map((doctor) => (
                <div
                  key={doctor._id}
                  className="w-[170px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* FOTO */}
                  <div className="flex justify-center pt-6">
                    <div className="w-[110px] h-[110px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                      <img
                        src={`http://localhost:3001${doctor.foto_profil}`}
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
              ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
