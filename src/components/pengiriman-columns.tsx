"use client"

import { MoreHorizontal } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { Shipment } from "@/lib/data"
import { Badge } from "@/components/ui/badge" // Sesuaikan path import
import { Button } from "@/components/ui/button" // Sesuaikan path import
import { Checkbox } from "@/components/ui/checkbox" // Sesuaikan path import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // Sesuaikan path import


// Fungsi helper untuk varian badge
const getStatusBadge = (status: "BARU" | "DI JALAN" | "TERKIRIM") => {
  switch (status) {
    case "TERKIRIM":
      return <Badge variant="default" className="bg-green-600">TERKIRIM</Badge>
    case "DI JALAN":
      return <Badge variant="secondary">DI JALAN</Badge>
    case "BARU":
      return <Badge variant="outline" className="border-red-500 text-red-500">BARU</Badge>
    default:
      return <Badge variant="outline">UNKNOWN</Badge>
  }
}

export const columns: Array<ColumnDef<Shipment>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "resi",
    header: "No. Resi",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "barang",
    header: "Barang",
  },
  {
    accessorKey: "tanggalKirim",
    header: "Tgl. Kirim",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(shipment.resi)}
            >
              Salin No. Resi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuItem>Edit Pengiriman</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]