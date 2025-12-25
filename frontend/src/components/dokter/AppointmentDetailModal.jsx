import React, { useEffect, useState } from 'react';
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

const AppointmentDetailModal = ({ isOpen, onClose, appointment, examinationId }) => {
  if (!isOpen || !appointment) return null;
  const [history, setHistory] = useState([])

  console.log("This is appointment data: ", appointment)
  console.log("This is setHistory data: ", history)

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/getPatientHistory/${appointment.id_pasien}`);
      const data = await response.json();
      console.log("Patient history data: ", data)
      setHistory(data);
    }
    fetchHistory();
  }, [])

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl relative border border-gray-100">
        
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
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-4 w-[300px] p-4 border-r-1 border-gray-300">
            <div>
              <p className="text-base font-semibold text-gray-800">Nama :</p>
              <p className="text-lg font-medium text-teal-600">{appointment.name}</p>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-800">Tanggal Kunjungan :</p>
              <p className="text-lg font-medium text-teal-600">{dayjs(appointment.date).format('DD/MM/YYYY')}</p>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-800">Keluhan :</p>
              <p className="text-lg text-gray-900 leading-relaxed">{appointment.complaint}</p>
            </div>
          </div>
          <div className="w-full ml-4">
            <p className="text-base font-semibold text-gray-800">Riwayat Pemeriksaan Pasien :</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Keluhan</TableHead>
                  <TableHead>Diagnosa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      Belum ada riwayat pemeriksaan.
                    </TableCell>
                  </TableRow>
                ) : (
                  history.filter(record => record._id !== examinationId).map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{dayjs(record.tanggalPeriksa).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{record.namaDokter}</TableCell>
                      <TableCell>{record.keluhan}</TableCell>
                      <TableCell>{record.diagnosa}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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