import React, { useState } from 'react';
import { FaPlus, FaSignOutAlt, FaTachometerAlt, FaFlask, FaUserMd, FaUser } from 'react-icons/fa';
import AddSpesialisModal from '../../components/admin/AddSpesialisModal'; 
import EditSpesialisModal from '../../components/admin/EditSpesialisModal';
import CustomSidebar from '../../components/customSidebar';

const dummySpesialis = [
  { id: 1, name: 'Bedah Saraf', description: 'Deskripsi Bedah Saraf di rumah sakit tobot', imageUrl: '/images/spesialis1.jpg' },
  { id: 2, name: 'Bedah Saraf', description: 'Deskripsi Bedah Saraf di rumah sakit tobot', imageUrl: '/images/spesialis2.jpg' },
  { id: 3, name: 'Bedah Saraf', description: 'Deskripsi Bedah Saraf di rumah sakit tobot', imageUrl: '/images/spesialis3.jpg' },
];

{/* Navbar Sementara untuk liat layout */}
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

    {/* <div className="mb-8">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">SIMKES</span>
      </div>
      <p className="text-xs opacity-75">Sistem Manajemen Pelayanan Kesehatan</p>
    </div> */}
    
    <nav className="flex-grow space-y-4">
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaTachometerAlt /> <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaFlask /> <span>Fasilitas</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg bg-teal-800 font-bold">
        <FaUserMd /> <span>Spesialis</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaUser /> <span>Dokter</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaUser /> <span>Akun</span>
      </a>
    </nav>
    
    <button className="flex items-center space-x-3 text-lg p-2 rounded-lg text-white hover:bg-teal-600">
      <FaSignOutAlt /> <span>Keluar</span>
    </button>
  </div>
);

const AdminSpesialis = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSpesialis, setCurrentSpesialis] = useState(null);

  const handleEditClick = (spesialis) => {
    setCurrentSpesialis(spesialis);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto">
        
        {/* Header Content */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Spesialis Anda</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition"
          >
            <FaPlus />
            <span>Tambah Spesialis</span>
          </button>
        </div>

        {/* Spesialis Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Nama Spesialis</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummySpesialis.map((spesialis) => (
                <tr key={spesialis.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spesialis.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={spesialis.imageUrl} alt={spesialis.name} className="h-20 w-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{spesialis.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{spesialis.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEditClick(spesialis)}
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
      <AddSpesialisModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      {currentSpesialis && (
        <EditSpesialisModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          spesialis={currentSpesialis}
        />
      )}
    </div>
  );
};

export default AdminSpesialis;