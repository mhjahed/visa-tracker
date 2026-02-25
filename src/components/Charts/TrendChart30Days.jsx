import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { format, subDays } from 'date-fns'
import { useAppContext } from '../../context/AppContext'
import '../../styles/Charts.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const TrendChart30Days = ({ applications }) => {
  const { darkMode } = useAppContext()

  // Generate 30-day trend data
  const trendData = useMemo(() => {
    const data = []
    
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const dateStr = format(date, 'yyyy-MM-dd')
      const displayDate = format(date, 'MMM dd')
      
      const granted = applications.filter(
        app => app.finalisedDate === dateStr && app.status === 'Granted'
      ).length
      
      const refused = applications.filter(
        app => app.finalisedDate === dateStr && app.status === 'Refused'
      ).length
      
      const total = granted + refused
      
      data.push({
        date: displayDate,
        granted,
        refused,
        total
      })
    }
    
    return data
  }, [applications])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalGranted = trendData.reduce((sum, d) => sum + d.granted, 0)
    const totalRefused = trendData.reduce((sum, d) => sum + d.refused, 0)
    const totalProcessed = totalGranted + totalRefused
    const successRate = totalProcessed > 0 ? ((totalGranted / totalProcessed) * 100).toFixed(1) : 0
    const avgPerDay = (totalProcessed / 30).toFixed(1)
    
    return { totalGranted, totalRefused, totalProcessed, successRate, avgPerDay }
  }, [trendData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: '500'
          },
          usePointStyle: true,
          padding: 20,
          color: darkMode ? '#e5e7eb' : '#374151'
        }
      },
      title: {
        display: true,
        text: '30-Day Application Trend',
        font: {
          size: 18,
          weight: '700'
        },
        color: darkMode ? '#ffffff' : '#111827',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? '#ffffff' : '#111827',
        bodyColor: darkMode ? '#e5e7eb' : '#374151',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 14,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 10,
        displayColors: true,
        callbacks: {
          afterBody: (context) => {
            const dataIndex = context[0].dataIndex
            const total = trendData[dataIndex].total
            return `\nTotal: ${total} applications`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 11
          },
          color: darkMode ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          },
          color: darkMode ? '#9ca3af' : '#6b7280',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  }

  const data = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: 'Granted',
        data: trendData.map(d => d.granted),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: darkMode ? '#1a1a2e' : '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3
      },
      {
        label: 'Refused',
        data: trendData.map(d => d.refused),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: darkMode ? '#1a1a2e' : '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3
      },
      {
        label: 'Total',
        data: trendData.map(d => d.total),
        borderColor: '#8b5cf6',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: darkMode ? '#1a1a2e' : '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ],
  }

  return (
    <div className={`trend-chart-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Stats Summary */}
      <div className="trend-stats">
        <div className="trend-stat granted">
          <span className="trend-stat-value">{stats.totalGranted}</span>
          <span className="trend-stat-label">Granted</span>
        </div>
        <div className="trend-stat refused">
          <span className="trend-stat-value">{stats.totalRefused}</span>
          <span className="trend-stat-label">Refused</span>
        </div>
        <div className="trend-stat total">
          <span className="trend-stat-value">{stats.totalProcessed}</span>
          <span className="trend-stat-label">Total</span>
        </div>
        <div className="trend-stat rate">
          <span className="trend-stat-value">{stats.successRate}%</span>
          <span className="trend-stat-label">Success Rate</span>
        </div>
        <div className="trend-stat avg">
          <span className="trend-stat-value">{stats.avgPerDay}</span>
          <span className="trend-stat-label">Avg/Day</span>
        </div>
      </div>
      
      {/* Chart */}
      <div className="trend-chart-wrapper">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default TrendChart30Days
