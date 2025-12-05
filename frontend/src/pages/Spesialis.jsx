import React from 'react';
import './Spesialis.css';

const doctors = [
  { name: 'Dr. Ambolalabo, M.Kes.', title: 'Spesialis', imageUrl: 'path/to/doctor1.jpg' },
  { name: 'Dr. Ambolalabo, M.Kes.', title: 'Spesialis', imageUrl: 'path/to/doctor2.jpg' },
  { name: 'Dr. Ambolalabo, M.Kes.', title: 'Spesialis', imageUrl: 'path/to/doctor3.jpg' },
  { name: 'Dr. Ambolalabo, M.Kes.', title: 'Spesialis', imageUrl: 'path/to/doctor4.jpg' },
  { name: 'Dr. Ambolalabo, M.Kes.', title: 'Spesialis', imageUrl: 'path/to/doctor5.jpg' },
];

const hospitalServices = [
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: 'path/to/service1.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: 'path/to/service2.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: 'path/to/service3.jpg' },
  { name: 'DSA (Digital Subtraction Angiography)', imageUrl: 'path/to/service4.jpg' },
];

const Spesialis = () => {
  return (
    <div className="spesialis-page">
      {/* --- HEADER --- */}
      <header className="header-simkes">
        <div className="logo">
          <img src="path/to/simkes-logo.png" alt="SIMKES Logo" />
          <span>SIMKES</span>
          <span className="subtitle">Sistem Manajemen Pelayanan Kesehatan</span>
        </div>
        <nav className="nav-menu">
          <a href="#">Cari Dokter</a>
          <a href="#">Fasilitas</a>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <h1 className="main-title">Gastroenterologi</h1>

        <div className="hero-section">
          <div className="hero-image-container">
            {/* Ganti dengan URL/path gambar yang sesuai */}
                        <img 
              src="path/to/gastro-hero-image.jpg" 
              alt="Dokter dan Pasien" 
              className="hero-image" 
            />
          </div>
          <div className="hero-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Curabitur pretium tincidunt lacus nulla facilisi. Aenean porttitor mattis sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultricies nunc quis nulla. Quisque a sem a lorem consectetur varius ac nec. Curabitur ut metus non in tellus eu lectus partitur interdum. Nunc nonummy metus ut eros. In hac habitasse platea dictumst. Vestibulum tristique, ligula et egestas imperdiet, ipsum arcu consectetur metus, sed aliquet leo felis at justo.
            </p>
          </div>
        </div>

        {/* --- DAFTAR DOKTER --- */}
        <section className="doctor-list-section">
          <h2>Lihat Dokter Spesialis yang tersedia</h2>
          <div className="doctor-cards-container">
            {doctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <div className="doctor-image-wrapper">
                  {/* Ganti dengan URL/path gambar dokter yang sesuai */}
                  <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
                </div>
                <div className="doctor-info">
                  <p className="doctor-name">{doctor.name}</p>
                  <p className="doctor-title">{doctor.title}</p>
                  <button className="lihat-jadwal-btn">Lihat Jadwal</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- LAYANAN RUMAH SAKIT --- */}
        <section className="service-list-section">
          <h2>Lihat Spesialis Lainnya di rumah sakit tobot</h2>
          <div className="service-cards-container">
            {hospitalServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-image-wrapper">
                  {/* Ganti dengan URL/path gambar layanan yang sesuai */}
                  <img src={service.imageUrl} alt={service.name} className="service-image" />
                </div>
                <p className="service-name">{service.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="footer-simkes">
        <div className="footer-content">
          <div className="footer-about">
            <p className="footer-logo">SIMKES</p>
            <p className="footer-desc">
              Rumah sakit tobot adalah rumah sakit yang didirikan oleh bapak/ibu tobot sebagai wujud pengabdian terhadap nusa dan bangsa tobot. Mulai dari tanggal 15 Mei 1999 rumah sakit tobot sudah berdiri.
            </p>
          </div>
          <div className="footer-contact">
            <p>(+62) 1234567890</p>
            <p>Jalan Geboy Mager Nang Nang Nang</p>
          </div>
          <div className="footer-social">
            <p>Ikuti Kami</p>
            <div className="social-icons">
              {/* Tempat untuk ikon sosial media */}
              <a href="#" aria-label="Facebook">FB</a> 
              <a href="#" aria-label="YouTube">YT</a>
              <a href="#" aria-label="Instagram">IG</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Spesialis;