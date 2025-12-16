import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaClock, FaUserMd, FaGraduationCap } from 'react-icons/fa'; 
import DokterCustomSidebar from '../../components/dokterCustomSidebar';
import dayjs from 'dayjs';
import "dayjs/locale/id"; 


const DashboardDokter = () => {
    // START: PERUBAHAN WAKTU REAL-TIME
    // State baru untuk menyimpan waktu saat ini (diperbarui setiap detik)
    const [currentTime, setCurrentTime] = useState(dayjs());
    // END: PERUBAHAN WAKTU REAL-TIME
    
    // Inisialisasi state untuk data yang akan diambil dari API
    const [doctorData, setDoctorData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({ appointmentsToday: 0, totalPatients: 0 });
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState(null);

    dayjs.locale('id');
    
    // Gunakan currentTime untuk semua format tanggal/waktu
    const formattedDate = currentTime.format('dddd, DD MMMM YYYY');
    const formattedTime = currentTime.format('HH:mm:ss [WIB]');

    const getGreeting = () => {
        const hour = currentTime.hour(); // Menggunakan currentTime
        if (hour < 12) return 'Selamat Pagi, Dokter!';
        if (hour < 18) return 'Selamat Siang, Dokter!';
        return 'Selamat Malam, Dokter!';
    };

    // Fungsi untuk mendekode JWT
    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decoding JWT:", e);
            return null;
        }
    };
    
    // Fungsi bantuan untuk mengambil detail pasien
    const fetchPatientDetails = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/profile/${patientId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching patient details:", error);
            return null;
        }
    };

    // useEffect untuk mengambil Doctor ID dari token
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        const decodedToken = token ? decodeJWT(token) : null;
        if (decodedToken && decodedToken.id) {
            setDoctorId(decodedToken.id);
        } else {
            setLoading(false); 
            console.error("Doctor ID not found in token.");
        }
    }, []);

    // START: useEffect untuk WAKTU BERGERAK
    useEffect(() => {
        // Mengatur interval untuk memperbarui waktu setiap 1000 milidetik (1 detik)
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        // Cleanup function: penting untuk membersihkan interval saat komponen dilepas
        return () => clearInterval(timer);
    }, []); 
    // END: useEffect untuk WAKTU BERGERAK

    // useEffect untuk mengambil semua data (Profil, Janji Temu, Statistik)
    useEffect(() => {
        if (!doctorId) return; 

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // 1. Ambil Data Profil Dokter
                const profileResponse = await fetch(`http://localhost:3001/api/doctor/profileDetails/${doctorId}`);
                const profileResData = await profileResponse.json();
                
                // Ambil Nama Spesialisasi
                const specialistDetail = await fetch(`http://localhost:3001/api/getCertainSpeciality/${profileResData.spesialis}`);
                const specialistData = await specialistDetail.json();

                const doctorProfile = {
                    ...profileResData,
                    specialtyName: specialistData.nama,
                    name: profileResData.namaLengkap,
                    status: profileResData.status,
                    education: profileResData.pendidikan || 'Pendidikan Tidak Ada',
                    workingHours: '9 am - 9 pm', // Jam Kerja (Hardcoded)
                    imageUrl: `http://localhost:3001${profileResData.foto_profil}`,
                };
                setDoctorData(doctorProfile);

                // 2. Ambil Data Janji Temu
                const appointmentsResponse = await fetch('http://localhost:3001/api/doctor/getAllAppointments');
                const appointmentsData = await appointmentsResponse.json();
                
                // Filter janji temu HARI INI untuk dokter yang sedang login
                // Menggunakan 'dayjs()' saat fetch untuk mendapatkan hari ini yang stabil (tidak bergantung pada currentTime state)
                const today = dayjs(); 
                const todayAppointmentsRaw = appointmentsData.filter(app => 
                    app.id_dokter === doctorId && dayjs(app.tglRencanaKunjungan).isSame(today, 'day')
                );

                const todayAppointments = await Promise.all(
                    todayAppointmentsRaw.map(async (appointment) => {
                        const patientDetail = await fetchPatientDetails(appointment.id_pasien);
                        return {
                            id: appointment._id,
                            name: patientDetail?.namaLengkap || 'Nama Pasien Tidak Ditemukan',
                            status: 'Patient',
                            imageUrl: patientDetail?.foto_profil ? `http://localhost:3001${patientDetail.foto_profil}` : '/images/default-patient.jpg',
                        };
                    })
                );
                setAppointments(todayAppointments);

                // 3. Hitung Statistik
                const totalPatients = new Set(appointmentsData.map(app => app.id_pasien)).size;

                setStats({
                    appointmentsToday: todayAppointments.length,
                    totalPatients: totalPatients 
                });

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [doctorId]); 

    if (loading) {
        return (
            <div className="flex bg-gray-50 min-h-screen items-center justify-center">
                <div className="text-xl font-semibold text-teal-600">Loading Data Dashboard...</div>
            </div>
        );
    }

    if (!doctorData) {
        return (
            <div className="flex bg-gray-50 min-h-screen items-center justify-center">
                <div className="text-xl font-semibold text-red-600">Gagal memuat data dokter.</div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen"> 
            
            {/* 1. SIDEBAR */}
            <DokterCustomSidebar />
            
            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-grow p-6 md:ml-24 max-w-7xl mx-auto w-full"> 
                
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Hero Card / Welcome Banner */}
                        <div className="bg-teal-700 p-6 rounded-xl shadow-xl text-white flex justify-between items-center h-48 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(/images/dashboard-pattern.svg)' }}></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl font-light">{getGreeting()}</h2>
                                <h1 className="text-4xl font-extrabold mt-1">{doctorData.name}</h1>
                                <p className="text-sm opacity-70 mt-2">{doctorData.specialtyName}</p>
                            </div>
                            
                            <div className="relative z-10 hidden sm:block">
                                <FaUserMd size={80} className="opacity-80"/>
                            </div>
                        </div>

                        {/* Today Appointment List */}
                        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Today Appointment ({appointments.length})</h2>
                            
                            <div className="space-y-3 max-h-[350px] overflow-y-auto">
                                {appointments.length > 0 ? (
                                    appointments.map((appointment, index) => (
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
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Tidak ada janji temu hari ini.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* KOLOM KANAN: Profil & Statistik */}
                    <div className="lg:col-span-1">
                        
                        {/* My Profile Card */}
                        <div className="bg-white p-6 mb-4 rounded-xl shadow-xl border-t-4 border-teal-600">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">My Profile</h3>
                            
                            <div className="flex flex-col items-center text-center mb-6">
                                <img
                                    src={doctorData.imageUrl}
                                    alt={doctorData.name}
                                    className="w-24 h-24 rounded-full object-cover border-2 border-teal-800 shadow-md mb-3"
                                />
                                <h4 className="text-xl font-bold text-gray-900">{doctorData.name}</h4>
                                <p className="text-teal-600 font-medium">{doctorData.specialtyName}</p>
                                <span className={`text-xs font-semibold mt-1 px-3 py-1 rounded-full ${doctorData.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    Status: {doctorData.status}
                                </span>
                            </div>
                            
                            {/* Detail Info */}
                            <div className="space-y-3 pt-3 border-t">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <div className='flex items-center space-x-2'>
                                        <FaGraduationCap size={14} className="text-teal-500"/>
                                        <span>Pendidikan</span>
                                    </div>
                                    <span className="font-semibold">{doctorData.education}</span> 
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <div className='flex items-center space-x-2'>
                                        <FaClock size={14} className="text-teal-500"/>
                                        <span>Jam Kerja</span>
                                    </div>
                                    <span className="font-semibold">{doctorData.workingHours}</span> 
                                </div>
                            </div>
                        </div>
                        
                        {/* Today Info Card */}
                        <div className="bg-teal-600 p-6 mb-3 rounded-xl shadow-xl text-white">
                            <h3 className="text-xl font-bold mb-3 flex items-center space-x-2">
                                <FaCalendarAlt size={18}/> <span>Hari Ini</span>
                            </h3>
                            <p className="text-2xl font-extrabold">{formattedDate}</p>
                            <p className="text-lg opacity-80">{formattedTime}</p>
                        </div>

                        {/* Statistics Card */}
                        <div className="grid grid-cols-2 gap-4">
                            
                            {/* Appointments Today */}
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">Janji Temu Hari Ini</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <FaCalendarAlt size={20} className="text-teal-600"/>
                                    <span className="text-3xl font-extrabold text-gray-900">{stats.appointmentsToday}</span>
                                </div>
                            </div>
                            
                            {/* Total Patients */}
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">Total Pasien</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <FaUser size={20} className="text-teal-600"/>
                                    <span className="text-3xl font-extrabold text-gray-900">{stats.totalPatients}</span>
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