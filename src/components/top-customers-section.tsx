"use client"
import { useCallback, useMemo, useState } from "react"
import { HeadingChartSection } from "./ui/typographys"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "@/components/ui/chart"
import { CalendarIcon } from "lucide-react"
import { mockTopCustomers } from "@/lib/data"
import type { TopCustomer } from "@/lib/types"
import { generateTickForBarChart } from "@/lib/utils"

export default function TopCustomersSection() {
  const [topCustomers, setTopCustomers] = useState(mockTopCustomers)

  const handleValueChange = useCallback((value: string) => {
    if (!value) return
    if (value == "empty") {
      setTopCustomers(pre => pre.map(customer => ({ ...customer, name: "-", value: 0 })))
    } else {
      setTopCustomers(mockTopCustomers)
    }
  }, [])

  return (
    <div className="shadow-card rounded-xl mt-6">
      <div className="shadow-card-wide rounded-xl pl-6 pr-4 h-full">
        <div className="flex items-center justify-between h-[88px]">
          <HeadingChartSection title="Top 5 khách hàng có sản lượng nhiều nhất" />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
              <CalendarIcon />
              <SelectValue placeholder="Năm này" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Năm 2024</SelectItem>
              <SelectItem value="2">Năm 2023</SelectItem>
              <SelectItem value="empty">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TopCustomerChart data={topCustomers} />
      </div>
    </div>
  )
}

interface TopCustomerChartProps {
  data: TopCustomer[]
}
function TopCustomerChart({ data }: TopCustomerChartProps) {
  const ticksOfChart = useMemo(() => {
    if (!data) return
    let maxTick = data[0].value
    for (const customer of data) {
      if (maxTick < customer.value) maxTick = customer.value
    }
    const tickGap = 800
    const numOfTick = 4
    const ticks = generateTickForBarChart(maxTick, tickGap, numOfTick)

    return ticks
  }, [data])

  return (
    <div className="h-[336px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
          <XAxis
            type="number"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax + 500"]}
            tickFormatter={value => `${value}`}
            ticks={ticksOfChart}
          />
          <YAxis
            style={{ lineHeight: "1.2" }}
            type="category"
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={120}
            tickFormatter={value => {
              // Split company name and location into two lines
              const parts = value.split(" ")
              if (parts.length > 3) {
                const firstPart = parts.slice(0, -1).join(" ")
                const lastPart = parts[parts.length - 1]
                return `${firstPart}\n${lastPart}`
              }
              return value
            }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Khách hàng:</span>
                      </div>
                      <div className="text-xs">{payload[0].payload.name}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Sản lượng:</span>
                      </div>
                      <div className="text-xs font-medium">{payload[0].value}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" fill="var(--color-light-blue)" radius={[0, 4, 4, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
