import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{
      backgroundImage: `url('/images/register-picture1.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      {/* Register Card Container */}
      <div className="bg-green bg-opacity-30 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg border border-white border-opacity-30">
        
        {/* Header/Logo Section */}
        <div className="flex flex-row ml-[10px]">
         <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[60px] h-[60px] m-4" />
          <div className="flex flex-col text-white my-auto">
            <h2 className="font-bold">SIMKES</h2>
            <h4 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h4>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        {/* Form Inputs */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nama Panggilan */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-white mb-1">Nama Panggilan</label>
              <input 
                type="text" 
                id="nickname" 
                placeholder="Nama Panggilan"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-white mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                id="fullname" 
                placeholder="Nama Lengkap"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Masukkan Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Masukkan Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Nomor Telepon</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="Contoh: 081234567890"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Ulangi Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">Ulangi Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Ulangi Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>
            
          </div>
          
          {/* Checkbox Syarat & Ketentuan */}
          <div className="flex justify-center items-center text-sm pt-2">
            <label className="flex items-center text-white">
              <input type="checkbox" className="form-checkbox text-teal-600 rounded mr-2" />
              Saya setuju dengan <a href="#" className="text-teal-600 hover:text-teal-500 font-bold ml-1 mr-1">Syarat dan Ketentuan</a>
            </label>
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md mt-4"
          >
            Daftar
          </button>
        </form>
        
        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <p className="text-white">
            Sudah punya akun? <Link to="/login" className="text-teal-600 hover:text-teal-500 font-bold">Masuk Sekarang</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;