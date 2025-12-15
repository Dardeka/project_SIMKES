import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import { useLocation } from 'react-router-dom';

const Fasilitas = () => {
  const { state } = useLocation();
  const facility = state?.facility;
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/getAllFacilities');
        const data = await res.json();
        console.log("Ini isi data: ", data);
        setFacilities(data);
      } catch (error) {
        console.log({error: error.message})
      }
    }
    fetchFacilities();
  }, [])


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{facility.nama}</h1>

          {/* Main Image Section */}
          <div className="mb-10 shadow-xl rounded-lg overflow-hidden">
            <img 
              src={`http://localhost:3001${facility.gambar}`}
              alt={facility.nama}
            />
          </div>

          {/* Description Section */}
          <div className="mb-16">
            <p className="text-gray-600 leading-relaxed">
              {facility.deskripsi}
            </p>
          </div>

          {/* Related Facilities Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lihat Fasilitas Lainnya di rumah sakit tobot</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            { facilities.filter(item => item._id !== facility._id).map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-62 w-full overflow-hidden">
                  <img
                    src={`http://localhost:3001${item.gambar}`}
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-gray-800">{item.nama}</p>
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