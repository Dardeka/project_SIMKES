import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const facilityData = {
  title: 'DSA (Digital Subtraction Angiography)',
  mainImageUrl: '/images/layanan1.jpg',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla facilisi. Aliquam condimentum porttitor quam, sed tempor quam pretium quis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Quisque id erat ac nunc feugiat dignissim vitae quis est. Suspendisse pretium tincidunt lacus. Nulla facilisi. Aliquam condimentum porttitor quam, sed tempor quam pretium quis.`,
};

const relatedFacilities = [
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan1.jpg' },
  { name: 'MRI 3 Tesla', imageUrl: '/images/layanan2.jpg' },
  { name: 'Bedah Jantung Terbuka', imageUrl: '/images/layanan3.jpg' },
  { name: 'Endoskopi', imageUrl: '/images/layanan4.jpg' },
];

const Fasilitas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb/Title Section */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{facilityData.title}</h1>

          {/* Main Image Section */}
          <div className="mb-10 shadow-xl rounded-lg overflow-hidden">
            <img 
              src={facilityData.mainImageUrl}
              alt={facilityData.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="mb-16">
            <p className="text-gray-600 leading-relaxed">
              {facilityData.description}
            </p>
          </div>

          {/* Related Facilities Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lihat Fasilitas Lainnya di rumah sakit tobot</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedFacilities.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-62 w-full overflow-hidden">
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

export default Fasilitas;