"use client"
import { useCallback, useMemo, useState } from "react"
import { HeadingChartSection } from "./ui/typographys"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "./ui/icons"
import { ResponsiveContainer, BarChart, Tooltip, XAxis, YAxis, CartesianGrid, Bar, Legend } from "@/components/ui/chart"
import { mockProductionPlans } from "@/lib/data"
import type { ProductionPlan } from "@/lib/types"
import { generateTickForBarChart } from "@/lib/utils"

export default function ProductionPlanSection() {
  const [productionPlans, setProductionPlans] = useState(mockProductionPlans)

  const handleValueChange = useCallback((value: string) => {
    if (!value) return

    if (value == "empty") {
      setProductionPlans(pre =>
        pre.map(product => ({
          ...product,
          name: "-",
          expect: 0,
          product: 0,
        })),
      )
    } else {
      setProductionPlans(mockProductionPlans)
    }
  }, [])
  return (
    <div className="shadow-card rounded-xl mt-6">
      <div className="shadow-card-wide rounded-xl pl-6 pr-4 h-full">
        <div className="flex items-center justify-between h-[88px]">
          <HeadingChartSection title="Kế hoạch sản xuất" />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
              <CalendarIcon />
              <SelectValue placeholder="Quý này" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Quý 1</SelectItem>
              <SelectItem value="2">Quý 2</SelectItem>
              <SelectItem value="empty">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ProductionPlanChart data={productionPlans} />
      </div>
    </div>
  )
}

interface ProductionPlanChartProp {
  data: ProductionPlan[]
}

function ProductionPlanChart({ data }: ProductionPlanChartProp) {
  const ticksOfChart = useMemo(() => {
    if (!data) return

    let maxTick = Math.max(data[0].expect, data[0].product)

    for (const p of data) {
      if (maxTick < p.expect) {
        maxTick = p.expect
      }
      if (maxTick < p.product) maxTick = p.product
    }

    const tickGap = 20
    const ticks = generateTickForBarChart(maxTick, tickGap)
    return ticks
  }, [data])

  return (
    <div className="h-[336px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart margin={{ top: 30, left: 20 }} data={data}>
          <Legend
            wrapperStyle={{
              top: "-20px",
              display: "flex",
              justifyContent: "end",
              color: "#141522",
              borderRadius: 20,
            }}
            payload={[
              {
                value: "Kế hoạch",
                type: "rect",
                color: "var(--color-light-blue)",
                id: "1",
              },
              {
                value: "Thực hiện",
                type: "rect",
                color: "var(--color-light-green)",
                id: "2",
              },
            ]}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            label={{
              value: "Mặt hàng",
              angle: 0,
              position: "left",
              offset: 50, // Adjust spacing
              style: { textAnchor: "middle", fontSize: 12 },
            }}
            tickMargin={15}
            height={50}
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDataOverflow
            tickMargin={12}
            label={{
              value: "Cái",
              angle: 0,
              position: "top",
              offset: 20, // Adjust spacing
              style: { textAnchor: "middle", fontSize: 12 },
            }}
            fontSize={12}
            ticks={ticksOfChart}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded bg-light-blue"></div>
                        <span className="text-xs font-medium">Kế hoạch:</span>
                      </div>
                      <div className="text-xs font-medium">{payload[0].value}</div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded bg-green-500"></div>
                        <span className="text-xs font-medium">Thực hiện:</span>
                      </div>
                      <div className="text-xs font-medium">{payload[1].value}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar barSize={20} dataKey="expect" fill="var(--color-light-blue)" radius={[4, 4, 0, 0]} />
          <Bar barSize={20} dataKey="product" fill="var(--color-light-green)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
