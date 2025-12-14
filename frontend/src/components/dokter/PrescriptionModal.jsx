import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';

const PrescriptionModal = ({ isOpen, onClose, appointment, examinationId}) => {
  const [prescription, setPrescription] = useState([]);
  const [dataFetched, setDataFetched] = useState(null);
  const [isOpenMedicineForm, setIsOpenMedicineForm] = useState(false);
  // console.log("This is prescription: ", prescription);
  console.log("This is appointment: ", appointment);
  // console.log("This is examinationId: ", examinationId);

  
  useEffect(() => {
    if (!isOpen || !appointment || !examinationId) return;

    const responseFetch = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/doctor/getPrescription/${examinationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log("Fetched prescription data: ", data);
        // setDataFetched(data);
        // setDiagnose(data.diagnosa || '')
      } catch (error) {
        console.log({error: error.message})
      }
    }
    responseFetch();
  }, [isOpen, appointment, examinationId]);
  
  if (!isOpen || !appointment) return null;

  // Handle Add prescription
  const handleAddPrescription = async ( patientId, doctorId, examinationId, prescriptionData, onFinish) => {
    console.log("Adding prescription for appointment ID: ", examinationId, prescriptionData);
    const response = await fetch(`http://localhost:3001/api/doctor/addPrescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_pasien: patientId,
        id_dokter: doctorId,
        id_pemeriksaan: examinationId,
        tanggal_terbit: new Date(),
        obat: prescription,
      })
    });
    // Output: id_resepObat
    const data = await response.json();
    console.log("Add prescription data: ", data);

    // Examination update : masukin diagnosa
    const responseDiagnose = await fetch(`http://localhost:3001/api/doctor/updateExamination/${examinationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagnosa: prescriptionData.diagnose
      }),
    });

    const dataDiagnose = await responseDiagnose.json();
    console.log("Update diagnose response: ", dataDiagnose);

    const responseStatus = await fetch(`http://localhost:3001/api/doctor/updateStatus/${appointment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus: 'Selesai' }),
    }) 
    const dataStatus = await responseStatus.json();
    console.log("Status update response: ", dataStatus);
    onClose();
    window.location.reload();
  }

  // console.log("This is doagnose: ",diagnose)
  console.log("This is prescription in modal: ", prescription);

  const initValuesMainModal = {
    diagnose: '',
    prescription: []
  }

  const initVal = {
    medicineName: '',
    dosage: '',
    quantity: ''
  }

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
        <Formik
          initialValues={initValuesMainModal}
          onSubmit={(values) => handleAddPrescription(appointment.id_pasien, appointment.id_dokter, examinationId, { diagnose: values.diagnose, prescription: values.prescription })}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="diagnose">Diagnosa :</label>
              <Field
                type="text"
                id="diagnose"
                name="diagnose"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-gray-100"
                required
              />
            </div>
            <div>
              <div className="flex flex-row mb-[20px] mt-[30px]">
                <label htmlFor="prescription" className="block text-sm font-semibold text-gray-700 mb-2">Isi Resep (Obat & Dosis)</label>
                <Button type="button" variant="outline" size="sm" className="ml-auto !text-white !bg-orange-500 hover:!bg-orange-600" onClick={() => setIsOpenMedicineForm(true)}>Tambah Obat</Button>
                {isOpenMedicineForm && (
                  <Dialog open={true}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Tambah Obat ke Resep</DialogTitle>
                      <DialogDescription>
                        Isi detail obat yang akan diresepkan kepada pasien.
                      </DialogDescription>
                    </DialogHeader>
                    <Formik
                      initialValues={initVal}
                      onSubmit={(values, { resetForm }) => {
                        const newMedicine = {
                          nama: values.medicineName,
                          dosis: values.dosage,
                          jumlah: values.quantity
                        };
                        setPrescription(prev => [...prev, newMedicine]);
                        resetForm();
                        setIsOpenMedicineForm(false);
                      }}
                    >
                      <Form className="space-y-4 mt-4">
                        <div>
                          <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">Nama Obat</label>
                          <Field
                            type="text"
                            id="medicineName"
                            name="medicineName"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosis</label>
                          <Field
                            type="text"
                            id="dosage"
                            name="dosage"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Jumlah</label>
                          <Field
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <Button type="submit" className="flex ml-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md">
                          Tambah Obat
                        </Button>
                      </Form>
                    </Formik>
                  </DialogContent>
                </Dialog>
                )}
              </div>
              <Table>
                <TableHeader className="border-t-1 border-solid border-gray-300">
                  <TableRow>
                    <TableHead className="w-1/2">Nama Obat</TableHead>
                    <TableHead className="w-1/4">Dosis</TableHead>
                    <TableHead className="w-1/4">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescription.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                        Belum ada obat yang ditambahkan.
                      </TableCell>
                    </TableRow>

                  ) : (prescription.map((med, index) => (
                      <TableRow key={index}>
                        <TableCell>{med.nama}</TableCell>
                        <TableCell>{med.dosis}</TableCell>
                        <TableCell>{med.jumlah}</TableCell>
                      </TableRow>
                    )))}
                </TableBody>
              </Table>
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
                  // onClick={() => handleAddPrescription(appointment.id_pasien, appointment.id_dokter, appointment.id, { diagnose, prescription })}
                >
                  Simpan
                </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PrescriptionModal;