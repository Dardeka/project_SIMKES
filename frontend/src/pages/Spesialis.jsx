import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const specialistData = {
  title: 'Gastroenterologi',
  mainImageUrl: '/images/spesialis1.jpg',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  description2: `Curabitur pretium tincidunt lacus. Nulla facilisi. Aliquam condimentum porttitor quam, sed tempor quam pretium quis. Quisque consequat nisi laoreet, auctor nisl quis, sagittis erat. Sed ante velit, pharetra ultricies nulla sollicitudin, ultricies a lacus. Donec ac dolor eget urna maximus commodo. Nunc porta elit vel lectus ultricies, in elementum leo malesuada. Nullam convallis, erat vel auctor posuere, justo diam euismod tellus, ut tristique diam dui non justo. Pellentesque ornare, massa vel accumsan molestie, nisl nibh sollicitudin erat, vel facilisis mi justo.`,
};

const availableDoctors = [
  { name: 'Dr. Ambadulana, M. Kes.', specialty: 'Spesialis', imageUrl: '/images/doctor1.jpg' },
  { name: 'Dr. Ambadulana, M. Kes.', specialty: 'Spesialis', imageUrl: '/images/doctor2.jpg' },
  { name: 'Dr. Ambadulana, M. Kes.', specialty: 'Spesialis', imageUrl: '/images/doctor3.jpg' },
  { name: 'Dr. Ambadulana, M. Kes.', specialty: 'Spesialis', imageUrl: '/images/doctor4.jpg' },
  ];

const relatedSpecialties = [
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/spesialis1.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/spesialis2.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/spesialis3.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/spesialis4.jpg' },
];

const Spesialis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title Section */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{specialistData.title}</h1>

          {/* Image and Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
            
            {/* Left: Image */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img 
                src={specialistData.mainImageUrl}
                alt={specialistData.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Right: Description Text */}
            <div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {specialistData.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {specialistData.description2}
              </p>
            </div>
          </div>

          {/* List of Available Doctors */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lihat Dokter Spesialis yang tersedia</h2>
          <div className="flex flex-wrap gap-6 mb-16">
            {availableDoctors.map((doctor, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/5 bg-white p-3 rounded-lg shadow-md border border-gray-100 text-center">
                <img
                  src={doctor.imageUrl}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-semibold text-gray-800">{doctor.name}</p>
                <p className="text-xs text-teal-600">{doctor.specialty}</p>
                <button className="mt-2 w-full bg-teal-600 text-white text-xs py-1 rounded hover:bg-teal-700 transition">
                  Buat Janji
                </button>
              </div>
            ))}
          </div>

          {/* Related Specialties Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lihat Spesialis Lainnya di rumah sakit tobot</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedSpecialties.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-42 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
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