import React, { useState } from 'react';
import { FaPlus, FaSignOutAlt, FaTachometerAlt, FaFlask, FaUserMd, FaUser } from 'react-icons/fa';
import AddAkunModal from '../../components/admin/AddAkunModal'; 
import EditAkunModal from '../../components/admin/EditAkunModal'; 
import CustomSidebar from '../../components/customSidebar';

const dummyAkun = [
  { 
    id: 1, 
    role: 'Admin', 
    nickname: 'Admin', 
    fullname: 'Admin', 
    telp: '08123456789', 
    email: 'admin2201@gmail.com', 
    imageUrl: '/images/doctor1.jpg' 
  },
  { 
    id: 2, 
    role: 'Dokter', 
    nickname: 'Dr. Rian', 
    fullname: 'Dr. Ryan Love Andris', 
    telp: '08123456789', 
    email: 'ryan.dr@gmail.com', 
    imageUrl: '/images/doctor2.jpg' 
  },
  { 
    id: 3, 
    role: 'Pasien', 
    nickname: 'Pasien A', 
    fullname: 'Pasien Andris', 
    telp: '08123456789', 
    email: 'pasien@gmail.com', 
    imageUrl: '/images/doctor3.jpg' 
  },
];

{/* Navbar Sementara untuk Layout */}
const Sidebar = () => (
  <div className="w-64 h-screen bg-teal-700 text-white flex flex-col p-4 fixed">
    {/* Header/Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-row ml-[0px]">
            <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[50px] h-[50px] m-4" />
            <div className="flex flex-col text-white my-auto">
              <h3 className="font-bold">SIMKES</h3>
              <h5 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h5>
            </div>
          </div>
        </div>
    
    <nav className="flex-grow space-y-4">
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaTachometerAlt /> <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaFlask /> <span>Fasilitas</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaUserMd /> <span>Spesialis</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaUser /> <span>Dokter</span>
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

const AdminDaftarAkun = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAkun, setCurrentAkun] = useState(null);

  const handleEditClick = (akun) => {
    setCurrentAkun(akun);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto">
        
        {/* Header Content */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition"
          >
            <FaPlus />
            <span>Tambah Akun</span>
          </button>
        </div>

        {/* Akun Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Identitas</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyAkun.map((akun) => (
                <tr key={akun.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{akun.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={akun.imageUrl} alt={akun.nickname} className="h-20 w-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <p className="text-gray-900 font-semibold">Nama Panggilan: {akun.nickname}</p>
                    <p>Nama Lengkap: {akun.fullname}</p>
                    <p>No Telepon: {akun.telp}</p>
                    <p>Email: {akun.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-bold">{akun.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEditClick(akun)}
                      className="text-green-600 hover:text-green-900 bg-green-100 py-1 px-3 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 bg-red-100 py-1 px-3 rounded-md transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddAkunModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      {currentAkun && (
        <EditAkunModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          akun={currentAkun}
        />
      )}
    </div>
  );
};

export default AdminDaftarAkun;