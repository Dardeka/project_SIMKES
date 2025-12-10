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
import KelolaFasilitas from '../pages/admin/KelolaFasilitas';
import KelolaAkunDokter from '../pages/admin/kelolaDokter';
import DokterProfile from '../pages/dokter/DokterProfile'; 
import JadwalTemu from '../pages/dokter/JadwalTemu';
import UserProfile from '../pages/UserProfile'; 
import ConsultationHistory from '../pages/ConsultationHistory';



function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fasilitas" element={<Fasilitas />} />
                <Route path="/cariDokter" element={<CariDokter />} />
                <Route path="/detailDokter" element={<DetailDokter />} />
                <Route path="/spesialis" element={<Spesialis />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin */}
                <Route path="/admin/dashboard" element={<DashboardAdm />} />
                <Route path="/admin/kelolaFasilitas" element={<KelolaFasilitas />} />
                <Route path="/admin/kelolaDokter" element={<KelolaAkunDokter />} />
                <Route path="/admin/spesialis" element={<AdminSpesialis />} />
                <Route path="/admin/daftarakun" element={<AdminDaftarAkun />} />
                <Route path="/dokterprofile" element={<DokterProfile />} />
                <Route path="/jadwaltemu" element={<JadwalTemu />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/consultationhistory" element={<ConsultationHistory />} />
               
            </Routes>
        </Router>
    )
}

export default AppRouter;