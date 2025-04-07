"use client"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "./ui/table"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "./ui/select"
import { HeadingChartSection } from "./ui/typographys"
import { CalendarIcon } from "./ui/icons"
import { useCallback, useState } from "react"
import Image from "next/image"
import { mockMaterials } from "@/lib/data"

export default function MaterialsNeededTable() {
  const [materials, setMaterials] = useState(mockMaterials)
  // Mock data for materials needed
  const handleValueChange = useCallback((value: string) => {
    if (!value) return
    if (value == "empty") {
      setMaterials([])
    } else {
      setMaterials(mockMaterials)
    }
  }, [])

  return (
    <div className="shadow-card rounded-xl mt-6">
      <div className="shadow-card-wide rounded-lg h-full">
        <div className="flex items-center justify-between h-[88px] pl-6 pr-4 gap-2">
          <HeadingChartSection title="Nguyên vật liệu cần mua" />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
              <CalendarIcon />
              <SelectValue placeholder="Tuần này" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Tuần Trước</SelectItem>
              <SelectItem value="empty">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table className="px">
          <TableHeader className="h-[48px] bg-[#F3F3F4]">
            <TableRow className="text-neutral-04 text-xs">
              <TableHead className="w-12">STT</TableHead>
              <TableHead>Nguyên vật liệu</TableHead>
              <TableHead>Đơn vị tính</TableHead>
              <TableHead className="text-right">Số lượng</TableHead>
            </TableRow>
          </TableHeader>
          {materials.length > 0 && (
            <TableBody>
              {materials.map(material => (
                <TableRow className="h-[90px] text-center text-neutral-07 font-bold text-sm" key={material.id}>
                  <TableCell>{material.stt}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8">
                        <Image src={material.picture} alt={material.name} width={40} height={40} />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <div>{material.name}</div>
                        <div className="text-xs text-neutral-03 font-medium">(None)</div>
                        <div className="text-xs text-light-blue font-medium">{material.code}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{material.unit}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!materials.length && (
          <div className="flex flex-col justify-center items-center  py-6">
            <Image src="/images/ic-content.png" width={250} height={250} alt="empty state" />
            <p className="text-neutral-04 text-2xl font-medium leading-10">Chưa có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  )
}
