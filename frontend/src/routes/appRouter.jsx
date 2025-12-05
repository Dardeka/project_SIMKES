import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CariDokter from '../pages/cariDokter';
import Dashboard from '../pages/Dashboard';
import Fasilitas from '../pages/Fasilitas';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fasilitas" element={<Fasilitas />} />
                <Route alias="cari-dokter" path="/cari-dokter" element={<CariDokter />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;