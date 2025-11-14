"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner" // Untuk notifikasi
import type { z } from "zod"

// --- Impor Komponen UI ---
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Impor Skema & Data ---
import { shipmentSchema, ptCvList } from "@/lib/data" // Impor skema & daftar PT

// Tipe untuk data form kita, berdasarkan skema Zod
type ShipmentFormValues = z.infer<typeof shipmentSchema>

export function FormTambahPengiriman() {
  // 1. State untuk mengontrol Sheet (buka/tutup)
  const [isOpen, setIsOpen] = React.useState(false)

  // 2. State untuk notifikasi Toast (sudah deprecated)
  // const { Toaster } = useToast()

  // 3. Setup React Hook Form
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    // Tentukan nilai default (penting untuk RHF)
    defaultValues: {
      id: "", // Kita akan generate ini saat submit
      resi: "",
      barang: "",
      tanggalKirim: "",
      namaPTCV: "PT. Maju Jaya", // Bisa set default dari list
      alamatPelanggan: "",
      alamatPTCV: "",
      alamatTujuan: "",
      pic: "",
      berat: 0,
    },
  })

  // 4. Fungsi yang dipanggil saat form disubmit & valid
  function onSubmit(data: ShipmentFormValues) {
    // Di dunia nyata, Anda akan memanggil API di sini

    // Kita tambahkan ID palsu untuk demo
    const dataBaru = {
      ...data,
      id: `P-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    }

    console.log("Form sukses disubmit:", dataBaru)

    // Tampilkan notifikasi sukses
    toast("Sukses!", {
      description: "Data pengiriman baru telah berhasil disimpan.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })

    // Tutup sheet setelah sukses
    setIsOpen(false)

    // Reset form ke default
    form.reset()
  }

  return (
    // Kontrol Sheet menggunakan state 'isOpen'
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Tambah Pengiriman Baru</Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tambah Pengiriman Baru</SheetTitle>
          <SheetDescription>
            Isi detail pengiriman di bawah ini. Klik 'Simpan' setelah selesai.
          </SheetDescription>
        </SheetHeader>

        {/* Bungkus semuanya dengan <Form> dari RHF.
          Kita gunakan form.handleSubmit untuk memvalidasi
          dan memanggil onSubmit kita.
        */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">

            {/* 1. Field Resi (Contoh Input Teks) */}
            <FormField
              control={form.control}
              name="resi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Resi</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: JNE-12345" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Tampilkan error validasi di sini */}
                </FormItem>
              )}
            />

            {/* 2. Field Barang (Contoh Input Teks) */}
            <FormField
              control={form.control}
              name="barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barang</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Spare Part" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Field Nama PT/CV (Contoh Select) (akan menintregasi alamatPTCV pada saat memilih PT/CV) */}
            <FormField
              control={form.control}
              name="namaPTCV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama PT/CV</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih PT/CV" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ptCvList.map((namaPT) => (
                        <SelectItem key={namaPT} value={namaPT}>
                          {namaPT}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alamat Pelanggan */}
            <FormField
              control={form.control}
              name="alamatPelanggan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Pelanggan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Jl. Melati No. 12, Jakarta" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Tampilkan error validasi di sini */}
                </FormItem>
              )}
            />

            {/* Alamat Tujuan */}
            <FormField
              control={form.control}
              name="alamatTujuan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Pelanggan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Jl. Industri No. 88, Bekasi" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Tampilkan error validasi di sini */}
                </FormItem>
              )}
            />

            {/* PIC */}
            <FormField
              control={form.control}
              name="pic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIC</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama orang disini" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Tampilkan error validasi di sini */}
                </FormItem>
              )}
            />

            {/* 4. Field Tanggal Kirim (Contoh Input Date) */}
            <FormField
              control={form.control}
              name="tanggalKirim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tgl. Kirim</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. Field Berat (Contoh Input Number) */}
            <FormField
              control={form.control}
              name="berat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat (KG)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      // Ubah string dari input kembali ke number untuk RHF/Zod
                      onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Tambahkan sisa FormField untuk:
              - alamatPelanggan
              - alamatPTCV (akan terintegrasi pada saat memilih PT/CV)
              - alamatTujuan
              - pic

              Gunakan pola yang sama seperti 'resi' atau 'barang'.
            */}

            <SheetFooter className={"p-0"}>
              {/* Tombol Batal manual, kita panggil setIsOpen */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              {/* Tombol Submit akan memicu RHF */}
              <Button type="submit">Simpan Pengiriman</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}