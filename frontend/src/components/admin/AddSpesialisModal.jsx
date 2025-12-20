import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner'
import { useState } from 'react';

const AddSpesialisModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [picture, setPicture] = useState(null);

  const initValues = {
    namaSpesialis: '',
    deskripsi: '',
  };

  const submitSpesialisForm = async (values) => {
    console.log('Form Values:', values);
    const formData = new FormData();
    formData.append('namaSpesialis', values.namaSpesialis);
    formData.append('deskripsi', values.deskripsi);
    if(picture){
      formData.append('gambarSpesialis', picture);
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addSpeciality`, {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast.success('Spesialis berhasil ditambahkan!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="fixed inset-0 bg-transparant bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Tambah Spesialis</h2>

        <Formik
          initialValues={initValues}
          onSubmit={submitSpesialisForm}
        >
          <Form className="space-y-4">
            {/* Nama Spesialis */}
            <div>
              <label htmlFor="namaSpesialis" className="block text-sm font-semibold text-gray-700 mb-2">Spesialis</label>
              <Field 
                type="text" 
                id="namaSpesialis" 
                name="namaSpesialis"
                placeholder="Nama Spesialis"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                required 
              />
              <ErrorMessage name="namaSpesialis" className='text-black' component="span"/>
            </div>

            {/* Deskripsi */}
            <div>
              <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <Field 
                id="deskripsi" 
                name="deskripsi"
                rows="4"
                placeholder="Deskripsi Spesialis"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none" 
                required 
              />
              <ErrorMessage name="deskripsi" className='text-white' component="span"/>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="gambarSpesialis" className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
              <input 
                type="file" 
                id="gambarSpesialis"
                name="gambarSpesialis"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <p className="text-xs text-gray-500 mt-1">Please .jpg file upload.</p>
            </div>

            {/* Tombol Simpan */}
            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
              >
                Tambah Spesialis
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddSpesialisModal;