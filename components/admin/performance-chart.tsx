"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ChartDataPoint {
  name: string
  [key: string]: string | number
}

interface PerformanceChartProps {
  title: string
  data: ChartDataPoint[]
  type?: "line" | "bar"
  dataKeys: { key: string; color: string; label: string }[]
  height?: number
}

export function PerformanceChart({ title, data, type = "line", dataKeys, height = 300 }: PerformanceChartProps) {
  const Chart = type === "line" ? LineChart : BarChart

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
            {dataKeys.map((dataKey) =>
              type === "line" ? (
                <Line
                  key={dataKey.key}
                  type="monotone"
                  dataKey={dataKey.key}
                  stroke={dataKey.color}
                  strokeWidth={2}
                  name={dataKey.label}
                  dot={{ fill: dataKey.color, r: 4 }}
                />
              ) : (
                <Bar
                  key={dataKey.key}
                  dataKey={dataKey.key}
                  fill={dataKey.color}
                  name={dataKey.label}
                  radius={[4, 4, 0, 0]}
                />
              ),
            )}
          </Chart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
