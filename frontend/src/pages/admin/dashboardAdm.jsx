import React, { useEffect, useState } from 'react';
import {
  FaUserMd,
  FaUsers,
  FaBookMedical,
  FaHospital,
} from 'react-icons/fa';

import CustomSidebar from "../../components/adminCustomSidebar";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// ================= SUB COMPONENT =================
const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <div className={`p-3 rounded-full ${color} shadow`}>
        <Icon size={20} />
      </div>
    </div>
    <p className="text-sm font-medium text-gray-500 mt-2">{label}</p>
  </div>
);

// ================= MAIN COMPONENT =================
function DashboardAdm() {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    specialities: 0,
    facilities: 0,
  });

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          doctorsRes,
          patientsRes,
          facilitiesRes,
          specialityRes,
        ] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/allData`),
          fetch(`${BASE_URL}/api/admin/getAllPatientsAccount`),
          fetch(`${BASE_URL}/api/admin/getAllfacilities`),
          fetch(`${BASE_URL}/api/admin/getAllSpecialities`),
        ]);

        const doctorsData = await doctorsRes.json();
        const patientsData = await patientsRes.json();
        const facilitiesData = await facilitiesRes.json();
        const specialityData = await specialityRes.json();

        setStats({
          doctors: doctorsData?.length || 0,
          patients: patientsData?.length || 0,
          facilities: facilitiesData?.length || 0,
          specialities: specialityData?.length || 0,
        });

        setPatients(patientsData || []);
      } catch (error) {
        console.error("Error fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CustomSidebar />

      <div className="flex-grow px-10 py-6">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-3xl font-bold text-gray-900">Admin SIMKES</p>
          <hr className="my-5" />
          <h1 className="text-3xl font-bold text-black">Welcome Admin</h1>
          <p className="text-lg text-gray-500">Rumah Sakit Rawamangun</p>
        </div>

        {/* STATISTIC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Jumlah Dokter"
            value={stats.doctors}
            icon={FaUserMd}
            color="bg-teal-500 text-white"
          />
          <StatCard
            label="Jumlah Pasien"
            value={stats.patients}
            icon={FaUsers}
            color="bg-sky-500 text-white"
          />
          <StatCard
            label="Jumlah Spesialis"
            value={stats.specialities}
            icon={FaBookMedical}
            color="bg-indigo-500 text-white"
          />
          <StatCard
            label="Jumlah Fasilitas"
            value={stats.facilities}
            icon={FaHospital}
            color="bg-orange-500 text-white"
          />
        </div>

        {/* TABLE PASIEN */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Pasien
        </h2>

        <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
          {loading ? (
            <p className="text-center py-10 text-teal-600 font-semibold">
              Memuat data pasien...
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Foto</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Lengkap</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No Telepon</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis Kelamin</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={
                          patient.foto_profil
                            ? `${BASE_URL}${patient.foto_profil}`
                            : "/images/default-user.jpg"
                        }
                        alt={patient.namaLengkap}
                        className="h-12 w-12 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {patient.namaLengkap}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {patient.nomorTelepon}
                    </td>
                    <td className="px-6 py-4 text-blue-600">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {patient.jenisKelamin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdm;
