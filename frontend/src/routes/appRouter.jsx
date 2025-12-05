import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CariDokter from '../pages/cariDokter';
import Dashboard from '../pages/Dashboard';
import Fasilitas from '../pages/Fasilitas';
import DetailDokter from '../pages/detailDokter';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fasilitas" element={<Fasilitas />} />
                <Route path="/cariDokter" element={<CariDokter />} />
                <Route path="/detailDokter" element={<DetailDokter />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;