import React from 'react';
// Import HANYA ikon yang dibutuhkan untuk konten dashboard
import { FaCalendarAlt, FaUser, FaClock, FaBirthdayCake, FaUserMd } from 'react-icons/fa'; 
// Import Sidebar Anda (Asumsi path ini benar)
import DokterCustomSidebar from '../../components/dokterCustomSidebar';

// --- DUMMY DATA ---

const DUMMY_DOCTOR = {
    name: 'Dr. Agastya Dava',
    specialty: 'Spesialis Jantung',
    status: 'Aktif',
    dob: '22/01/2025',
    workingHours: '9am - 5pm',
    imageUrl: '/images/doctor-agastya.jpg'
};

const DUMMY_APPOINTMENTS = [
    { id: 1, name: 'Saddie Sink', status: 'Patient', imageUrl: '/images/saddiesink.jpg' },
    { id: 2, name: 'Emma Myers', status: 'Patient', imageUrl: '/images/emmamayers.jpg' },
    { id: 3, name: 'Joo Yuri', status: 'Patient', imageUrl: '/images/jooyuri.jpg' },
    { id: 4, name: 'Sae Byeok', status: 'Patient', imageUrl: '/images/saebyeok.jpg' },
    { id: 5, name: 'Mimi Peri', status: 'Patient', imageUrl: '/images/mimiperi.jpg' },
];

const DUMMY_STATS = {
    appointmentsToday: 12,
    totalPatients: 20
};

// --- KOMPONEN UTAMA DASHBOARD ---

const DashboardDokter = () => {
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const formattedTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });

    const getGreeting = () => {
        const hour = today.getHours();
        if (hour < 12) return 'Good Morning, Doctor!';
        if (hour < 18) return 'Good Afternoon, Doctor!';
        return 'Good Evening, Doctor!';
    };

    return (
        <div className="flex bg-gray-50 min-h-screen"> 
            
            {/* 1. SIDEBAR */}
            <DokterCustomSidebar />
            
            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-grow p-8 md:ml-24 max-w-7xl mx-auto w-full"> 
                
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Hero Card / Welcome Banner */}
                        <div className="bg-teal-700 p-6 rounded-xl shadow-xl text-white flex justify-between items-center h-48 relative overflow-hidden">
                            {/* Background Wave/Shape */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(/images/dashboard-pattern.svg)' }}></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl font-light">{getGreeting()}</h2>
                                <h1 className="text-4xl font-extrabold mt-1">{DUMMY_DOCTOR.name}</h1>
                                <p className="text-sm opacity-70 mt-2">Have a nice day, Handsome!</p>
                            </div>
                            
                            {/* Ikon Dokter di Sudut */}
                            <div className="relative z-10 hidden sm:block">
                                <FaUserMd size={80} className="opacity-80"/>
                            </div>
                        </div>

                        {/* Today Appointment List */}
                        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Today Appointment</h2>
                            
                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {DUMMY_APPOINTMENTS.map((appointment, index) => (
                                    <div 
                                        key={appointment.id} 
                                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition duration-150 border-b last:border-b-0"
                                    >
                                        <span className="text-lg font-bold text-gray-400 mr-4 w-6 text-right">{index + 1}</span>
                                        
                                        {/* Foto Pasien */}
                                        <img
                                            src={appointment.imageUrl}
                                            alt={appointment.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-teal-300 mr-4"
                                        />
                                        
                                        {/* Detail Pasien */}
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900">{appointment.name}</p>
                                            <p className="text-sm text-teal-600 flex items-center space-x-1">
                                                <FaUser size={10}/> <span>{appointment.status}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* KOLOM KANAN: Profil & Statistik */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        {/* My Profile Card */}
                        <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-teal-600">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">My Profile</h3>
                            
                            <div className="flex flex-col items-center text-center mb-6">
                                <img
                                    src={DUMMY_DOCTOR.imageUrl}
                                    alt={DUMMY_DOCTOR.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-teal-200 shadow-md mb-3"
                                />
                                <h4 className="text-xl font-bold text-gray-900">{DUMMY_DOCTOR.name}</h4>
                                <p className="text-teal-600 font-medium">{DUMMY_DOCTOR.specialty}</p>
                                <span className={`text-xs font-semibold mt-1 px-3 py-1 rounded-full ${DUMMY_DOCTOR.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    Status: {DUMMY_DOCTOR.status}
                                </span>
                            </div>
                            
                            {/* Detail Info */}
                            <div className="space-y-3 pt-3 border-t">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <div className='flex items-center space-x-2'>
                                        <FaBirthdayCake size={14} className="text-teal-500"/>
                                        <span>Date of Birth</span>
                                    </div>
                                    <span className="font-semibold">{DUMMY_DOCTOR.dob}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <div className='flex items-center space-x-2'>
                                        <FaClock size={14} className="text-teal-500"/>
                                        <span>Working Hours</span>
                                    </div>
                                    <span className="font-semibold">{DUMMY_DOCTOR.workingHours}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Today Info Card */}
                        <div className="bg-teal-600 p-6 rounded-xl shadow-xl text-white">
                            <h3 className="text-xl font-bold mb-3 flex items-center space-x-2">
                                <FaCalendarAlt size={18}/> <span>Today</span>
                            </h3>
                            <p className="text-2xl font-extrabold">{formattedDate}</p>
                            <p className="text-lg opacity-80">{formattedTime}</p>
                        </div>

                        {/* Statistics Card */}
                        <div className="grid grid-cols-2 gap-4">
                            
                            {/* Appointments Today */}
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">Appointment</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <FaCalendarAlt size={20} className="text-teal-600"/>
                                    <span className="text-3xl font-extrabold text-gray-900">{DUMMY_STATS.appointmentsToday}</span>
                                </div>
                            </div>
                            
                            {/* Total Patients */}
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">Patient</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <FaUser size={20} className="text-teal-600"/>
                                    <span className="text-3xl font-extrabold text-gray-900">{DUMMY_STATS.totalPatients}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardDokter;