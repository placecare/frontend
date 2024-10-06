import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

export interface AreaChartProps {
  chartData: any[],
  className?: string
  type?: 'natural' | 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter',
  // key for x axis
  xKey?: string
  cartesianGrid?: {
    vertical?: boolean
    horizontal?: boolean
  }
}

export function AreaGraph ({ chartData, className, type = 'natural', xKey, cartesianGrid }: AreaChartProps) {
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    }
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className={className}>
      <AreaChart
        accessibilityLayer
        data={chartData}
      >
        {cartesianGrid && (
          <CartesianGrid
            vertical={cartesianGrid.vertical}
            horizontal={cartesianGrid.horizontal}
          />
        )}

        {xKey && (
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        )}


        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Area
          dataKey="desktop"
          type={type}
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
