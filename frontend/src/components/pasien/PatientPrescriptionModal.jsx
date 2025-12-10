import React from 'react';

const PatientPrescriptionModal = ({ isOpen, onClose, consultation }) => {
    if (!isOpen || !consultation) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            
            {/* Modal Container */}
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-100 transform transition-all scale-100 ease-out duration-300">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
                >
                    &times;
                </button>

                {/* Header */}
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-teal-700">Detail Resep Medis</h2>
                    <p className="text-gray-600 mt-1 text-sm">
                        Tanggal: <span className="font-semibold text-gray-800">{consultation.date}</span> | 
                        Dokter: <span className="font-semibold text-gray-800">{consultation.doctor}</span>
                    </p>
                </div>

                {/* Konten Resep & Diagnosis */}
                <div className="space-y-6">
                    
                    {/* Diagnosis */}
                    <div>
                        <p className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</p>
                        <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-gray-800">
                            {consultation.diagnosis}
                        </div>
                    </div>

                    {/* Resep */}
                    <div>
                        <label htmlFor="prescriptionContent" className="block text-sm font-semibold text-gray-700 mb-2">Isi Resep (Obat & Dosis)</label>
                        <textarea
                            id="prescriptionContent"
                            rows="8"
                            value={consultation.prescription}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm" 
                            title="Resep tidak dapat diubah"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t text-right">
                    <button
                        type="button"
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

export default PatientPrescriptionModal;