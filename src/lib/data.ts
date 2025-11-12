import { z } from "zod"

// Definisikan skema untuk validasi data pengiriman
export const shipmentSchema = z.object({
  id: z.string(),
  resi: z.string(),
  customer: z.string(),
  barang: z.string(),
  tanggalKirim: z.string(),
  status: z.enum(["BARU", "DI JALAN", "TERKIRIM"]),
})

export type Shipment = z.infer<typeof shipmentSchema>

// Data dummy
export const dummyData: Array<Shipment> = [
  {
    id: "P-001",
    resi: "JNE-1234567",
    customer: "PT. Maju Jaya",
    barang: "Spare Part Excavator",
    tanggalKirim: "2025-11-10",
    status: "DI JALAN",
  },
  {
    id: "P-002",
    resi: "SICEPAT-98765",
    customer: "CV. Abadi Sentosa",
    barang: "Dokumen Penting",
    tanggalKirim: "2025-11-11",
    status: "BARU",
  },
  {
    id: "P-003",
    resi: "ANTERAJA-55511",
    customer: "PT. Bina Pertiwi",
    barang: "Komponen Mesin",
    tanggalKirim: "2025-11-09",
    status: "TERKIRIM",
  },
  {
    id: "P-004",
    resi: "KG-LOG-44321",
    customer: "Perorangan - Bpk. Budi",
    barang: "Alat Tulis Kantor",
    tanggalKirim: "2025-11-12",
    status: "BARU",
  },{
    id: "P-001",
    resi: "JNE-1234567",
    customer: "PT. Maju Jaya",
    barang: "Spare Part Excavator",
    tanggalKirim: "2025-11-10",
    status: "DI JALAN",
  },
  {
    id: "P-002",
    resi: "SICEPAT-98765",
    customer: "CV. Abadi Sentosa",
    barang: "Dokumen Penting",
    tanggalKirim: "2025-11-11",
    status: "BARU",
  },
  {
    id: "P-003",
    resi: "ANTERAJA-55511",
    customer: "PT. Bina Pertiwi",
    barang: "Komponen Mesin",
    tanggalKirim: "2025-11-09",
    status: "TERKIRIM",
  },
  {
    id: "P-004",
    resi: "KG-LOG-44321",
    customer: "Perorangan - Bpk. Budi",
    barang: "Alat Tulis Kantor",
    tanggalKirim: "2025-11-12",
    status: "BARU",
  },
]