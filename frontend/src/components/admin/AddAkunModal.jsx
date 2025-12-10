import React, { useState } from 'react';

const AddAkunModal = ({ isOpen, onClose }) => {
  const [role, setRole] = useState('Pasien'); 
  const roles = ['Admin', 'Pasien', 'Dokter'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Tambah Akun</h2>

        <form className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nama Panggilan */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-800 mb-1">Nama Panggilan</label>
              <input type="text" id="nickname" placeholder="Nama Panggilan" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-800 mb-1">Nama Lengkap</label>
              <input type="text" id="fullname" placeholder="Nama Lengkap" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <input type="email" id="email" placeholder="Masukkan Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <input type="password" id="password" placeholder="Masukkan Password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">Nomor Telepon</label>
              <input type="tel" id="phone" placeholder="Contoh: 081234567890" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Dropdown Role */}
            <div>
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
            
            {/* Image Upload */}
            <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Image Profile</label>
                <input 
                type="file" 
                id="image" 
                accept=".jpg"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
            </div>

          </div>
          
          {/* Tombol Simpan */}
          <div className="text-center pt-4">
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
              Tambah Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAkunModal;