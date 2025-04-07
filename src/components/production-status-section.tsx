"use client"
import { HeadingChartSection } from "./ui/typographys"
import { SelectTrigger, SelectValue, SelectItem, SelectContent, Select } from "./ui/select"
import { CalendarIcon } from "./ui/icons"
import { useCallback, useMemo, useState } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "./ui/chart"
import { mockProductionStatuses, mockProductionStatusesNoData } from "@/lib/data"
import { EMPTY_COLORS_PIE_CHART, COLORS_PIE_CHART } from "@/lib/const"
import type { ProductionStatus } from "@/lib/types"

export default function ProductionStatusSection() {
  const [productionStatuses, setProductionStatuses] = useState(mockProductionStatuses)
  const handleValueChange = useCallback((value: string) => {
    if (!value) return

    if (value == "empty") {
      setProductionStatuses(pre => pre.map(p => ({ ...p, value: 0 })))
    } else {
      setProductionStatuses(mockProductionStatuses)
    }
  }, [])

  return (
    <div className="shadow-card rounded-xl mt-6">
      <div className="shadow-card-wide rounded-xl pl-6 pr-4 h-full">
        <div className="flex items-center justify-between h-[88px]">
          <HeadingChartSection title="Tình hình sản xuất" />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="border border-neutral-02 outline-none text-base !text-neutral-05 font-normal leading-10">
              <CalendarIcon />
              <SelectValue placeholder="Hôm nay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Hôm qua</SelectItem>
              <SelectItem value="empty">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ProductionStatusChart data={productionStatuses} />
      </div>
    </div>
  )
}

interface ProductionStatusChartProps {
  data: ProductionStatus[]
}

function ProductionStatusChart({ data }: ProductionStatusChartProps) {
  // Mock data for production status

  const totalProductInAllStatus = useMemo(() => {
    return data.reduce((acc, curr) => {
      return acc + curr.value
    }, 0)
  }, [data])

  const isEmpty = totalProductInAllStatus === 0
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="h-[286px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart key={isEmpty ? "empty" : "filled"}>
            {/* Define shadow filters */}
            <defs>
              {/* Filter for segment 1: top inner shadow (0px -7.15px) */}
              <filter id="innerShadow-0" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset dx="0" dy="-7.15" result="offsetBlur" />
                <feComposite
                  in="offsetBlur"
                  in2="SourceAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                  result="innerShadow"
                />
                <feFlood floodColor="#FFFFFF" floodOpacity="0.25" result="color" />
                <feComposite in="color" in2="innerShadow" operator="in" result="shadow" />
                <feComposite in="shadow" in2="SourceGraphic" operator="over" />
              </filter>

              {/* Filter for segment 2: top-left inner shadow (-3.57px -3.57px) */}
              <filter id="innerShadow-1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset dx="-3.57" dy="-3.57" result="offsetBlur" />
                <feComposite
                  in="offsetBlur"
                  in2="SourceAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                  result="innerShadow"
                />
                <feFlood floodColor="#FFFFFF" floodOpacity="0.25" result="color" />
                <feComposite in="color" in2="innerShadow" operator="in" result="shadow" />
                <feComposite in="shadow" in2="SourceGraphic" operator="over" />
              </filter>

              {/* Filter for segment 3: bottom inner shadow (0px 7.15px) */}
              <filter id="innerShadow-2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset dx="0" dy="7.15" result="offsetBlur" />
                <feComposite
                  in="offsetBlur"
                  in2="SourceAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                  result="innerShadow"
                />
                <feFlood floodColor="#FFFFFF" floodOpacity="0.25" result="color" />
                <feComposite in="color" in2="innerShadow" operator="in" result="shadow" />
                <feComposite in="shadow" in2="SourceGraphic" operator="over" />
              </filter>
            </defs>

            {/* Render donut segments */}
            <Pie
              data={isEmpty ? mockProductionStatusesNoData : data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              cornerRadius={10}
              paddingAngle={2}
              dataKey="value"
              label={
                isEmpty
                  ? undefined
                  : ({ cx, cy, midAngle, outerRadius, percent, fill }) => {
                      const RADIAN = Math.PI / 180
                      const labelRadius = outerRadius + 30 // Increased from +10 to +30
                      const x = cx + labelRadius * Math.cos(-midAngle * RADIAN)
                      const y = cy + labelRadius * Math.sin(-midAngle * RADIAN)

                      const lineStartX = cx + outerRadius * Math.cos(-midAngle * RADIAN)
                      const lineStartY = cy + outerRadius * Math.sin(-midAngle * RADIAN)

                      const percentage = `${(percent * 100).toFixed(2)}%`

                      return (
                        <g>
                          {/* Connector line */}
                          <line x1={lineStartX} y1={lineStartY} x2={x} y2={y} stroke={fill} strokeWidth={1.5} />

                          {/* Label shape */}
                          <foreignObject x={x - 25} y={y - 12} width={50} height={24}>
                            <div
                              style={{
                                background: fill,
                                border: `1px solid ${fill}`,
                                borderRadius: 12,
                                padding: "2px 6px",
                                fontSize: 12,
                                fontWeight: 600,
                                textAlign: "center",
                                color: "#fff",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {percentage}
                            </div>
                          </foreignObject>
                        </g>
                      )
                    }
              }
            >
              {(isEmpty ? mockProductionStatusesNoData : data).map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    filter={`url(#innerShadow-${index})`}
                    fill={
                      isEmpty
                        ? EMPTY_COLORS_PIE_CHART[index % EMPTY_COLORS_PIE_CHART.length]
                        : COLORS_PIE_CHART[index % COLORS_PIE_CHART.length]
                    }
                  />
                )
              })}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={36} fontWeight="bold">
              {totalProductInAllStatus}
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fill="var(--color-neutral-03)"
            >
              Lệnh sản xuất
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center w-full">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-start border border-[#DDDDE2] rounded-md p-2">
            <div className="text-2xl font-bold leading-10" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-sm text-neutral-07 font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
