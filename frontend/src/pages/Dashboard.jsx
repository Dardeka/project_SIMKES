import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const dummyFacilities = [
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan1.jpg' },
  { name: 'MRI 3 Tesla', imageUrl: '/images/layanan2.jpg' },
  { name: 'Bedah Jantung Terbuka', imageUrl: '/images/layanan3.jpg' },
  { name: 'Endoskopi', imageUrl: '/images/layanan4.jpg' },
];

const dummySpecialists = [
  { name: 'Dr. Jantung', imageUrl: '/images/spesialis1.jpg' },
  { name: 'Dr. Mata', imageUrl: '/images/spesialis2.jpg' },
  { name: 'Dr. Kelamin', imageUrl: '/images/spesialis3.jpg' },
  { name: 'Dr. Anak', imageUrl: '/images/spesialis4.jpg' },
];

const dummyDoctors = [
  { name: 'Dr. Coyke', specialty: 'Dokter Umum', imageUrl: '/images/doctor1.jpg' },
  { name: 'Ryan Love Andris', specialty: 'Dokter Gigi', imageUrl: '/images/doctor2.jpg' },
  { name: 'Ryan Love Andris', specialty: 'Dokter Anak', imageUrl: '/images/doctor3.jpg' },
  { name: 'Ryan Love Andris', specialty: 'Dokter Hewan', imageUrl: '/images/doctor4.jpg' },
];


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('fasilitas'); 

  const currentContent = activeTab === 'fasilitas' ? dummyFacilities : dummySpecialists;

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
          {/* Overlay untuk indikator slider */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Image Card */}
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

            {/* Right: Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ayo Peduli Kesehatan</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat et leo at malesuada. Proin eleifend ante vitae ex eleifend, id rutrum elit dignissim. Sed id maximus tempor. Vestibulum viverra et dolor vel magna eleifend consectetur vel ac ipsum. Maecenas lobortis est in ipsum posuere malesuada. Nam non ipsum quis mi molestie elementum. Nulla facilisi. Aliquam condimentum porttitor quam, sed tempor quam pretium quis.
              </p>
              <p className="text-gray-600">
                Suspendisse pretium tincidunt lacus. Nulla facilisi. Quisque consequat nisi laoreet, auctor nisl quis, sagittis erat. Sed ante velit, pharetra ultricies nulla sollicitudin, ultricies a lacus. Donec ac dolor eget urna maximus commodo. Nunc porta elit vel lectus ultricies, in elementum leo malesuada. Nullam convallis, erat vel auctor posuere, justo diam euismod tellus, ut tristique diam dui non justo. Pellentesque ornare, massa vel accumsan molestie, nisl nibh sollicitudin erat, vel facilisis mi justo.
              </p>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Layanan Kesehatan di rumah sakit tobot</h2>
            <p className="text-gray-600 mb-8">
              kami hadir untuk melayani anda dengan sepenuh hati
            </p>

            {/* Tombol Switch Fasilitas/Spesialis */}
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

            {/* Content Display (Fasilitas atau Spesialis) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {currentContent.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-800 mt-1">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor List Section - Daftar Dokter Keren */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Daftar Dokter Keren di Rumah Sakit Tobot</h2>

          <div className="flex justify-center flex-wrap gap-8">
            {dummyDoctors.map((doctor, index) => (
              <div key={index} className="flex flex-col items-center w-32">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  <img
                    src={doctor.imageUrl}
                    alt={`Foto ${doctor.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800">{doctor.name}</p>
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