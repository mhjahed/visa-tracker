import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import SearchBar from '../components/SearchBar'
import ApplicationsTable from '../components/ApplicationsTable'
import BarChart from '../components/Charts/BarChart'
import PieChart from '../components/Charts/PieChart'
import LineChart from '../components/Charts/LineChart'
import { 
  FaPlane, 
  FaUniversity, 
  FaCalendarCheck, 
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaSun,
  FaHistory
} from 'react-icons/fa'
import { 
  calculateStatistics, 
  getRecentApplications, 
  getTodaysApplications,
  getYesterdaysApplications,
  getSevenDayTrend 
} from '../utils/calculations'
import { getUniversityLogo } from '../utils/helpers'
import '../styles/Home.css'

const Home = () => {
  const { applications } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate statistics
  const stats = useMemo(() => calculateStatistics(applications), [applications])
  
  // Get today's and yesterday's applications
  const todaysApps = useMemo(() => getTodaysApplications(applications), [applications])
  const yesterdaysApps = useMemo(() => getYesterdaysApplications(applications), [applications])
  const recentApps = useMemo(() => getRecentApplications(applications), [applications])
  
  // Get 7-day trend data
  const trendData = useMemo(() => getSevenDayTrend(applications), [applications])

  // Filter recent applications by search
  const filteredRecentApps = useMemo(() => {
    if (!searchTerm) return recentApps
    const term = searchTerm.toLowerCase()
    return recentApps.filter(app => 
      app.applicantName.toLowerCase().includes(term) ||
      app.university.toLowerCase().includes(term) ||
      app.course.toLowerCase().includes(term)
    )
  }, [recentApps, searchTerm])

  // Get unique universities that have logos
  const displayUniversities = useMemo(() => {
    const uniqueUnis = [...new Set(applications.map(app => app.university))]
    return uniqueUnis.slice(0, 12)
  }, [applications])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-flag-container">
            <img 
              src="/australia-flag.png" 
              alt="Australian Flag" 
              className="hero-flag"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="hero-title">
            <FaPlane className="hero-icon" />
            Australian Student Visa Tracker
          </h1>
          <p className="hero-subtitle">
            Track and monitor student visa applications with real-time updates and comprehensive analytics
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{stats.total}</span>
              <span className="hero-stat-label">Total Applications</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">{stats.underProcess}</span>
              <span className="hero-stat-label">In Progress</span>
            </div>
            <div className="hero-stat success">
              <span className="hero-stat-value">{stats.grantedToday}</span>
              <span className="hero-stat-label">Granted Today</span>
            </div>
            <div className="hero-stat danger">
              <span className="hero-stat-value">{stats.refusedToday}</span>
              <span className="hero-stat-label">Refused Today</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/applications" className="hero-btn primary">
              View All Applications
              <FaArrowRight />
            </Link>
            <Link to="/dashboard" className="hero-btn secondary">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* University Logos Section */}
      <section className="universities-section">
        <div className="section-container">
          <h2 className="section-title">
            <FaUniversity className="section-icon" />
            Partner Universities
          </h2>
          <div className="universities-grid">
            {displayUniversities.map((uni, index) => (
              <div key={index} className="university-card">
                <img
                  src={getUniversityLogo(uni)}
                  alt={uni}
                  className="university-logo-large"
                  onError={(e) => {
                    e.target.src = '/logos/Undefined.png'
                  }}
                />
                <span className="university-name-small">{uni}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Updates Section */}
      <section className="updates-section">
        <div className="section-container">
          <h2 className="section-title">
            <FaCalendarCheck className="section-icon" />
            Recent Updates
          </h2>
          
          {/* Quick Stats Cards */}
          <div className="quick-stats">
            <div className="quick-stat-card today">
              <FaSun className="quick-stat-icon" />
              <div className="quick-stat-content">
                <h3>Today</h3>
                <div className="quick-stat-numbers">
                  <span className="granted">
                    <FaCheckCircle /> {stats.grantedToday} Granted
                  </span>
                  <span className="refused">
                    <FaTimesCircle /> {stats.refusedToday} Refused
                  </span>
                </div>
              </div>
            </div>
            <div className="quick-stat-card yesterday">
              <FaHistory className="quick-stat-icon" />
              <div className="quick-stat-content">
                <h3>Yesterday</h3>
                <div className="quick-stat-numbers">
                  <span className="granted">
                    <FaCheckCircle /> {stats.grantedYesterday} Granted
                  </span>
                  <span className="refused">
                    <FaTimesCircle /> {stats.refusedYesterday} Refused
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search for Recent Applications */}
          <div className="updates-search">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search today's & yesterday's updates..."
            />
          </div>

          {/* Today's Applications Table */}
          {todaysApps.length > 0 && (
            <div className="updates-table-section">
              <h3 className="updates-subtitle">
                <FaSun /> Today's Finalised Applications
              </h3>
              <ApplicationsTable 
                applications={filteredRecentApps.filter(app => 
                  todaysApps.some(t => t.id === app.id)
                )}
                compact={true}
              />
            </div>
          )}

          {/* Yesterday's Applications Table */}
          {yesterdaysApps.length > 0 && (
            <div className="updates-table-section">
              <h3 className="updates-subtitle">
                <FaHistory /> Yesterday's Finalised Applications
              </h3>
              <ApplicationsTable 
                applications={filteredRecentApps.filter(app => 
                  yesterdaysApps.some(y => y.id === app.id)
                )}
                compact={true}
              />
            </div>
          )}

          {recentApps.length === 0 && (
            <div className="no-updates">
              <p>No applications finalised today or yesterday.</p>
            </div>
          )}
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="section-container">
          <h2 className="section-title">
            <FaCalendarCheck className="section-icon" />
            Analytics Overview
          </h2>
          <div className="charts-grid">
            <div className="chart-card">
              <BarChart stats={stats} />
            </div>
            <div className="chart-card">
              <PieChart stats={stats} title="Overall Distribution" />
            </div>
            <div className="chart-card full-width">
              <LineChart trendData={trendData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home