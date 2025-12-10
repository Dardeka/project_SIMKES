import React, { useState, useEffect } from 'react';

const EditAkunModal = ({ isOpen, onClose, akun }) => {
  const [role, setRole] = useState('Pasien'); 
  const roles = ['Admin', 'Pasien', 'Dokter'];
  
  const [formData, setFormData] = useState({
    nickname: '',
    fullname: '',
    email: '',
    telp: '',
    role: '',
  });

  useEffect(() => {
    if (akun) {
      setFormData({
        nickname: akun.nickname,
        fullname: akun.fullname,
        email: akun.email,
        telp: akun.telp,
        role: akun.role,
      });
      setRole(akun.role);
    }
  }, [akun]);

  if (!isOpen || !akun) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mengupdate Akun:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-semibold">&times;</button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Edit Akun ID: {akun.id}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Image & Update Button */}
          <div className="flex items-start space-x-4 mb-6 border-b pb-4">
            <img src={akun.imageUrl} alt="Profile" className="h-24 w-24 object-cover rounded-full border-2 border-gray-200" />
            <div className="flex-grow">
              <label htmlFor="imageUpdate" className="block text-sm font-semibold text-gray-700 mb-2">Update Profile Picture</label>
              <input type="file" id="imageUpdate" accept=".jpg" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nama Panggilan */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-800 mb-1">Nama Panggilan</label>
              <input type="text" id="nickname" value={formData.nickname} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-800 mb-1">Nama Lengkap</label>
              <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="telp" className="block text-sm font-medium text-gray-800 mb-1">Nomor Telepon</label>
              <input type="tel" id="telp" value={formData.telp} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Dropdown Role */}
            <div className="md:col-span-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-800 mb-1">Role</label>
              <select 
                id="role" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

          </div>
          
          {/* Tombol Simpan */}
          <div className="text-center pt-4">
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
              Update Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAkunModal;