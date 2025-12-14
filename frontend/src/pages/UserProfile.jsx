import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUser, FaCamera, FaSave, FaHistory } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const ProfileNavigation = ({ activeTab, profile }) => {
    const navigate = useNavigate()

    const handleHistoryClick = (profile) => {
        navigate('/riwayatKonsultasi', { state: { profile } });
    }

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/');
    }
    
    return (
        <> 
            {/* Tombol Navigasi Samping */}
            <div className="w-full space-y-3">
                {/* Tombol Profile Aktif */}
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold">
                    <FaUser /> <span>Personal Information</span>
                </button>
                {/* Tombol History Tidak Aktif */}
                <Button onClick={() => handleHistoryClick(profile)} className="w-full bg-teal-50 text-teal-700 py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:bg-teal-100">
                    <FaHistory /> <span>Consultation History</span>
                </Button>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold mt-4" onClick={handleLogout}>
                    <FaSignOutAlt /> <span>Logout</span>
                </button>
            </div>
        </>
    );
}

function UserProfile() {
    const [accessToken, setAccessToken] = useState("");
    const [profile, setProfile] = useState([]);
    const [userId, setUserId] = useState("");

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
    
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if(token){
            setAccessToken(token);
            console.log("Access token set: ", token);
        }

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

        const data = decodeJWT(token);
        console.log('Decoded JWT data in profile:', data);
        if (data && data.id) {
            setUserId(data.id);
        }
    }, []);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const fetchProfile = await fetch(`http://localhost:3001/api/profile/${userId}`, {
                    method: 'GET',
                    headers: {
                        accessToken: accessToken
                    },
                });
                const profileData = await fetchProfile.json();
                console.log("Fetched profile data: ", profileData);
                setProfile(profileData);
            } catch (error) {
                console.log({error: error.message})
            }
        }
        fetchUserProfile();
    }, [userId]);
    
    console.log("Profile data set: ", profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadImage = async () => {
        const imageInput = document.getElementById('imageUpload');
        const file = imageInput.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        console.log('Preview URL:', previewUrl);
        setProfile(prev => ({ ...prev, foto_profil: previewUrl }));

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`http://localhost:3001/api/uploadProfileImage/${userId}`, {
                method: 'POST',
                headers: {
                    accessToken: accessToken
                },
                body: formData,
            });
            const data = await response.json();
            console.log('Image upload success:', data);
            setProfile(prev => ({ ...prev, foto_profil: data.imagePath }));
        } catch (error) {
            console.error('Image upload error:', error);
        }
    };

    const initVal = {
        namaPanggilan: profile.namaPanggilan || '',
        namaLengkap: profile.namaLengkap || '',
        email: profile.email || '',
        alamat: profile.alamat || '',
        nik: profile.nik || '',
        jenisKelamin: profile.jenisKelamin || '',
        tanggalLahir: profile.tanggalLahir || '',
        nomorTelepon: profile.nomorTelepon || ''
    }

    const handleSubmit = async () => {
        await fetch(`http://localhost:3001/api/updateProfile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accessToken: accessToken
            },
            body: JSON.stringify(profile),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Profile updated successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    

    return (
        <div className="bg-gray-50 min-h-screen pt-12"> 
            <Navbar />
            {/* Main Content Area */}
            <div className="mt-22 p-8">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        
                        {/* Kiri: Foto Profil, Nama, dan Navigasi */}
                        <div className="w-full md:w-1/3 flex flex-col items-center pt-4">
                            <div className="relative w-40 h-40 mb-4">
                                <img
                                    src={`http://localhost:3001${profile.foto_profil}`}
                                    alt="Foto Profil"
                                    className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
                                />
                                <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-2 bg-yellow-400 text-white rounded-full cursor-pointer hover:bg-yellow-500 transition shadow-md">
                                    <FaCamera size={16} />
                                    <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleUploadImage}/>
                                </label>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{profile.namaLengkap}</h2>
                            <div className="flex items-center text-gray-500 mb-6">
                                <FaUser size={12} className="mr-1" />
                                <p className="text-sm">Pasien</p>
                            </div>
                            
                            {/* Tombol Navigasi Samping */}
                            <ProfileNavigation activeTab="profile" profile={profile} />
                        </div>

                        {/* Kanan: Form Inputs (Personal Information) */}
                        <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l pt-6 md:pl-8 border-gray-100"> 
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Informasi Pribadi</h1>
                            <Formik
                                enableReinitialize
                                initialValues={initVal}
                                onSubmit={handleSubmit}
                            >
                                <Form className="space-y-4">
                                    
                                    {/* Inputs 2 Kolom (Nickname & Fullname) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="namaPanggilan" className="block text-sm font-semibold text-gray-700">Nama Panggilan</label>
                                            <Field type="text" name="namaPanggilan" id="namaPanggilan" value={profile?.namaPanggilan ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                        </div>
                                        <div>
                                            <label htmlFor="namaLengkap" className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
                                            <Field type="text" name="namaLengkap" id="namaLengkap" value={profile?.namaLengkap ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                        </div>
                                    </div>

                                    {/* Email, Address */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                                        <Field type="email" name="email" id="email" value={profile?.email ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                    </div>
                                    <div>
                                        <label htmlFor="alamat" className="block text-sm font-semibold text-gray-700">Address</label>
                                        <Field type="text" name="alamat" id="alamat" value={profile?.alamat ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                    </div>

                                    {/* Inputs 2 Kolom (NIK & Gender) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nik" className="block text-sm font-semibold text-gray-700">NIK</label>
                                            <Field type="text" name="nik" id="nik" value={profile?.nik ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-gray-50" readOnly title="NIK tidak dapat diubah" />
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Jenis Kelamin</label>
                                            <select name="gender" id="gender" value={profile?.jenisKelamin ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-white">
                                                <option value="Laki-laki">Laki-Laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Inputs 2 Kolom (DOB & Phone) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="tanggalLahir" className="block text-sm font-semibold text-gray-700">Tanggal Lahir</label>
                                            <Field type="text" name="tanggalLahir" id="tanggalLahir" value={dayjs(profile?.tanggalLahir).format('DD-MM-YYYY') ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-gray-50" readOnly />
                                        </div>
                                        <div>
                                            <label htmlFor="nomorTelepon" className="block text-sm font-semibold text-gray-700">Nomor Telepon</label>
                                            <Field type="tel" name="nomorTelepon" id="nomorTelepon" value={profile?.nomorTelepon ?? ""} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                        </div>
                                    </div>
                                    
                                    {/* Aksi Button */}
                                    <div className="text-right pt-6">
                                        <button
                                            type="submit"
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg flex items-center space-x-2 float-right"
                                        >
                                            <FaSave />
                                            <span>Save Changes</span>
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile