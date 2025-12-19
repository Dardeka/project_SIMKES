import React, { useState } from 'react';
import { FaSignOutAlt, FaUser, FaHistory, FaUserCircle } from 'react-icons/fa';
import PatientPrescriptionModal from '../components/pasien/PatientPrescriptionModal';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const getButtonStyles = (status) => {
    return status === 'Selesai' 
        ? 'bg-teal-600 hover:bg-teal-700 text-white' 
        : 'bg-gray-300 text-gray-600 cursor-not-allowed';
};

const HistoryNavigation = (profile) => {
    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        window.location.href = '/login';
    }

    return (
        <div className="w-full space-y-3">
            <a href="/profil" className="w-full bg-teal-50 text-teal-700 py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:bg-teal-100">
                <FaUser /> <span>Personal Information</span>
            </a>
            <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold">
                <FaHistory /> <span>Consultation History</span>
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold mt-4" onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
            </button>
        </div>
    );
}


const ConsultationHistory = () => {
    const { state } = useLocation();
    const profileData = state?.profile || alert("No profile data found!");
    console.log("Profile Data in ConsultationHistory:", profileData);
    const [history, setHistory] = useState([]);


    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const handleViewResep = (consultation) => {
        if (consultation.status === 'Selesai') {
            setSelectedConsultation(consultation);
            setIsPrescriptionModalOpen(true);
        }
    };
    
    const handleCloseModal = () => {
        setIsPrescriptionModalOpen(false);
        setSelectedConsultation(null);
    };

    useEffect(() => {
        const fetchConsultationHistory = async (profileId) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getHistory/${profileId}`);
                const data = await response.json();
                setHistory(data);
                console.log("Fetched consultation history:", data);
            } catch (error) {
                console.log({error: error.message})
            }
        }
        fetchConsultationHistory(profileData._id);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pt-12"> 
            <Navbar />
            <div className="mt-22 p-8">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-6xl mx-auto">
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        
                        {/* Foto Profil, Nama, dan Navigasi */}
                        <div className="w-full md:w-1/4 flex flex-col items-center pt-4">
                            <div className="relative w-36 h-36 mb-4">
                                {profileData.foto_profil ? (
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}${profileData.foto_profil}`}
                                        alt="Foto Profil"
                                        className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
                                    />
                                ): (
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                        <FaUserCircle className="text-gray-400 text-9xl" />
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 p-2 bg-yellow-400 text-white rounded-full transition shadow-md opacity-70">
                                    <FaUser size={16} /> 
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{profileData.namaLengkap}</h2>
                            <div className="flex items-center text-gray-500 mb-6">
                                <FaUser size={12} className="mr-1" />
                                <p className="text-sm">Patient</p>
                            </div>
                            
                            <HistoryNavigation />
                        </div>

                        {/* Consultation History Table */}
                        <div className="w-full md:w-3/4 border-t md:border-t-0 md:border-l pt-6 md:pl-8 border-gray-100">
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">Consultation History</h1>
                            
                            {/* History Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-teal-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800 uppercase tracking-wider">Tanggal/Waktu</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800 uppercase tracking-wider">Dokter</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800 uppercase tracking-wider">Keluhan</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800 uppercase tracking-wider">Diagnosis</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-teal-800 uppercase tracking-wider">Resep</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {history.map((history) => (
                                        <tr key={history._id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                                                {dayjs(history.tanggalPeriksa).format('DD/MM/YYYY HH:mm')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-medium">
                                                {history.namaDokter}
                                            </td>
                                            <td className="px-6 py-4 max-w-xs text-sm text-gray-700 truncate">
                                                {history.keluhan}
                                            </td>
                                            <td className="px-6 py-4 max-w-xs text-sm text-gray-700 truncate">
                                                {history.diagnosa}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button 
                                                    onClick={() => handleViewResep(history)}
                                                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition shadow-md ${getButtonStyles(history.status)}`}
                                                    disabled={history.status !== 'Selesai'}
                                                >
                                                    Lihat Resep
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal Resep Pasien */}
            <PatientPrescriptionModal 
                isOpen={isPrescriptionModalOpen}
                onClose={handleCloseModal}
                consultation={selectedConsultation}
            />
            
        </div>
    );
};

export default ConsultationHistory;