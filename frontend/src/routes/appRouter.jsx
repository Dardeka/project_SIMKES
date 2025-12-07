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
                <Route path="/adminspesialis" element={<AdminSpesialis />} />
                <Route path="/admindaftarakun" element={<AdminDaftarAkun />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;