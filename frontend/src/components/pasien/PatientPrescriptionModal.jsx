import React from 'react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PatientPrescriptionModal = ({ isOpen, onClose, consultation }) => {
    if (!isOpen || !consultation) return null;
    console.log("Isi dari konsul : ", consultation)

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
                        Tanggal: <span className="font-semibold text-gray-800">{dayjs(consultation.tanggalPeriksa).format('DD/MM/YYYY HH:mm')}</span> | 
                        Dokter: <span className="font-semibold text-gray-800">{consultation.namaDokter}</span>
                    </p>
                </div>

                {/* Konten Resep & Diagnosis */}
                <div className="space-y-6">
                    
                    {/* Diagnosis */}
                    <div>
                        <p className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</p>
                        <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-gray-800">
                            {consultation.diagnosa}
                        </div>
                    </div>

                    {/* Resep */}
                    <div>
                        <label htmlFor="prescriptionContent" className="block text-sm font-semibold text-gray-700 mb-2">Isi Resep (Obat & Dosis)</label>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/2 bg-teal-50 text-teal-800">Nama Obat</TableHead>
                                    <TableHead className="w-1/4 bg-teal-50 text-teal-800">Dosis</TableHead>
                                    <TableHead className="w-1/4 bg-teal-50 text-teal-800">Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consultation.obat && consultation.obat.length > 0 ? (
                                    consultation.obat.map((item, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50">
                                            <TableCell className="text-gray-700">{item.nama}</TableCell>
                                            <TableCell className="text-gray-700">{item.dosis}</TableCell>
                                            <TableCell className="text-gray-700">{item.jumlah}</TableCell>
                                        </TableRow> 
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                                            Tidak ada obat yang diberikan dalam kunjungan ini.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
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