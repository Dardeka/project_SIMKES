import CustomSidebar from "../../components/customSidebar";
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
import { useEffect, useState } from "react";

function KelolaAkunDokter() {
    const [doctorData, setDoctorData] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            // Fetch doctor data from API
            const response = await fetch('http://localhost:3001/api/admin/allData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accessToken': sessionStorage.getItem('accessToken'),
                },
            });
            const data = await response.json();
            setDoctorData(data);
        }

        
        fetchDoctorData();
    }, []);
    
    const initialValues = {
        namaDokter: '',
        jenisKelamin: '',
        pendidikanDokter: '',
        pengalamanDokter: '',
        spesialisDokter: '',
        emailDokter: '',
        passwordDokter: '',
        gambarDokter: profilePicture ||null,
    };

    const addDoctorData = async (doctor) => {
        const newData = new FormData();
        if(profilePicture){
            newData.append('gambarDokter', profilePicture);
        }
        newData.append('namaDokter', doctor.namaDokter);
        newData.append('jenisKelamin', doctor.jenisKelamin);
        newData.append('pendidikanDokter', doctor.pendidikanDokter);
        newData.append('pengalamanDokter', doctor.pengalamanDokter);
        newData.append('spesialisDokter', doctor.spesialisDokter);
        newData.append('emailDokter', doctor.emailDokter);
        newData.append('passwordDokter', doctor.passwordDokter);

        const response = await fetch('http://localhost:3001/api/admin/addDoctor', {
            method: 'POST',
            body: newData,
        }).then(alert("Dokter berhasil ditambahkan!"));
        const data = await response.json();
        console.log('Add doctor response:', data);
        // Optionally handle response data
    }


    return(
        <div className="flex">
            <CustomSidebar/>
            <div className="flex flex-col mt-[64px] mx-auto">
                <p className="text-2xl font-bold text-center">Kelola Akun Dokter</p>
                <Dialog>
                    <DialogTrigger className="w-[200px] ml-auto mt-[52px] !bg-red-500 p-2 text-white font-semibold rounded-[12px] hover:!bg-red-700">Tambah Akun Dokter</DialogTrigger>
                    <DialogContent className="lg:max-w-3xl">
                        <DialogHeader>
                        <DialogTitle>Tambah Akun Dokter</DialogTitle>
                        <DialogDescription>
                            Silakan isi form di bawah untuk menambahkan dokter baru.
                        </DialogDescription>
                        </DialogHeader>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={addDoctorData}
                        >
                            <Form className="flex flex-row gap-4 mt-4">
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="gambarDokter" className="font-medium">Foto Profil</label>
                                        <input type="file" id="gambarDokter" name="gambarDokter" className="border border-gray-300 rounded-md p-2" onChange={(e) => setProfilePicture(e.target.files[0])} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="namaDokter" className="font-medium">Nama Lengkap Dokter</label>
                                        <Field id="namaDokter" name="namaDokter" placeholder="Masukkan nama dokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="namaDokter" className='text-white' component="span"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="jenisKelamin" className="font-medium">Jenis Kelamin</label>
                                        <Field id="jenisKelamin" name="jenisKelamin" placeholder="Masukkan jenis kelamin dokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="jenisKelamin" className='text-white' component="span"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pendidikanDokter" className="font-medium">Pendidikan</label>
                                        <Field id="pendidikanDokter" name="pendidikanDokter" placeholder="Masukkan pendidikan dokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="pendidikanDokter" className='text-white' component="span"/>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pengalamanDokter" className="font-medium">Pengalaman</label>
                                        <Field id="pengalamanDokter" name="pengalamanDokter" placeholder="Masukkan pengalaman dokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="pengalamanDokter" className='text-white' component="span"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="spesialisDokter" className="font-medium">Spesialis</label>
                                        <Field type="text" id="spesialisDokter" name="spesialisDokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="spesialisDokter" className='text-white' component="span"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="emailDokter" className="font-medium">Email</label>
                                        <Field type="email" id="emailDokter" name="emailDokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="emailDokter" className='text-white' component="span"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="passwordDokter" className="font-medium">Password</label>
                                        <Field type="password" id="passwordDokter" name="passwordDokter" className="border border-gray-300 rounded-md p-2"/>
                                        <ErrorMessage name="passwordDokter" className='text-white' component="span"/>
                                    </div>
                                    <Button type="submit" className="w-[100px] ml-auto !bg-red-500 hover:!bg-red-700 text-white font-semibold rounded-[12px] mt-4">Simpan</Button>
                                </div>
                            </Form>
                        </Formik>
                    </DialogContent>
                </Dialog>
                <Table className="mt-[47px] w-[900px] rounded-t-[12px] shadow-xl border-black">
                    <TableHeader className="bg-[#04998E]">
                        <TableRow>
                            <TableHead className="text-center w-10% text-white">ID</TableHead>
                            <TableHead className="text-center w-20% text-white">Nama Dokter</TableHead>
                            <TableHead className="text-center w-20% text-white">Spesialis</TableHead>
                            <TableHead className="text-center w-30% text-white">Akun</TableHead>
                            <TableHead className="text-center w-20% text-white">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctorData.map((doctor) => (
                            <TableRow key={doctor._id}>
                                <TableCell className="font-xs w-10%">{doctor._id}</TableCell>
                                <TableCell className="w-20%">{doctor.namaLengkap}</TableCell>
                                <TableCell className="w-20%">{doctor.spesialis}</TableCell>
                                <TableCell className="text-start w-20%">
                                    <div className="flex flex-col">
                                        <p><b>Email :</b> {doctor.email}</p>
                                        <p><b>Password :</b> {doctor.password}</p>
                                    </div> 
                                </TableCell>
                                <TableCell className="w-20% bg-green-400 text-center font-semibold">{doctor.status}</TableCell>
                            </TableRow>
                            
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default KelolaAkunDokter;