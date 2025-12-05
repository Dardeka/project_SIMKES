
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 
import './Dashboard.css';

const FacilityCard = ({ title, imageUrl }) => (
  <div className="facility-card">
    <img src={imageUrl} alt={title} className="facility-image" />
    <p className="facility-title">{title}</p>
  </div>
);

const DoctorCard = ({ name, imageUrl }) => (
  <div className="doctor-card">
    <img src={imageUrl} alt={name} className="doctor-image" />
    <p className="doctor-name">{name}</p>
  </div>
);


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('fasilitas'); 

  // Data dummy 
  const facilitiesData = [
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan1.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan2.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan3.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan4.jpg' },
  ];
  
  const specialistsData = [
    { title: 'Spesialis Kelamin', imageUrl: '/images/spesialis3.jpg' }, 
    { title: 'Spesialis Anak & Tumbuh Kembang', imageUrl: '/images/spesialis4.jpg' }, 
    { title: 'Spesialis Bedah Umum', imageUrl: '/images/spesialis1.jpg' }, 
    { title: 'Spesialis Mata', imageUrl: '/images/spesialis2.jpg' }, 
  ];

  const doctorsData = [
    { name: 'Ryan Love Andris', imageUrl: '/images/doctor1.jpg' },
    { name: 'Ryan Love Andris', imageUrl: '/images/doctor2.jpg' },
    { name: 'Ryan Love Andris', imageUrl: '/images/doctor3.jpg' },
    { name: 'Ryan Love Andris', imageUrl: '/images/doctor4.jpg' },
    { name: 'Ryan Love Andris', imageUrl: '/images/doctor5.jpg' },
  ];

  const renderContent = () => {
    const dataToShow = activeTab === 'fasilitas' ? facilitiesData : specialistsData;

    return (
      <div className="health-service-grid">
        {dataToShow.map((item, index) => (
          <FacilityCard 
            key={index} 
            title={item.title} 
            imageUrl={item.imageUrl} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          {/* Gambar diatur via CSS background: url('/images/doctor-slider.jpg') */}
        </div>
      </section>

      {/* 2. About Section */}
      <section className="about-section">
        <div className="content-wrapper about-content-inner"> 
          <div className="about-left">
            <div className="experience-tag">10+ Years Experience</div>
            
            <div className="about-images-split">
              <div className="split-card top-split-card">
                <img src="/images/doctor-therapist.jpg" alt="Doctor Consultation" />
              </div>
              <div className="split-card bottom-split-card">
                <img src="/images/child-exam.jpg" alt="Child examination" />
              </div>
            </div>
          </div>
          <div className="about-right">
            <h2 className="section-title-large">Ayo peduli kesehatan</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Curabitur pretium tincidunt lacus. Nulla facilisi. Aliquam elementum tristique massa vel semper. Nullam vel libero sapien. Nulla vitae facilisis tellus. Aliquam elementum tristique massa vel semper. Nullam vel libero sapien. Nulla vitae facilisis tellus.</p>
          </div>
        </div>
      </section>

      {/* 3. Health Service Section*/}
      <section className="health-service-section">
        <div className="content-wrapper">
          <h2 className="section-title-medium">Layanan Kesehatan di rumah sakit tobot</h2>
          <p className="section-subtitle">kami hadir untuk melayani anda dengan sepenuh hati</p>
        </div>
          
        <div className="tab-buttons">
          <button 
            className={`tab-button facility-button-style ${activeTab === 'fasilitas' ? 'active' : ''}`}
            onClick={() => setActiveTab('fasilitas')}
          >
            Fasilitas
          </button>
          <button 
            className={`tab-button specialist-button-style ${activeTab === 'spesialis' ? 'active' : ''}`}
            onClick={() => setActiveTab('spesialis')}
          >
            Spesialis
          </button>
        </div>

        {renderContent()} 
      </section>

      {/* 4. Doctor List Section  */}
      <section className="doctor-list-section">
        <div className="content-wrapper">
            <h2 className="section-title-medium">Daftar Dokter Keren di Rumah Sakit Tobot</h2>
        </div>
        <div className="doctor-list-grid">
          {doctorsData.map((doctor, index) => (
            <DoctorCard 
              key={index} 
              name={doctor.name} 
              imageUrl={doctor.imageUrl} 
            />
          ))}
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;