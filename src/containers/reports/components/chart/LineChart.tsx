'use client'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

type LineChartData = {
  label: string // For the X-axis labels
  value: number // For the bar values
}
type LineChartProps = {
  data: LineChartData[]
  config?: ChartConfig
  lineColor?: string
}

const defaultChartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#04a375'
  }
} satisfies ChartConfig

function LineChartComponent({ data, config = defaultChartConfig, lineColor }: LineChartProps) {
  return (
    <ChartContainer config={config}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis tickLine={false} axisLine={false} />
        <XAxis dataKey='label' tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey='value' type='linear' stroke={lineColor || config.desktop.color} strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

export default LineChartComponent
