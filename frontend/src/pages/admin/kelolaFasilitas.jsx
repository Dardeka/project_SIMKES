import CustomSidebar from "../../components/adminCustomSidebar";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KelolaFasilitas() {
    const navigate = useNavigate();
    const [facilities, setFacilities] = useState([]);
    const [facilityImage, setFacilityImage] = useState(null);

    useEffect(() => {
        const facilitiesData = async () => {
            await fetch('http://localhost:3001/api/admin/getAllFacilities')
            .then(response => response.json())
            .then(data => {
                console.log('Facilities Data:', data);
                setFacilities(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
        facilitiesData();
    }, []);

    const initialValues = {
        namaFasilitas: '',
        deskripsiFasilitas: '',
        gambarFasilitas: facilityImage || null,
    };

    const submitFacilityForm = async (values) => {
        const formData = new FormData();
        formData.append('namaFasilitas', values.namaFasilitas);
        formData.append('deskripsiFasilitas', values.deskripsiFasilitas);
        if(facilityImage){
            formData.append('gambarFasilitas', facilityImage);
        }

        await fetch('http://localhost:3001/api/admin/addFacility', {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Fasilitas berhasil ditambahkan!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        navigate('/admin/kelolaFasilitas');
    }

    return(
        <div className="flex">
            <CustomSidebar/>
            <div className="flex flex-col mt-[64px] mx-auto">
                <p className="text-2xl font-bold text-center">Kelola Fasilitas</p>
                <Dialog>
                    <DialogTrigger className="w-[200px] ml-auto mt-[52px] !bg-red-500 p-2 text-white font-semibold rounded-[12px] hover:!bg-red-700">Tambah Fasilitas</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Tambah Fasilitas</DialogTitle>
                        <DialogDescription>
                            Silakan isi form di bawah untuk menambahkan fasilitas baru.
                        </DialogDescription>
                        </DialogHeader>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={submitFacilityForm}
                        >
                            <Form className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaFasilitas" className="font-medium">Nama Fasilitas</label>
                                    <Field id="namaFasilitas" name="namaFasilitas" placeholder="Masukkan nama fasilitas" className="border border-gray-300 rounded-md p-2"/>
                                    <ErrorMessage name="namaFasilitas" className='text-white' component="span"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deskripsiFasilitas" className="font-medium">Deskripsi Fasilitas</label>
                                    <Field type="text" id="deskripsiFasilitas" name="deskripsiFasilitas" className="border border-gray-300 rounded-md p-2"/>
                                    <ErrorMessage name="deskripsiFasilitas" className='text-white' component="span"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="gambarFasilitas" className="font-medium">Gambar Fasilitas</label>
                                    <input type="file" id="gambarFasilitas" name="gambarFasilitas" className="border border-gray-300 rounded-md p-2" onChange={(e) => setFacilityImage(e.target.files[0])}/>
                                    <ErrorMessage name="gambarFasilitas" className='text-white' component="span"/>
                                </div>
                                <Button type="submit" className="!bg-red-500 hover:!bg-red-700 text-white font-semibold rounded-[12px] mt-4">Simpan</Button>
                            </Form>
                        </Formik>
                    </DialogContent>
                </Dialog>
                <Table className="mt-[47px] w-[800px] rounded-t-[12px] shadow-xl border-black">
                    <TableHeader className="bg-[#04998E]">
                        <TableRow>
                            <TableHead className="w-20% text-white">ID</TableHead>
                            <TableHead className="text-white w-40%">Gambar</TableHead>
                            <TableHead className="text-white w-20%">Nama Fasilitas</TableHead>
                            <TableHead className="text-center text-white w-20%">Deskripsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {facilities.map((facility) => (
                            <TableRow key={facility._id}>
                                <TableCell className="font-medium w-20%">{facility._id}</TableCell>
                                <TableCell className="w-40%"><img src={`http://localhost:3001${facility.gambar}`} alt=""/></TableCell>
                                <TableCell className="w-20%">{facility.nama}</TableCell>
                                <TableCell className="text-center w-20%">{facility.deskripsi}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default KelolaFasilitas;