import React, { useState } from 'react';
import { FaPlus, FaSignOutAlt, FaTachometerAlt, FaFlask, FaUserMd, FaUser, FaTrashAlt } from 'react-icons/fa';
import AddSpesialisModal from '../../components/admin/AddSpesialisModal'; 
import EditSpesialisModal from '../../components/admin/EditSpesialisModal';
import CustomSidebar from '../../components/adminCustomSidebar';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AdminSpesialis = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSpesialis, setCurrentSpesialis] = useState(null);
  const [spesialisData, setSpesialisData] = useState([]);

  const handleEditClick = (spesialis) => {
    setCurrentSpesialis(spesialis);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchSpesialisData = async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllSpecialities`).then(response => response.json())
      .then(data => {
        console.log('Fetched Spesialis Data:', data);
        setSpesialisData(data);
      }).catch((error) => {
        console.error('Error fetching spesialis data:', error);
      });
    }
    fetchSpesialisData();
  }, []);

  const handleDelete = async (spesialisId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteSpeciality/${spesialisId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setSpesialisData(spesialisData.filter(item => item._id !== spesialisId));
        toast.success("Speciality deleted successfully!")
      } else {
        toast.error(`Failed to delete speciality: ${data.message || 'An error occurred.'}`);
      }
    } catch (error) {
      console.log({error: error.message})
      toast.error("Failed to delete speciality")
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto pl-[20px] pr-10">
        
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
        <div className="bg-white shadow-lg rounded-lg h-[550px] overflow-y-auto overflow-x-auto ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 z-10 bg-teal-700 text-white">
              <tr>
                <th className="w-20% px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
                <th className="w-20% px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Gambar</th>
                <th className="w-20% px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Nama Spesialis</th>
                <th className="w-20% px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Deskripsi</th>
                <th className="w-20% px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {spesialisData.map((spesialis) => (
                <tr key={spesialis._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spesialis._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={`${spesialis.gambar}`} alt={spesialis.nama} className="h-20 w-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{spesialis.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{spesialis.deskripsi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEditClick(spesialis)}
                      className="text-green-600 hover:text-green-900 bg-green-100 py-1 px-3 rounded-md transition"
                    >
                      Edit
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-red-600 hover:text-red-900 bg-red-100 py-1 px-3 rounded-md transition">
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Anda yakin menghapus fasilitas {spesialis.nama}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Aksi ini tidak dapat dibatalkan. Data fasilitas akan hilang secara permanen.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="!bg-red-600 text-white" onClick={() => handleDelete(spesialis._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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