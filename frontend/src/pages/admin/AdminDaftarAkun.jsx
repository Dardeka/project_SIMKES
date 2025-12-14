import React, { useState } from 'react';
import { FaPlus, FaSignOutAlt, FaTachometerAlt, FaFlask, FaUserMd, FaUser } from 'react-icons/fa';
import AddAkunModal from '../../components/admin/AddAkunModal'; 
import EditAkunModal from '../../components/admin/EditAkunModal'; 
import CustomSidebar from '../../components/adminCustomSidebar';
import { useEffect } from 'react';
import { data } from 'react-router-dom';


const AdminDaftarAkun = () => {
  const [dataAkunPasien, setDataAkunPasien] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAkun, setCurrentAkun] = useState(null);

  const handleEditClick = (akun) => {
    setCurrentAkun(akun);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchAkunPasien = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/getAllPatientsAccount');
        const data = await response.json();
        console.log('Data Akun Pasien:', data);
        setDataAkunPasien(data);
        // You can set the fetched data to state here
      } catch (error) {
        console.error('Error fetching akun pasien:', error);
      }};
    fetchAkunPasien();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto">
        
        {/* Header Content */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun Pasien</h1>
        </div>

        {/* Akun Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">NIK</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Identitas</th>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow-y-scroll h-96">
              {dataAkunPasien.map((akun) => (
                <tr key={akun._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{akun.nik}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* <img src={akun.imageUrl} alt={akun.namaPanggilan} className="h-20 w-20 object-cover rounded-md" /> */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <p className="text-gray-900 font-semibold">Nama Lengkap: {akun.namaLengkap}</p>
                    <p>Nama Panggilan: {akun.namaPanggilan}</p>
                    <p>No Telepon: {akun.nomorTelepon}</p>
                    <p>Email: {akun.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
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
    </div>
  );
};

export default AdminDaftarAkun;