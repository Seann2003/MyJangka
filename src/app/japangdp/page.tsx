"use client"

import { useState } from "react"
import { TrendingDown, X } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, TooltipProps, Legend, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Japan's GDP over recent years"

const chartData = [
  { year: 2016, gdp: 5003 },
  { year: 2017, gdp: 4930 },
  { year: 2018, gdp: 5040 },
  { year: 2019, gdp: 5117 },
  { year: 2020, gdp: 5055 },
  { year: 2021, gdp: 5034 },
  { year: 2022, gdp: 4256 },
  { year: 2023, gdp: 4210 },
]

const chartConfig = {
  gdp: {
    label: "GDP (Billion USD)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Component() {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const Chart = () => (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={isFullScreen ? "90vh" : 300}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 40,
            right: 40,
            top: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${value}B`}
          />
          <Legend />
          <ChartTooltip
            cursor={false}
            content={({ active, payload, label }: TooltipProps<number, string>) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <p>{`${label}: $${payload[0].value} billion`}</p>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Line
            dataKey="gdp"
            name="GDP (Billion USD)"
            type="linear"
            stroke="var(--color-gdp)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "var(--color-gdp)",
              strokeWidth: 2,
              stroke: "var(--background)",
            }}
            activeDot={{
              r: 6,
              fill: "var(--color-gdp)",
              strokeWidth: 2,
              stroke: "var(--background)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )

  return (
    <>
      <Card className={isFullScreen ? "hidden" : ""}>
        <CardHeader>
          <CardTitle>Japan's GDP - Recent Years</CardTitle>
          <CardDescription>2016 - 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            GDP decreased by 1.1% from 2022 to 2023 <TrendingDown className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            GDP values are in billion USD
          </div>
        </CardFooter>
      </Card>
    </>
  )
}