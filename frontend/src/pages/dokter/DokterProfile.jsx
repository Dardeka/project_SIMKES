import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaCalendarAlt, FaUser, FaPencilAlt, FaCamera } from 'react-icons/fa';
import DokterCustomSidebar from '../../components/dokterCustomSidebar';
import { useEffect } from 'react';

// const dummyProfile = {
//   id: 1,
//   nickname: 'Dr. Ryan',
//   fullname: 'Dr. Ryan Love Andris, Sp.PD',
//   email: 'ryan.andris@simkes.com',
//   specialty: 'Spesialis Penyakit Dalam',
//   phone: '081234567890',
//   imageUrl: '/images/doctor1.jpg' 
// };

const DokterAkun = () => {
  const [profile, setProfile] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    function decodeJWT(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    const data = decodeJWT(accessToken);
    console.log('Decoded JWT data:', data);

    const fetchProfile = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/profileDetails/${data.id}`);
      const resData = await response.json();
      
      const specialistDetail = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getCertainSpeciality/${resData.spesialis}`);
      const specialistData = await specialistDetail.json();

      const result = {
        ...resData,
        spesialis: specialistData.nama
      };
      

      setProfile(result);
      console.log('Fetched profile data:', result);
    }
    fetchProfile(); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Perubahan disimpan!');
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DokterCustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto">
        
        {/* Header Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Akun Dokter</h1>
          <p className="text-gray-500">Kelola informasi profil dan kredensial Anda.</p>
        </div>

        {/* Profile Card / Form */}
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Profile Image Column (Kiri) */}
              <div className="md:col-span-1 flex flex-col items-center border-r md:border-r-2 border-gray-100 pr-8">
                <div className="relative w-40 h-40 mb-4">
                  <img
                    src={`${profile.foto_profil}`}
                    alt="Foto Profil"
                    className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-md"
                  />
                  {/* Edit Icon Overlay */}
                  <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-2 bg-teal-600 text-white rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg">
                    <FaCamera size={16} />
                    <input type="file" id="imageUpload" className="hidden" accept="image/*" />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.namaLengkap}</h2>
                <p className="text-sm text-teal-600">{profile.spesialis}</p>
              </div>

              {/* Form Inputs Column (Kanan) */}
              <div className="md:col-span-2 space-y-4">
                
                {/* Nama Lengkap */}
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={profile.namaLengkap}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                
                {/* Spesialisasi */}
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Spesialisasi</label>
                  <input
                    type="text"
                    name="specialty"
                    id="specialty"
                    value={profile.spesialis}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    readOnly 
                    title="Hubungi Admin untuk mengubah Spesialisasi"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                {/* Status */}
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status : </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={profile.status}
                    onChange={handleChange}
                    className={profile.status === "Aktif" ? "bg-green-500 text-white mt-1 w-[150px] pl-2 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" : "bg-red-500 text-white mt-1 w-[150px] pl-2 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"}  
                    disabled
                  />
                </div>
                
                {/* Tombol Simpan */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg flex items-center space-x-2"
                  >
                    <FaPencilAlt />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>

              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default DokterAkun;