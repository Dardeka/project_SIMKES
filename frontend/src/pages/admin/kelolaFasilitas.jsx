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

function KelolaFasilitas() {
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
                        <Formik>
                            <Form className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="namaFasilitas" className="font-medium">Nama Fasilitas</label>
                                    <Field id="namaFasilitas" name="namaFasilitas" placeholder="Masukkan nama fasilitas" className="border border-gray-300 rounded-md p-2"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="gambarFasilitas" className="font-medium">Deskripsi Fasilitas</label>
                                    <input type="text" id="gambarFasilitas" name="gambarFasilitas" className="border border-gray-300 rounded-md p-2"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="gambarFasilitas" className="font-medium">Gambar Fasilitas</label>
                                    <input type="file" id="gambarFasilitas" name="gambarFasilitas" className="border border-gray-300 rounded-md p-2"/>
                                </div>
                                <Button type="submit" className="!bg-red-500 hover:!bg-red-700 text-white font-semibold rounded-[12px] mt-4">Simpan</Button>
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

export default KelolaFasilitas;