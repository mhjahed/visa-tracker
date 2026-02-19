import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import '../../styles/Charts.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ stats, title = "Today's Results" }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
            weight: '500'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: '600'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8
      }
    }
  }

  const data = {
    labels: ['Granted', 'Refused', 'Under Process'],
    datasets: [
      {
        data: [stats.granted, stats.refused, stats.underProcess],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10
      },
    ],
  }

  return (
    <div className="chart-container pie-chart">
      <Pie options={options} data={data} />
    </div>
  )
}

export default PieChart