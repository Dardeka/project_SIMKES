import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CariDokter from '../pages/cariDokter';
import Dashboard from '../pages/Dashboard';
import Fasilitas from '../pages/Fasilitas';
import DetailDokter from '../pages/detailDokter';
import Spesialis from '../pages/Spesialis';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminSpesialis from '../pages/admin/AdminSpesialis';  
import AdminDaftarAkun from '../pages/admin/AdminDaftarAkun';
import DashboardAdm from '../pages/admin/DashboardAdm';
import KelolaFasilitas from '../pages/admin/kelolaFasilitas';
import KelolaAkunDokter from '../pages/admin/kelolaDokter';
import DokterProfile from '../pages/dokter/DokterProfile';
import DaftarPasien from '../pages/dokter/DaftarPasien';
import UserProfile from '../pages/UserProfile'; 
import ConsultationHistory from '../pages/ConsultationHistory';
import DashboardDokter from '../pages/dokter/DashboardDokter';
import FasilitasUtama from '../pages/FasilitasUtama';

import LoginDokter from '../pages/LoginDokter';
import LoginAdmin from '../pages/LoginAdmin';


function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path="/login-dokter" element={<LoginDokter />} />
                <Route path="/login-admin" element={<LoginAdmin />} />

                <Route path="/" element={<Dashboard />} />
                <Route path="/fasilitas" element={<Fasilitas />} />
                <Route path="/cariDokter" element={<CariDokter />} />
                <Route path="/detailDokter" element={<DetailDokter />} />
                <Route path="/spesialis" element={<Spesialis />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profil" element={<UserProfile />} />
                <Route path="/riwayatKonsultasi" element={<ConsultationHistory />} />
                <Route path="/fasilitasutama" element={<FasilitasUtama />} />

                {/* Dokter */}
                <Route path="/dokter/profil" element={<DokterProfile />} />
                <Route path="/dokter/daftarPasien" element={<DaftarPasien />} />
                <Route path="/dokter/dashboardDokter" element={<DashboardDokter />} />

                {/* Admin */}
                <Route path="/admin/" element={<DashboardAdm />} />
                <Route path="/admin/kelolaFasilitas" element={<KelolaFasilitas />} />
                <Route path="/admin/kelolaDokter" element={<KelolaAkunDokter />} />
                <Route path="/admin/spesialis" element={<AdminSpesialis />} />
                <Route path="/admin/daftarakun" element={<AdminDaftarAkun />} />
               
            </Routes>
        </Router>
    )
}

export default AppRouter;