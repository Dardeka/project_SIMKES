import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaCalendarAlt, FaUser, FaPencilAlt, FaCamera } from 'react-icons/fa';

const dummyProfile = {
  id: 1,
  nickname: 'Dr. Ryan',
  fullname: 'Dr. Ryan Love Andris, Sp.PD',
  email: 'ryan.andris@simkes.com',
  specialty: 'Spesialis Penyakit Dalam',
  phone: '081234567890',
  imageUrl: '/images/doctor1.jpg' 
};

const Sidebar = () => (
  <div className="w-64 h-screen bg-teal-700 text-white flex flex-col p-4 fixed">
    <div className="mb-8">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">SIMKES</span>
      </div>
      <p className="text-xs opacity-75">Sistem Manajemen Pelayanan Kesehatan</p>
    </div>
    
    <nav className="flex-grow space-y-4">
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaTachometerAlt /> <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaCalendarAlt /> <span>Jadwal Temu</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg bg-teal-800 font-bold">
        <FaUser /> <span>Akun</span>
      </a>
    </nav>
    
    <button className="flex items-center space-x-3 text-lg p-2 rounded-lg text-white hover:bg-teal-600">
      <FaSignOutAlt /> <span>Keluar</span>
    </button>
  </div>
);

const DokterAkun = () => {
  const [profile, setProfile] = useState(dummyProfile);

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
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-8">
        
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
                    src={profile.imageUrl}
                    alt="Foto Profil"
                    className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-md"
                  />
                  {/* Edit Icon Overlay */}
                  <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-2 bg-teal-600 text-white rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg">
                    <FaCamera size={16} />
                    <input type="file" id="imageUpload" className="hidden" accept="image/*" />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.nickname}</h2>
                <p className="text-sm text-teal-600">{profile.specialty}</p>
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
                    value={profile.fullname}
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
                    value={profile.specialty}
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

                {/* Nomor Telepon */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    required
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