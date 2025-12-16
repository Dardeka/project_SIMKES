import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const Fasilitas = () => {
    const { state } = useLocation();
    const navigate = useNavigate(); // Inisialisasi useNavigate
    
    // Gunakan optional chaining untuk memastikan state.facility ada
    const facility = state?.facility; 
    const [facilities, setFacilities] = useState([]);

    // Jika facility tidak ada (misalnya, diakses langsung tanpa state), 
    // kita bisa tampilkan pesan error atau redirect.
    // Untuk tujuan ini, kita asumsikan facility selalu ada.

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                // Catatan: endpoint ini mengambil SEMUA fasilitas, termasuk fasilitas yang sedang ditampilkan.
                const res = await fetch('http://localhost:3001/api/admin/getAllFacilities');
                const data = await res.json();
                setFacilities(data);
            } catch (error) {
                console.log({ error: error.message });
            }
        };
        fetchFacilities();
    }, []);

    // Fungsi untuk navigasi ke detail fasilitas lain
    const handleFacilityClick = (item) => {
        // Navigasi ke path halaman Fasilitas saat ini ('/fasilitas' atau path apapun)
        // dan kirim data fasilitas yang dipilih sebagai state
        navigate(window.location.pathname, { state: { facility: item } });
        
        // Opsional: Gulir ke atas setelah navigasi
        window.scrollTo(0, 0); 
    };

    if (!facility) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pt-30 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                    <p className="text-xl text-red-600">Fasilitas tidak ditemukan. Silakan kembali ke halaman utama.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-30 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        {facility.nama}
                    </h1>

                    {/* Main Image */}
                    <div className="mb-10 shadow-xl rounded-lg overflow-hidden">
                        <div className="w-full h-[420px] md:h-[500px]">
                            <img
                                src={`http://localhost:3001${facility.gambar}`}
                                alt={facility.nama}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-16">
                        <p className="text-gray-600 leading-relaxed">
                            {facility.deskripsi}
                        </p>
                    </div>

                    {/* Related Facilities */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Lihat Fasilitas Lainnya di Rumah Sakit Rawamangun
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {facilities
                            .filter(item => item._id !== facility._id) // Filter fasilitas yang sedang ditampilkan
                            .map(item => (
                                // START: PERUBAHAN DI SINI
                                <div
                                    key={item._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-lg transition duration-300"
                                    onClick={() => handleFacilityClick(item)} // Menambahkan event handler onClick
                                >
                                    <div className="h-40 w-full overflow-hidden">
                                        <img
                                            src={`http://localhost:3001${item.gambar}`}
                                            alt={item.nama}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-3 text-center">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {item.nama}
                                        </p>
                                    </div>
                                </div>
                                // END: PERUBAHAN DI SINI
                            ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Fasilitas;