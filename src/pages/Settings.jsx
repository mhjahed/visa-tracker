import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { 
  FaCog, 
  FaMoon, 
  FaSun,
  FaDownload,
  FaCheckCircle,
  FaDatabase,
  FaShieldAlt
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { exportToCSV } from '../utils/helpers'
import '../styles/Settings.css'

const Settings = () => {
  const { applications, darkMode, toggleDarkMode } = useAppContext()
  const navigate = useNavigate()
  const [message, setMessage] = useState({ type: '', text: '' })

  // Show message
  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  // Handle export JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(applications, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `visa-applications-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    showMessage('success', 'Data exported successfully!')
  }

  // Handle export CSV
  const handleExportCSV = () => {
    exportToCSV(applications, `visa-applications-${new Date().toISOString().split('T')[0]}.csv`)
    showMessage('success', 'CSV exported successfully!')
  }

  return (
    <div className="settings-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            <FaCog className="page-icon" />
            Settings
          </h1>
          <p className="page-subtitle">
            Application settings and data export
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`message-banner ${message.type}`}>
            <FaCheckCircle />
            <span>{message.text}</span>
          </div>
        )}

        {/* Settings Sections */}
        <div className="settings-grid">
          {/* Appearance */}
          <section className="settings-section">
            <h2 className="section-title">
              {darkMode ? <FaMoon /> : <FaSun />}
              Appearance
            </h2>
            <div className="settings-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Dark Mode</h3>
                  <p>Toggle between light and dark theme</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* Data Export */}
          <section className="settings-section">
            <h2 className="section-title">
              <FaDatabase />
              Data Export
            </h2>
            <div className="settings-content">
              <div className="data-info">
                <p><strong>Total Applications:</strong> {applications.length}</p>
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              </div>

              <div className="settings-buttons">
                <div className="button-group">
                  <h4>Export Your Data</h4>
                  <button className="settings-btn export" onClick={handleExportJSON}>
                    <FaDownload />
                    Export as JSON
                  </button>
                  <button className="settings-btn export" onClick={handleExportCSV}>
                    <FaDownload />
                    Export as CSV
                  </button>
                  <p className="help-text">Download application data for backup or analysis</p>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Access */}
          <section className="settings-section">
            <h2 className="section-title">
              <FaShieldAlt />
              Admin Access
            </h2>
            <div className="settings-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Administrator Panel</h3>
                  <p>Access restricted features with passcode</p>
                </div>
                <button 
                  className="settings-btn admin-access"
                  onClick={() => navigate('/admin')}
                >
                  <FaShieldAlt />
                  Open Admin Panel
                </button>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="settings-section">
            <h2 className="section-title">
              <FaCog />
              About
            </h2>
            <div className="settings-content about-content">
              <div className="about-item">
                <h3>Visa Tracker</h3>
                <p>Version 1.0.0</p>
              </div>
              <div className="about-item">
                <h3>Description</h3>
                <p>
                  A comprehensive Australian student visa application tracking system
                  with real-time analytics and reporting.
                </p>
              </div>
              <div className="about-item">
                <h3>Features</h3>
                <ul>
                  <li>Track visa applications</li>
                  <li>Real-time statistics</li>
                  <li>University & course analytics</li>
                  <li>Export functionality</li>
                  <li>Dark mode support</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings