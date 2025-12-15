import React from 'react';
import { 
    FaUserMd,      // Dokter
    FaUsers,      // Pasien
    FaBookMedical, // Spesialis
    FaHospital,   // Fasilitas
    FaEdit,       // Ikon Aksi (Edit)
    FaTrashAlt,   // Ikon Aksi (Hapus)
} from 'react-icons/fa';

// Import CustomSidebar (diasumsikan sudah didefinisikan)
import CustomSidebar from "../../components/adminCustomSidebar"; 

// --- DUMMY DATA SESUAI DENGAN SKEMA PASIEN MONGODB ---

// Data Statistik Admin Dashboard
const dummyStats = [
    // Nilai ini hanya dummy, aslinya akan diambil dari API
    { label: 'Jumlah Dokter', value: 14, icon: FaUserMd, color: 'bg-teal-500 text-white' },
    { label: 'Jumlah Pasien', value: 26, icon: FaUsers, color: 'bg-sky-500 text-white' },
    { label: 'Jumlah Spesialis', value: 12, icon: FaBookMedical, color: 'bg-indigo-500 text-white' },
    { label: 'Jumlah Fasilitas', value: 15, icon: FaHospital, color: 'bg-orange-500 text-white' },
];

// Data Dummy Daftar Pasien (sesuai skema: namaLengkap, jenisKelamin, nomorTelepon, email, foto_profil)
const dummyPatients = [
    { 
        namaLengkap: 'Saddie Sink', 
        nomorTelepon: '081234567890', 
        email: 'email1@gmail.com', 
        jenisKelamin: 'Perempuan', 
        foto_profil: '/images/saddiesink.jpg' // Sesuaikan path gambar jika perlu
    },
    { 
        namaLengkap: 'Emma Myers', 
        nomorTelepon: '081234567890', 
        email: 'email2@gmail.com', 
        jenisKelamin: 'Perempuan', 
        foto_profil: '/images/emmamayers.jpg' 
    },
    { 
        namaLengkap: 'Joo Yuri', 
        nomorTelepon: '081234567890', 
        email: 'email3@gmail.com', 
        jenisKelamin: 'Perempuan', 
        foto_profil: '/images/jooyuri.jpg' 
    },
];

// --- SUB-KOMPONEN ---

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">{value}</h3>
            <div className={`p-3 rounded-full ${color} bg-opacity-90 shadow-lg`}>
                <Icon size={20} />
            </div>
        </div>
        <p className="text-sm font-medium text-gray-500 mt-2">{label}</p>
    </div>
);


// --- KOMPONEN UTAMA DASHBOARD ---

function DashboardAdm() {
    
    // Fungsi dummy untuk aksi (Edit/Hapus)
    const handleEdit = (patientName) => {
        alert(`Mengedit data pasien: ${patientName}`);
    };

    const handleDelete = (patientName) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus pasien: ${patientName}?`)) {
            alert(`Pasien ${patientName} berhasil dihapus (dummy action).`);
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar diabaikan karena menggunakan CustomSidebar */}
            <CustomSidebar />
            
            {/* Main Content Area: Padding Kiri diatur menyesuaikan Sidebar, diset default Tailwind jika CustomSidebar tidak diketahui lebarnya */}
            <div className="flex-grow p-8"> 
                
                {/* Header Section */}
                <div className="mb-10 pt-4">
                    <p className="text-3xl font-bold text-gray-900">Admin SIMKES</p>

                    <hr className="my-5 border-gray-200" />


                    <h1 className="text-3xl font-bold text-black">Welcome Admin</h1>
                    <h1 className="text-lg text-gray-500 mt-1">Rumah Sakit Rawamangun</h1>
                </div>

                {/* 1. Statistik Cards (Mirip desain, 4 kolom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {dummyStats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </div>

                {/* 2. Daftar Pasien */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Pasien</h2>
                
                <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gambar</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Lengkap</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No Telepon</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jenis Kelamin</th>
                                {/* <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {dummyPatients.map((patient, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img 
                                            className="h-12 w-12 rounded-full object-cover border-2 border-teal-100" 
                                            src={patient.foto_profil || '/images/default-user.jpg'} 
                                            alt={`Foto ${patient.namaLengkap}`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                                        {patient.namaLengkap}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {patient.nomorTelepon}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        {patient.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {patient.jenisKelamin}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex justify-center space-x-3">
                                            <button 
                                                onClick={() => handleEdit(patient.namaLengkap)}
                                                className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                                                title="Edit Data"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(patient.namaLengkap)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                                                title="Hapus Data"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );
}

export default DashboardAdm;