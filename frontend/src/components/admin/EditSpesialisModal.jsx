import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

const EditSpesialisModal = ({ isOpen, onClose, spesialis }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (spesialis) {
      setName(spesialis.nama);
      setDescription(spesialis.deskripsi);
      setPicture(spesialis.gambar);
    }
  }, [spesialis]);

  const initValues = {
    namaSpesialis: spesialis ? spesialis.nama : '',
    deskripsi: spesialis ? spesialis.deskripsi : '',
    gambar: picture || null,
  };

  if (!isOpen || !spesialis) return null;

  const handleSubmit = async () => {
    const newFormData = new FormData();
    newFormData.append('_id', spesialis._id);
    newFormData.append('namaSpesialis', name);
    newFormData.append('deskripsi', description);
    if (picture) {
      newFormData.append('gambar', picture);
    }

    await fetch('http://localhost:3001/api/admin/updateSpeciality', {
      method: 'PUT',
      body: newFormData,
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Spesialis berhasil diupdate!');
      navigate(0);
    }).catch((error) => {
      console.error('Error:', error);
    });

    // e.preventDefault();
    console.log('Mengedit Spesialis:', name, description);
    onClose();
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

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Edit Spesialis ID: {spesialis._id}</h2>

        <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Gambar saat ini */}
            <div className="flex items-center space-x-4 mb-4">
              <img src={`http://localhost:3001${spesialis.gambar}`} alt="Current Image" className="h-16 w-16 object-cover rounded-md border" />
              <div className="flex-grow">
                  <label htmlFor="imageUpdate" className="block text-sm font-semibold text-gray-700 mb-2">Update Image</label>
                  <input 
                    type="file" 
                    id="imageUpdate"
                    name="imageUpdate"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={(e) => {
                      if(picture){
                        setPicture(picture);
                      }else{
                        setPicture(e.target.files[0]);
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Please .jpg file upload.</p>
              </div>
            </div>
            
            {/* Nama Spesialis */}
            <div>
              <label htmlFor="editName" className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
              <input 
                type="text" 
                id="editName" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                required 
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label htmlFor="editDescription" className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <textarea 
                id="editDescription" 
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none" 
                required 
              ></textarea>
            </div>

            {/* Tombol Simpan */}
            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditSpesialisModal;