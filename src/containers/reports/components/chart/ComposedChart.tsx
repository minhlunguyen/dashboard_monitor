import { useEffect, useRef } from 'react'
import { Chart, registerables, ChartData, ChartTypeRegistry } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels' // Import the plugin

Chart.register(...registerables, ChartDataLabels) // Register the plugin

type ComposedChartData = {
  label: string
  total: number
  new: number
}

type BarChartProps = {
  data: ComposedChartData[]
  barColor?: string
}

function ComposedChartComponent({ data, barColor = '#04a375' }: BarChartProps) {
  console.log('🚀 ~ ComposedChartComponent ~ data:', data)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const chartData: ChartData<keyof ChartTypeRegistry, number[], string> = {
      labels: data.map((d) => d.label),
      datasets: [
        {
          type: 'line',
          label: 'Total',
          data: data.map((d) => d.total),
          borderColor: barColor,
          backgroundColor: 'rgba(0,0,0,0)',
          fill: false,
          borderWidth: 2, // Make the line slightly thicker
          tension: 0.3, // Smoothen the line
          pointRadius: 5, // Increase the size of the points on the line
          pointBackgroundColor: 'white', // Change the point color to white
          pointBorderColor: barColor,
          pointBorderWidth: 2,
          yAxisID: 'y1',
          datalabels: {
            align: 'top',
            anchor: 'end',
            color: 'black',
            formatter: (value) => value
          }
        },
        {
          type: 'bar',
          label: 'New',
          data: data.map((d) => d.new),
          backgroundColor: barColor,
          borderColor: barColor,
          borderWidth: 1,
          yAxisID: 'y2',
          datalabels: {
            align: 'center',
            anchor: 'center',
            color: 'white',
            formatter: (value) => value
          }
        }
      ]
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y
                }
                return label
              }
            }
          },
          datalabels: {
            display: true
          }
        },
        scales: {
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: Math.max(...data.map((d) => d.total)) + Math.max(...data.map((d) => d.total)),
            title: {
              display: true,
              text: 'Total'
            }
          },
          y2: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'New'
            },
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: Math.max(...data.map((d) => d.new)) + Math.max(...data.map((d) => d.new)),
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return Number.isInteger(value) ? value : ''
              }
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    })

    return () => {
      myChart.destroy()
    }
  }, [data, barColor])

  return <canvas ref={canvasRef} />
}

export default ComposedChartComponent
