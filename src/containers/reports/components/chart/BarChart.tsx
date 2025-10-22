'use client'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

type BarChartData = {
  label: string // For the X-axis labels
  value: number // For the bar values
}

type BarChartProps = {
  data: BarChartData[] // Array of data with `label` and `value`
  config?: ChartConfig // Optional configuration
  barColor?: string // Optional bar color
}

const defaultChartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#04a375' // Default color if none provided
  }
} satisfies ChartConfig

function BarChartComponent({
  data,
  config = defaultChartConfig, // Default config
  barColor
}: BarChartProps) {
  return (
    <ChartContainer config={config}>
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 30
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis tickLine={false} axisLine={false} />
        <XAxis
          dataKey='label' // X-axis labels from the "label" field
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey='value' fill={barColor || config.desktop.color} radius={8}>
          {/* Display the data value directly on top of each bar */}
          <LabelList
            dataKey='value' // Label for the bar heights from the "value" field
            position='top'
            offset={12}
            className='fill-foreground'
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export default BarChartComponent
