import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaCalendarAlt, FaUser, FaPencilAlt } from 'react-icons/fa';
import AppointmentDetailModal from '../../components/dokter/AppointmentDetailModal';
import PrescriptionModal from '../../components/dokter/PrescriptionModal'; 

const initialAppointments = [
  { 
    id: 1, 
    name: 'Rojali', 
    date: '3/12/2025 - 12.00', 
    status: 'Check-in', 
    complaint: 'Kaki terasa aneh setelah mengangkat beban berat' 
  },
  { 
    id: 2, 
    name: 'Siti Rahayu', 
    date: '3/12/2025 - 13.30', 
    status: 'Menunggu', 
    complaint: 'Sakit kepala sebelah selama 3 hari terakhir.' 
  },
  { 
    id: 3, 
    name: 'Yanti', 
    date: '4/12/2025 - 09.00', 
    status: 'Batal', 
    complaint: 'Tidak hadir karena alasan pribadi.' 
  },
  { 
    id: 4, 
    name: 'Maya Sari', 
    date: '4/12/2025 - 14.00', 
    status: 'Selesai', 
    complaint: 'Konsultasi rutin terkait diabetes.' 
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'Check-in':
      return 'bg-yellow-100 text-yellow-800';
    case 'Menunggu':
      return 'bg-blue-100 text-blue-800';
    case 'Batal':
      return 'bg-red-100 text-red-800';
    case 'Selesai':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Sidebar = () => (
  <div className="w-64 h-screen bg-teal-700 text-white flex flex-col p-4 fixed">
    <div className="mb-8">
      <span className="text-xl font-bold">SIMKES</span>
      <p className="text-xs opacity-75">Sistem Manajemen Pelayanan Kesehatan</p>
    </div>
    
    <nav className="flex-grow space-y-4">
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaTachometerAlt /> <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg bg-teal-800 font-bold">
        <FaCalendarAlt /> <span>Jadwal Temu</span>
      </a>
      <a href="#" className="flex items-center space-x-3 text-lg p-2 rounded-lg hover:bg-teal-600">
        <FaUser /> <span>Akun</span>
      </a>
    </nav>
    
    <button className="flex items-center space-x-3 text-lg p-2 rounded-lg text-white hover:bg-teal-600">
      <FaSignOutAlt /> <span>Keluar</span>
    </button>
  </div>
);

const JadwalTemu = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const handleDetailClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };
  
  const handlePrescriptionClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsPrescriptionModalOpen(true);
  };
  
  const handlePrescriptionClose = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const handleDetailClose = () => {
    setIsDetailModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
      )
    );
    alert(`Status Temu Janji ID ${appointmentId} diubah menjadi: ${newStatus}`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-8">
        
        {/* Header Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Jadwal Temu</h1>
        </div>

        {/* Appointment Table */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-6xl mx-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Nama Pasien</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Tanggal/waktu</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Resep</th> {/* Kolom Resep Baru */}
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-medium">
                    {appointment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {appointment.date}
                  </td>
                  
                  {/* Kolom Status (dengan dropdown) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border border-gray-300 ${getStatusStyles(appointment.status)}`}
                    >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Check-in">Check-in</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Batal">Batal</option>
                    </select>
                  </td>
                  
                  {/* Kolom Resep Baru */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                        onClick={() => handlePrescriptionClick(appointment)}
                        className="bg-teal-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-teal-800 transition shadow-md flex items-center justify-center mx-auto"
                    >
                        <FaPencilAlt className="mr-1" size={12} /> Tulis Resep
                    </button>
                  </td>
                  
                  {/* Kolom Aksi */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={() => handleDetailClick(appointment)}
                      className="bg-teal-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-teal-700 transition shadow-md"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      <AppointmentDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={handleDetailClose}
        appointment={selectedAppointment}
      />
      
      {/* Modal Resep Baru */}
      <PrescriptionModal 
        isOpen={isPrescriptionModalOpen} 
        onClose={handlePrescriptionClose}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default JadwalTemu;