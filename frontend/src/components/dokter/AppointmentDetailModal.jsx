import React from 'react';

const AppointmentDetailModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
        >
          &times;
        </button>

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Detail Kunjungan</h2>
          <p className="text-gray-600 mt-1">Berikut ini adalah detail keluhan pasien:</p>
        </div>

        {/* Detail Content */}
        <div className="space-y-4">
          
          <div>
            <p className="text-base font-semibold text-gray-800">Nama :</p>
            <p className="text-lg font-medium text-teal-600">{appointment.name}</p>
          </div>

          <div>
            <p className="text-base font-semibold text-gray-800">Tanggal Kunjungan :</p>
            <p className="text-lg font-medium text-teal-600">{appointment.date}</p>
          </div>

          <div>
            <p className="text-base font-semibold text-gray-800">Keluhan :</p>
            <p className="text-lg text-gray-900 leading-relaxed">{appointment.complaint}</p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-right">
            <button
                onClick={onClose}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;