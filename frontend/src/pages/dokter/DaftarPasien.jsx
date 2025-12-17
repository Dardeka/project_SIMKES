import React, { use, useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaCalendarAlt, FaUser, FaPencilAlt } from 'react-icons/fa';
import AppointmentDetailModal from '../../components/dokter/AppointmentDetailModal';
import PrescriptionModal from '../../components/dokter/PrescriptionModal'; 
import DokterCustomSidebar from '../../components/dokterCustomSidebar';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/id";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

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

const DaftarPasien = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [targetPrescription, setTargetPrescription] = useState([]);
  dayjs.locale('id');

  console.log("Selected appointment: ", selectedAppointment);

  useEffect(() => {
    function decodeJWT(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    const token = sessionStorage.getItem('accessToken');
    const decodedToken = decodeJWT(token);
    console.log("Decoded JWT: ", decodedToken);
    if (decodedToken) {
      console.log("User ID from token: ", decodedToken.id);
    }
    setDoctorId(decodedToken.id)
  }, []);

  const handleDetailClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };
  
  const handlePrescriptionClick = async (appointment) => {
    let examId = appointment.id_pemeriksaan;

    if(!examId) {
      examId = await handleAddInitialExamination(appointment);
    }

    setSelectedAppointment({
      ...appointment,
      id_pemeriksaan: examId
    });
    console.log("Opening prescription modal for appointment: ", appointment);
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
    toast.success(`Status Temu Janji ID ${appointmentId} diubah menjadi: ${newStatus}`);
  };

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/doctor/getAllAppointments');
        const data = await response.json();
        const formattedData = await Promise.all(
          data.map(async (appointment) => {
            console.log("Raw appointment data: ", appointment);
            const patientDetail = await fetchPatientDetails(appointment.id_pasien)
            
          return {
            index: appointment.nomorAntrian,
            id: appointment._id,
            id_dokter: appointment.id_dokter,
            id_pasien: appointment.id_pasien,
            id_pemeriksaan: appointment.id_pemeriksaan,
            name: patientDetail.namaLengkap, // Sesuaikan dengan struktur data sebenarnya
            date: appointment.tglRencanaKunjungan,
            status: appointment.status || 'Menunggu', // Default status
            complaint: appointment.keluhan || 'Tidak ada komplain', // Default complaint
            createdAt: appointment.createdAt
          }
        }));
        setAppointments(formattedData);
        console.log("Fetched appointments: ", data);
        // Transform data if necessary and update state
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    // 
    const fetchPatientDetails = async (patientId) => {
      try {
        console.log("Fetching details for patient ID: ", patientId);
        const response = await fetch(`http://localhost:3001/api/profile/${patientId}`);
        const data = await response.json();
        console.log("Fetched patient details: ", data);
        return data;
      } catch (error) {
        console.error("Error fetching patient details: ", error);
        return null;
      }
    };
  
    fetchAppointments();
  }, []);

  // Update status di database
  const handleStatusChangeinDatabase = async (appointmentId, newStatus) => {
    try {
      // Update status di pendaftaran pasien
      console.log(`Updating status in database for appointment ID ${appointmentId} to ${newStatus}`);
      const response = await fetch(`http://localhost:3001/api/doctor/updateStatus/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus: newStatus }),
      }) 
      const data = await response.json();
      console.log("Status update response: ", data);

    } catch (error) {
      console.log({error: error.message})
    }
  }

  // Update appointment dengan examId
  const handleUpdateAppointments = async (appointmentId, examId) => {
    try {
      await fetch(`http://localhost:3001/api/doctor/updateExamId/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ examId: examId })
      })
    } catch (error) {
      console.log({error: error.message})
    }
  }
  
  // Tambah data awal pemeriksaan di database pemeriksaan
  const handleAddInitialExamination = async (appointment) => {
    try {
      if(appointment.id_pemeriksaan) {
        console.log("Examination already exists for this appointment: ", appointment.id_pemeriksaan);
        return appointment.id_pemeriksaan;
      }

      const responseExamination = await fetch('http://localhost:3001/api/doctor/addInitialExamination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idKunjungan: appointment.id,
          idDokter: appointment.id_dokter,
          idPasien: appointment.id_pasien,
          tanggalPeriksa: new Date().toISOString(),
          keluhan: appointment.complaint
        }),
      })
      const dataExamination = await responseExamination.json();
      const examId = dataExamination.id_pemeriksaan;
      console.log("Examination ID created: ", examId);

      console.log("New examination ID: ", appointment.id);

      await handleUpdateAppointments(appointment.id, examId);

      
      setAppointments(prev => 
        prev.map(a => 
          a.id === appointment.id ? { ...a, id_pemeriksaan: examId } : a
      ))
        
      setSelectedAppointment(prev =>
        prev?.id === appointment.id
        ? { ...prev, id_pemeriksaan: examId }
        : prev
      );
      console.log("Initial examination response: ", dataExamination);
      console.log("Initial examination response: ", selectedAppointment)

      setTimeout(() => {
        navigate(0);
      }, 2000);
      return examId;
    } catch (error) {
      console.log({error: error.message})
    }
  };

  // fetch resep
  const handleFetchPrescription = async (examinationId) => {
    try {
      const targetPrescription = await fetch(`http://localhost:3001/api/doctor/getPrescription/${examinationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await targetPrescription.json();
      console.log("Fetched prescription data: ", data);
      setTargetPrescription(data);
    } catch (error) {
      console.log({error: error.message})
    }
  }

  
  console.log("Current appointments state: ", appointments);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DokterCustomSidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col mt-[64px] mx-auto">
        
        {/* Header Content */}
        <div className="flex flex-row mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Pasien</h1>
          <div className="ml-auto">
            <h1 className='font-bold'>Hari ini : </h1>
            <h2 className="ml-auto">{dayjs().format("dddd, DD/MM/YYYY HH:mm")}</h2>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-6xl mx-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Urutan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Tanggal Daftar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Nama Pasien</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Resep</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.filter((appointment) => appointment.id_dokter === doctorId && dayjs(appointment.date).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')).map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {appointment.index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                    {dayjs(appointment.createdAt).format('DD/MM/YYYY HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-medium">
                    {appointment.name}
                  </td>
                  
                  {/* Kolom Status (dengan dropdown) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                        value={appointment.status}
                        onChange={async (e) =>{handleStatusChange(appointment.id, e.target.value); handleStatusChangeinDatabase(appointment.id, e.target.value); if(e.target.value === "Check-in") { const idPemeriksaan = await handleAddInitialExamination(appointment);}}}
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
                    {appointment.status === 'Selesai' ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="!bg-teal-600 text-white py-2 px-4 rounded-lg text-sm hover:!bg-teal-800 transition shadow-md flex items-center justify-center mx-auto" onClick={() => handleFetchPrescription(appointment?.id_pemeriksaan)}>Lihat Resep</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Resep Pasien</DialogTitle>
                            <DialogDescription>
                              Berikut adalah resep obat untuk pasien {appointment?.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <h1>Examination ID: {appointment?.id_pemeriksaan}</h1>
                            <h2 className="font-semibold text-base my-2">Obat yang Diberikan:</h2>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Nama Obat</TableHead>
                                  <TableHead>Dosis</TableHead>
                                  <TableHead>Jumlah</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {targetPrescription?.obat?.length > 0 && targetPrescription?.obat?.map((prescriptItem, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{prescriptItem.nama}</TableCell>
                                    <TableCell>{prescriptItem.dosis}</TableCell>
                                    <TableCell>{prescriptItem.jumlah}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : appointment.status === 'Menunggu'  || appointment.status === 'Batal' ? (
                        <button
                          onClick={() => toast.warning("Resep hanya dapat ditulis untuk pasien dengan status 'Check-in' atau 'Selesai'.")}
                          className="bg-teal-400 text-white py-2 px-4 rounded-lg text-sm hover:bg-teal-800 transition shadow-md flex items-center justify-center mx-auto"
                          disabled={true}
                        >
                          <FaPencilAlt className="mr-1" size={12} /> Tulis Resep
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePrescriptionClick(appointment)}
                          className="bg-teal-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-teal-800 transition shadow-md flex items-center justify-center mx-auto"
                        >
                          <FaPencilAlt className="mr-1" size={12} /> Tulis Resep
                        </button>
                      )
                    }
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
        examinationId={selectedAppointment?.id_pemeriksaan}
      />
    </div>
  );
};

export default DaftarPasien;