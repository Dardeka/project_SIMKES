import React from 'react';
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Button } from '../components/ui/button';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // console.log('Form values:', values);
    axios.post('http://localhost:3001/api/login', values).then(response => {
      if(response.data.error){
        toast.error(response.data.error);
        return;
      }else{
        console.log('Login successful:', response.data);
        toast.success('Login berhasil!');
        // Handle successful login (e.g., redirect, store token, etc.)
        sessionStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{
      backgroundImage: `url('/images/login-picture.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      {/* Login Card Container */}
      <div className="bg-green bg-opacity-30 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md border border-white border-opacity-30">
        
        {/* Header/Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-row ml-[0px]">
            <img src="/logo/logo_SIMKES.png" alt="Logo" className="w-[60px] h-[60px] m-4" />
            <div className="flex flex-col text-white my-auto">
              <h2 className="font-bold">SIMKES</h2>
              <h4 className="font-light">Sistem Manajemen Pelayanan Kesehatan</h4>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        {/* Form Inputs */}
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Alamat Email</label>
              <Field 
                type="email" 
                id="email" 
                name="email"
                placeholder="Masukkan email"
                className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
              <Field 
                type="password" 
                id="password" 
                name="password"
                placeholder="Masukkan password"
                className="w-full text-white p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500" 
                required 
              />
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-white hover:text-teal-500">
                <input type="checkbox" className="form-checkbox text-teal-600 rounded mr-2" />
                Ingat saya
              </label>
              <a href="#" className="text-white hover:text-teal-500 font-medium">Lupa Password</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md mt-4"
            >
              Masuk
            </button>
          </Form>
        </Formik> 

        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-white">
            Belum punya akun? <Link to="/register" className="text-teal-600 hover:text-teal-500 font-bold">Daftar Sekarang</Link>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-white">
          <h1>Masuk sebagai :</h1>
          <div className="flex flex-row justify-center gap-5 mt-2">
            <Button className="!bg-white text-black cursor-pointer hover:!bg-gray-200" onClick={() => navigate('/login-dokter')}>Dokter</Button>
            <Button className="!bg-white text-black cursor-pointer hover:!bg-gray-200" onClick={() => navigate('/login-admin')}>Admin</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;