import React from 'react';
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nik: Yup.string().required('Nama Panggilan wajib diisi'),
    namaLengkap: Yup.string().required('Nama Lengkap wajib diisi'),
    jenisKelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
    tanggalLahir: Yup.date().required('Tanggal Lahir wajib diisi'),
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    nomorTelepon: Yup.string().matches(/^[0-9]+$/, 'Nomor Telepon hanya boleh berisi angka').required('Nomor Telepon wajib diisi'),
    password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password wajib diisi'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, values).then(response => {
      if(response.data.message){
        toast.error(response.data.message);
        return;
      }else{
        console.log('Registration successful:', response.data);
        toast.success('Registrasi berhasil!');
        // Handle successful registration (e.g., redirect, store token, etc.)
        navigate('/login');
      }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{
      backgroundImage: `url('/images/register-picture1.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      {/* Register Card Container */}
      <div className="bg-green bg-opacity-30 backdrop-blur-md px-8 py-4 sm:px-8 sm:py-4 sm:my-4  rounded-xl shadow-2xl w-full max-w-4xl border border-white border-opacity-30">
        
        {/* Header/Logo Section */}
        <div className="flex flex-row ml-[10px]">
         <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[60px] h-[60px] m-4" />
          <div className="flex flex-col text-white my-auto">
            <h2 className="font-bold">SIMKES</h2>
            <h4 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h4>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-4">Register</h2>

        {/* Form Inputs */}
        <Formik
          initialValues={{ nik: '', namaLengkap: '', jenisKelamin: '', tanggalLahir: '', email: '', password: '', nomorTelepon: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
              {/* NIK */}
              <div>
                <label htmlFor="nik" className="block text-sm font-medium text-white mb-1">Nomor NIK</label>
                <Field 
                  type="text" 
                  id="nik"
                  name="nik"
                  placeholder="Nomor NIK"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="nik" className='text-white' component="span"/>
              </div>
              
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="namaLengkap" className="block text-sm font-medium text-white mb-1">Nama Lengkap</label>
                <Field 
                  type="text" 
                  id="namaLengkap" 
                  name="namaLengkap"
                  placeholder="Nama Lengkap"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="namaLengkap" className='text-white' component="span"/>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label htmlFor="jenisKelamin" className="block text-sm font-medium text-white mb-1">Jenis Kelamin</label>
                <Field 
                  type="text" 
                  id="jenisKelamin"
                  name="jenisKelamin" 
                  placeholder="Masukkan jenisKelamin"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="jenisKelamin" className='text-white' component="span"/>
              </div>

              {/* Tanggal lahir */}
              <div>
                <label htmlFor="tanggalLahir" className="block text-sm font-medium text-white mb-1">Tanggal Lahir</label>
                <Field 
                  type="date" 
                  id="tanggalLahir"
                  name="tanggalLahir" 
                  placeholder="Masukkan Tanggal Lahir"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="tanggalLahir" className='text-white' component="span"/>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                <Field 
                  type="email" 
                  id="email"
                  name="email" 
                  placeholder="Masukkan Email"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="email" className='text-white' component="span"/>
              </div>

              {/* Nomor Telepon */}
              <div>
                <label htmlFor="nomorTelepon" className="block text-sm font-medium text-white mb-1">Nomor Telepon</label>
                <Field 
                  type="tel" 
                  id="nomorTelepon"
                  name="nomorTelepon" 
                  placeholder="Contoh: 081234567890"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="nomorTelepon" className='text-white' component="span"/>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                <Field 
                  type="password" 
                  id="password"
                  name="password" 
                  placeholder="Masukkan Password"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="password" className='text-white' component="span"/>
              </div>


              {/* Ulangi Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">Ulangi Password</label>
                <Field 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Ulangi Password"
                  className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                  required 
                />
                <ErrorMessage name="confirmPassword" className='text-white' component="span"/>
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
          </Form>
        </Formik>
        
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