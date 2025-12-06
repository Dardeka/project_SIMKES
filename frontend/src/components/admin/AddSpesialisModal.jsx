import React from 'react';

const AddSpesialisModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparant bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Tambah Spesialis</h2>

        <form className="space-y-4">
          
          {/* Nama Spesialis */}
          <div>
            <label htmlFor="namaSpesialis" className="block text-sm font-semibold text-gray-700 mb-2">Spesialis</label>
            <input 
              type="text" 
              id="namaSpesialis" 
              placeholder="Nama Spesialis"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
              required 
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
            <textarea 
              id="deskripsi" 
              rows="4"
              placeholder="Deskripsi Spesialis"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none" 
              required 
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
            <input 
              type="file" 
              id="image" 
              accept=".jpg"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            <p className="text-xs text-gray-500 mt-1">Please .jpg file upload.</p>
          </div>

          {/* Tombol Simpan */}
          <div className="text-center pt-4">
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
              Tambah Spesialis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpesialisModal;