import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import AddAkunModal from '../../components/admin/AddAkunModal'; 
import EditAkunModal from '../../components/admin/EditAkunModal'; 
import CustomSidebar from '../../components/adminCustomSidebar';

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
        setDataAkunPasien(data);
      } catch (error) {
        console.error('Error fetching akun pasien:', error);
      }
    };
    fetchAkunPasien();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CustomSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 mt-[64px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Akun Pasien</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola seluruh akun pasien yang terdaftar</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-teal-700 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">NIK</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Foto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Identitas</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {dataAkunPasien.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                      Data akun pasien belum tersedia
                    </td>
                  </tr>
                )}

                {dataAkunPasien.map((akun) => (
                  <tr key={akun._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {akun.nik}
                    </td>

                    {/* FOTO PROFIL */}
                    <td className="px-6 py-4">
                      {akun.foto_profil ? (
                        <img
                          src={
                            akun.foto_profil.startsWith('http')
                              ? akun.foto_profil
                              : `http://localhost:3001/uploads/${akun.foto_profil}`
                          }
                          alt={akun.namaLengkap}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-3xl" />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      <p className="font-semibold text-gray-900">{akun.namaLengkap}</p>
                      <p className="text-xs">Nama panggilan: {akun.namaPanggilan}</p>
                      <p className="text-xs">No. Telp: {akun.nomorTelepon}</p>
                      <p className="text-xs">Email: {akun.email}</p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                        <FaTrashAlt />
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
    </div>
  );
};

export default AdminDaftarAkun;