// Fasilitas.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Fasilitas.css';

// Komponen Kartu Fasilitas Lainnya
const FacilityCard = ({ title, imageUrl }) => (
  <div className="facility-card-small">
    <img src={imageUrl} alt={title} className="facility-image-small" />
    <p className="facility-title-small">{title}</p>
  </div>
);

const Fasilitas = () => {
  // Data dummy
  const relatedFacilities = [
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan1.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan2.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan3.jpg' },
    { title: 'DSA (Digital Subtraction Angiography)', imageUrl: '/images/layanan4.jpg' },
  ];

  return (
    <div className="fasilitas-page">
      <Navbar />

      <main className="fasilitas-content">

        {/* Hero Image */}
        <section className="facility-main-image">
          <img
            src="/images/layanan3.jpg"
            alt="DSA Facility Main Image"
            className="main-facility-photo"
          />
        </section>

        {/* Konten Terpusat */}
        <div className="centered-content">

          {/* Judul */}
          <section className="facility-header-section">
            <h1 className="facility-title-large">
              DSA (Digital Subtraction Angiography)
            </h1>
          </section>

          {/* Deskripsi */}
          <section className="facility-description-section">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Curabitur pretium tincidunt lacus. Nulla facilisi. Aliquam porttitor porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vel justo. Curabitur vel metus. Proin in tellus eu lectus porttitor interdum.
            </p>
          </section>

          {/* Fasilitas Lainnya */}
          <section className="facility-related-section">
            <h2 className="facility-related-title">
              Lihat Fasilitas Lainnya di Rumah Sakit Tobot
            </h2>

            <div className="facility-related-grid">
              {relatedFacilities.map((facility, index) => (
                <FacilityCard
                  key={index}
                  title={facility.title}
                  imageUrl={facility.imageUrl}
                />
              ))}
            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Fasilitas;
