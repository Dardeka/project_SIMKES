import React, { useState } from 'react';
import { FaSignOutAlt, FaUser, FaCamera, FaSave, FaHistory } from 'react-icons/fa';

export const dummyUserProfile = { 
  nickname: 'Saddie',
  fullname: 'Saddie Sink',
  email: 'saddiesink@mhs.unj.ac.id',
  address: 'Jl. Alamat Palsu Ayu ting-ting, Johar, Jakarta Selatan',
  nik: '3172012345678910',
  dob: '16 April 2002',
  phone: '081234567890',
  gender: 'Perempuan',
  imageUrl: '/images/saddiesink.jpg' 
};

export const ProfileNavigation = ({ activeTab }) => {
    return (
        <> 
            {/* Tombol Navigasi Samping */}
            <div className="w-full space-y-3">
                {/* Tombol Profile Aktif */}
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold">
                    <FaUser /> <span>Personal Information</span>
                </button>
                {/* Tombol History Tidak Aktif */}
                <a href="/consultationhistory" className="w-full bg-teal-50 text-teal-700 py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:bg-teal-100">
                    <FaHistory /> <span>Consultation History</span>
                </a>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-semibold mt-4">
                    <FaSignOutAlt /> <span>Logout</span>
                </button>
            </div>
        </>
    );
}

const UserProfile = () => {
    const [profile, setProfile] = useState(dummyUserProfile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Perubahan profil berhasil disimpan!');
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-12"> 
    
            {/* Main Content Area */}
            <div className="p-8">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        
                        {/* Kiri: Foto Profil, Nama, dan Navigasi */}
                        <div className="w-full md:w-1/3 flex flex-col items-center pt-4">
                            <div className="relative w-40 h-40 mb-4">
                                <img
                                    src={profile.imageUrl}
                                    alt="Foto Profil"
                                    className="w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-lg"
                                />
                                <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-2 bg-yellow-400 text-white rounded-full cursor-pointer hover:bg-yellow-500 transition shadow-md">
                                    <FaCamera size={16} />
                                    <input type="file" id="imageUpload" className="hidden" accept="image/*" />
                                </label>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{profile.fullname}</h2>
                            <div className="flex items-center text-gray-500 mb-6">
                                <FaUser size={12} className="mr-1" />
                                <p className="text-sm">Patient</p>
                            </div>
                            
                            {/* Tombol Navigasi Samping */}
                            <ProfileNavigation activeTab="profile" />
                        </div>

                        {/* Kanan: Form Inputs (Personal Information) */}
                        <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l pt-6 md:pl-8 border-gray-100"> 
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                
                                {/* Inputs 2 Kolom (Nickname & Fullname) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="nickname" className="block text-sm font-semibold text-gray-700">Nickname</label>
                                        <input type="text" name="nickname" id="nickname" value={profile.nickname} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                    </div>
                                    <div>
                                        <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700">Full Name</label>
                                        <input type="text" name="fullname" id="fullname" value={profile.fullname} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                    </div>
                                </div>

                                {/* Email, Address */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                                    <input type="email" name="email" id="email" value={profile.email} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address</label>
                                    <input type="text" name="address" id="address" value={profile.address} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
                                </div>

                                {/* Inputs 2 Kolom (NIK & Gender) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="nik" className="block text-sm font-semibold text-gray-700">NIK</label>
                                        <input type="text" name="nik" id="nik" value={profile.nik} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-gray-50" readOnly title="NIK tidak dapat diubah" />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Jenis Kelamin</label>
                                        <select name="gender" id="gender" value={profile.gender} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-white">
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Inputs 2 Kolom (DOB & Phone) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                                        <input type="text" name="dob" id="dob" value={profile.dob} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700 bg-gray-50" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                                        <input type="tel" name="phone" id="phone" value={profile.phone} onChange={handleChange} className="mt-1 w-full p-3 border border-teal-500 rounded-lg focus:ring-teal-500 focus:border-teal-700" required />
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
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;