"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DoubleArrowDownBoldIcon, DoubleArrowUpBoldIcon, CalendarIcon } from "./ui/icons"
import { HeadingChartSection } from "./ui/typographys"
import { useCallback, useState } from "react"
import { mockTopProducts } from "@/lib/data"

export default function TopProductSection() {
  const [topProducts, setTopProducts] = useState(mockTopProducts)

  const handleValueChange = useCallback((value: string) => {
    if (!value) return

    if (value == "empty") {
      setTopProducts(pre => {
        return pre.map(product => ({
          ...product,
          count: 0,
          name: "chưa có  mặt hàng",
        }))
      })
    } else {
      setTopProducts(mockTopProducts)
    }
  }, [])

  return (
    <div>
      <div className="mt-6 flex items-center justify-between">
        <HeadingChartSection title="Top sản phẩm sản xuất nhiều nhất" />
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
            <CalendarIcon />
            <SelectValue placeholder="Tháng này" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Tháng 3</SelectItem>
            <SelectItem value="2">Tháng 2</SelectItem>
            <SelectItem value="empty">No Data</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4">
        {topProducts.map(product => {
          return <TopProductSectionCard key={product.id} {...product} />
        })}
      </div>
    </div>
  )
}

interface TopProductSectionCardProps {
  count: number
  name: string
  change: number
  trend: string | "up" | "down"
}

function TopProductSectionCard(product: TopProductSectionCardProps) {
  return (
    <div className="shadow-card rounded-xl">
      <div className="bg-card p-4 text-card-foreground shadow-card-wide rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-light-blue">{product.count}</span>
          {product.count > 0 && (
            <span className="flex items-center text-sm font-medium text-neutral-05 leading-10">
              <span className="mr-1 inline-block">
                {product.trend === "up" ? <DoubleArrowUpBoldIcon /> : <DoubleArrowDownBoldIcon />}
              </span>
              {product.change}%
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-07 font-medium">{product.name}</p>
      </div>
    </div>
  )
}
