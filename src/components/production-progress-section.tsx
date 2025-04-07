"use client"
import { HeadingChartSection } from "./ui/typographys"
import { CalendarIcon } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "./ui/select"
import { useCallback, useState } from "react"
import { mockProgressProduct } from "@/lib/data"

export default function ProductionProgressSection() {
  const [progressProducts, setProgressProducts] = useState(mockProgressProduct)
  const handleValueChange = useCallback((value: string) => {
    if (!value) return
    if (value == "empty") {
      setProgressProducts(pre =>
        pre.map(product => ({
          ...product,
          name: "Chưa có mặt hàng",
          percentage: 0,
          total: 0,
          completed: 0,
        })),
      )
    } else {
      setProgressProducts(mockProgressProduct)
    }
  }, [])

  return (
    <div className="shadow-card rounded-xl mt-6">
      <div className="shadow-card-wide rounded-xl pl-6 pr-4 h-full">
        <div className="flex items-center justify-between h-[88px]">
          <HeadingChartSection title="Tiến độ sản xuất theo nhóm" />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
              <CalendarIcon />
              <SelectValue placeholder="Hoàn Thành" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Chưa hoàn thành</SelectItem>
              <SelectItem value="empty">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {progressProducts.map(item => (
            <div key={item.id} className="not-first:mt-8">
              <div className="flex justify-between items-center">
                <span className="text-primary-text font-medium leading-6 text-sm">{item.name}</span>
                {item.percentage ? (
                  <span className="text-sm">
                    <span className="text-primary-text font-medium">{item.completed} cái</span>{" "}
                    <span className="text-secondary-text">({item.percentage}%)</span>
                  </span>
                ) : null}
              </div>
              <div className="h-2 mt-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-[#1FC583] rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
