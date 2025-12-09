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
import { Formik, Form, Field } from 'formik';

function KelolaAkunDokter() {
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
                        <Formik>
                            <Form className="flex flex-row gap-4 mt-4">
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="gambarFasilitas" className="font-medium">Foto Profil</label>
                                        <input type="file" id="gambarFasilitas" name="gambarFasilitas" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="namaDokter" className="font-medium">Nama Lengkap Dokter</label>
                                        <Field id="namaDokter" name="namaDokter" placeholder="Masukkan nama dokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="usernameDokter" className="font-medium">Username</label>
                                        <Field id="usernameDokter" name="usernameDokter" placeholder="Masukkan username dokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pendidikanDokter" className="font-medium">Pendidikan</label>
                                        <Field id="pendidikanDokter" name="pendidikanDokter" placeholder="Masukkan pendidikan dokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pengalamanDokter" className="font-medium">Pengalaman</label>
                                        <Field id="pengalamanDokter" name="pengalamanDokter" placeholder="Masukkan pengalaman dokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="spesialisDokter" className="font-medium">Spesialis</label>
                                        <Field type="text" id="spesialisDokter" name="spesialisDokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="emailDokter" className="font-medium">Email</label>
                                        <Field type="email" id="emailDokter" name="emailDokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="passwordDokter" className="font-medium">Password</label>
                                        <Field type="password" id="passwordDokter" name="passwordDokter" className="border border-gray-300 rounded-md p-2"/>
                                    </div>
                                    <Button type="submit" className="w-[100px] ml-auto !bg-red-500 hover:!bg-red-700 text-white font-semibold rounded-[12px] mt-4">Simpan</Button>
                                </div>
                            </Form>
                        </Formik>
                    </DialogContent>
                </Dialog>
                <Table className="mt-[47px] w-[800px] rounded-t-[12px] shadow-xl border-black">
                    <TableHeader className="bg-[#04998E]">
                        <TableRow>
                            <TableHead className="w-[100px] text-white">ID</TableHead>
                            <TableHead className="text-white">Gambar</TableHead>
                            <TableHead className="text-white">Nama Fasilitas</TableHead>
                            <TableHead className="text-right text-white">Atur</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default KelolaAkunDokter;