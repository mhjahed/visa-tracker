import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import SummaryCards from '../components/SummaryCards'
import BarChart from '../components/Charts/BarChart'
import PieChart from '../components/Charts/PieChart'
import LineChart from '../components/Charts/LineChart'
import { 
  FaChartBar, 
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaClock
} from 'react-icons/fa'
import { 
  calculateStatistics, 
  getSevenDayTrend,
  getUniversityStats,
  getCourseStats
} from '../utils/calculations'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const { applications } = useAppContext()

  // Calculate all statistics
  const stats = useMemo(() => calculateStatistics(applications), [applications])
  const trendData = useMemo(() => getSevenDayTrend(applications), [applications])
  const universityStats = useMemo(() => getUniversityStats(applications), [applications])
  const courseStats = useMemo(() => getCourseStats(applications), [applications])

  // Top universities by applications
  const topUniversities = useMemo(() => {
    return [...universityStats]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [universityStats])

  // Top courses by applications
  const topCourses = useMemo(() => {
    return [...courseStats]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [courseStats])

  return (
    <div className="dashboard-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            <FaChartBar className="page-icon" />
            Dashboard
          </h1>
          <p className="page-subtitle">
            Comprehensive overview of all visa applications
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards stats={stats} />

        {/* Charts Row 1 */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <BarChart stats={stats} />
          </div>
          <div className="dashboard-card">
            <PieChart stats={stats} title="Application Status Distribution" />
          </div>
        </div>

        {/* Line Chart - Full Width */}
        <div className="dashboard-card full-width">
          <LineChart trendData={trendData} />
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {/* Today's Summary */}
          <div className="stats-card">
            <div className="stats-card-header">
              <FaCalendarAlt className="stats-card-icon" />
              <h3>Today's Summary</h3>
            </div>
            <div className="stats-card-body">
              <div className="stat-item success">
                <FaCheckCircle />
                <span className="stat-value">{stats.grantedToday}</span>
                <span className="stat-label">Granted</span>
              </div>
              <div className="stat-item danger">
                <FaTimesCircle />
                <span className="stat-value">{stats.refusedToday}</span>
                <span className="stat-label">Refused</span>
              </div>
              <div className="stat-item warning">
                <FaSpinner />
                <span className="stat-value">{stats.underProcess}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>

          {/* Processing Time */}
          <div className="stats-card">
            <div className="stats-card-header">
              <FaClock className="stats-card-icon" />
              <h3>Processing Metrics</h3>
            </div>
            <div className="stats-card-body">
              <div className="metric-item">
                <span className="metric-label">Average Wait Time</span>
                <span className="metric-value">{stats.avgWaitingTime} days</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Grant Ratio</span>
                <span className="metric-value success">{stats.grantRatio}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Total Finalised</span>
                <span className="metric-value">{stats.totalFinalised}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Lists */}
        <div className="top-lists-grid">
          {/* Top Universities */}
          <div className="top-list-card">
            <h3 className="top-list-title">Top Universities</h3>
            <div className="top-list">
              {topUniversities.map((uni, index) => (
                <div key={uni.university} className="top-list-item">
                  <span className="rank">{index + 1}</span>
                  <span className="name">{uni.university}</span>
                  <div className="list-stats">
                    <span className="total">{uni.total} apps</span>
                    <span className="success-rate">
                      {uni.successRate !== 'N/A' ? `${uni.successRate}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="top-list-card">
            <h3 className="top-list-title">Top Courses</h3>
            <div className="top-list">
              {topCourses.map((course, index) => (
                <div key={course.course} className="top-list-item">
                  <span className="rank">{index + 1}</span>
                  <span className="name">{course.course}</span>
                  <div className="list-stats">
                    <span className="total">{course.total} apps</span>
                    <span className="success-rate">
                      {course.successRate !== 'N/A' ? `${course.successRate}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard