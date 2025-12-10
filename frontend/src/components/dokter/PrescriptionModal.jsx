import React, { useState } from 'react';

const PrescriptionModal = ({ isOpen, onClose, appointment }) => {
  const [prescription, setPrescription] = useState('');

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Resep untuk ${appointment.name} telah disimpan:\n${prescription}`);

    onClose();
    setPrescription('');
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
        >
          &times;
        </button>

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tulis Resep untuk Pasien</h2>
          <p className="text-gray-600 mt-1">
              Pasien: <span className="font-semibold text-teal-600">{appointment.name}</span>  |  
              Status: <span className="font-semibold text-green-600">{appointment.status}</span>
          </p>
        </div>

        {/* Form Resep */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prescription" className="block text-sm font-semibold text-gray-700 mb-2">Isi Resep (Obat & Dosis)</label>
            <textarea
              id="prescription"
              rows="8"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Contoh: Paracetamol 500mg (1x sehari sesudah makan)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none" 
              required
            />
          </div>

          {/* Footer Aksi */}
          <div className="mt-8 pt-4 border-t text-right space-x-3">
              <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
              >
                  Batal
              </button>
              <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
              >
                  Simpan Resep
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionModal;