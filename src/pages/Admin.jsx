import React, { useState, useEffect, useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { 
  FaShieldAlt, 
  FaLock, 
  FaUnlock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaDownload,
  FaSignOutAlt,
  FaUser,
  FaCalendar,
  FaUniversity,
  FaGraduationCap,
  FaClipboardCheck,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa'
import { formatDate, universityList, courseList, exportToCSV } from '../utils/helpers'
import '../styles/Admin.css'

// CHANGE THIS PASSCODE
const ADMIN_PASSCODE = "admin@12"

const Admin = () => {
  const { applications, addApplication, updateApplication, deleteApplication } = useAppContext()
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [showPasscode, setShowPasscode] = useState(false)
  const [authError, setAuthError] = useState('')

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [formData, setFormData] = useState({
    lodgeDate: '',
    applicantName: '',
    furtherAssessmentDate: '',
    university: '',
    course: '',
    status: 'Under Process',
    finalisedDate: ''
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })

  // Check session storage for auth
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setAuthError('')
      setPasscode('')
    } else {
      setAuthError('Invalid passcode. Please try again.')
      setPasscode('')
    }
  }

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
  }

  // Show message
  const showMessageFunc = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      lodgeDate: '',
      applicantName: '',
      furtherAssessmentDate: '',
      university: '',
      course: '',
      status: 'Under Process',
      finalisedDate: ''
    })
    setErrors({})
    setEditingApp(null)
    setShowForm(false)
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    if (name === 'status' && value === 'Under Process') {
      setFormData(prev => ({ ...prev, finalisedDate: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.lodgeDate) newErrors.lodgeDate = 'Lodge date is required'
    if (!formData.applicantName.trim()) newErrors.applicantName = 'Name is required'
    if (!formData.university) newErrors.university = 'University is required'

    if (formData.status !== 'Under Process' && !formData.finalisedDate) {
      newErrors.finalisedDate = 'Finalised date is required'
    }

    if (formData.finalisedDate && formData.lodgeDate) {
      if (new Date(formData.finalisedDate) < new Date(formData.lodgeDate)) {
        newErrors.finalisedDate = 'Finalised date cannot be before lodge date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const applicationData = {
      ...formData,
      furtherAssessmentDate: formData.furtherAssessmentDate || null,
      finalisedDate: formData.status === 'Under Process' ? null : formData.finalisedDate
    }

    if (editingApp) {
      updateApplication(editingApp.id, applicationData)
      showMessageFunc('success', 'Application updated successfully!')
    } else {
      addApplication({
        id: uuidv4(),
        ...applicationData
      })
      showMessageFunc('success', 'Application added successfully!')
    }

    resetForm()
  }

  // Handle edit
  const handleEdit = (app) => {
    setEditingApp(app)
    setFormData({
      lodgeDate: app.lodgeDate || '',
      applicantName: app.applicantName || '',
      furtherAssessmentDate: app.furtherAssessmentDate || '',
      university: app.university || '',
      course: app.course || '',
      status: app.status || 'Under Process',
      finalisedDate: app.finalisedDate || ''
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle delete
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s application?`)) {
      deleteApplication(id)
      showMessageFunc('success', 'Application deleted successfully!')
    }
  }

  // Handle export
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(applications, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `visa-applications-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    showMessageFunc('success', 'JSON exported!')
  }

  const handleExportCSV = () => {
    exportToCSV(applications, `visa-applications-${new Date().toISOString().split('T')[0]}.csv`)
    showMessageFunc('success', 'CSV exported!')
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-icon">
              <FaShieldAlt />
            </div>
            <h1>Admin Access</h1>
            <p>Enter passcode to access admin panel</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="passcode-input-container">
                <FaLock className="input-icon" />
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="passcode-input"
                  autoFocus
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPasscode(!showPasscode)}
                >
                  {showPasscode ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {authError && (
                <div className="auth-error">{authError}</div>
              )}
              
              <button type="submit" className="login-btn">
                <FaUnlock />
                Unlock Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Panel
  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <h1>
              <FaShieldAlt className="admin-icon" />
              Admin Panel
            </h1>
            <p>Manage visa applications</p>
          </div>
          <div className="header-right">
            <button className="admin-btn export-btn" onClick={handleExportJSON}>
              <FaDownload /> Export JSON
            </button>
            <button className="admin-btn export-btn" onClick={handleExportCSV}>
              <FaDownload /> Export CSV
            </button>
            <button className="admin-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`admin-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Add/Edit Form Toggle */}
        {!showForm ? (
          <button 
            className="admin-btn add-btn-large"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Application
          </button>
        ) : (
          <div className="admin-form-container">
            <div className="form-header">
              <h2>{editingApp ? 'Edit Application' : 'Add New Application'}</h2>
              <button className="close-form-btn" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                {/* Lodge Date */}
                <div className={`form-group ${errors.lodgeDate ? 'error' : ''}`}>
                  <label><FaCalendar /> Lodge Date *</label>
                  <input
                    type="date"
                    name="lodgeDate"
                    value={formData.lodgeDate}
                    onChange={handleChange}
                  />
                  {errors.lodgeDate && <span className="error-msg">{errors.lodgeDate}</span>}
                </div>

                {/* Applicant Name */}
                <div className={`form-group ${errors.applicantName ? 'error' : ''}`}>
                  <label><FaUser /> Applicant Name *</label>
                  <input
                    type="text"
                    name="applicantName"
                    placeholder="Enter full name"
                    value={formData.applicantName}
                    onChange={handleChange}
                  />
                  {errors.applicantName && <span className="error-msg">{errors.applicantName}</span>}
                </div>

                {/* Further Assessment Date */}
                <div className="form-group">
                  <label><FaCalendar /> Further Assessment Date</label>
                  <input
                    type="date"
                    name="furtherAssessmentDate"
                    value={formData.furtherAssessmentDate}
                    onChange={handleChange}
                  />
                </div>

                {/* University */}
                <div className={`form-group ${errors.university ? 'error' : ''}`}>
                  <label><FaUniversity /> University *</label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                  >
                    <option value="">Select University</option>
                    {universityList.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                  {errors.university && <span className="error-msg">{errors.university}</span>}
                </div>

                {/* Course */}
                <div className="form-group">
                  <label><FaGraduationCap /> Course</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    {courseList.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && <span className="error-msg">{errors.course}</span>}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label><FaClipboardCheck /> Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Under Process">Under Process</option>
                    <option value="Granted">Granted</option>
                    <option value="Refused">Refused</option>
                  </select>
                </div>

                {/* Finalised Date */}
                {formData.status !== 'Under Process' && (
                  <div className={`form-group ${errors.finalisedDate ? 'error' : ''}`}>
                    <label><FaCalendar /> Finalised Date *</label>
                    <input
                      type="date"
                      name="finalisedDate"
                      value={formData.finalisedDate}
                      onChange={handleChange}
                    />
                    {errors.finalisedDate && <span className="error-msg">{errors.finalisedDate}</span>}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <FaSave /> {editingApp ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Applications List */}
        <div className="admin-table-container">
          <h2>All Applications ({applications.length})</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lodge Date</th>
                  <th>Name</th>
                  <th>University</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Finalised</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className={
                    app.status === 'Granted' ? 'row-granted' : 
                    app.status === 'Refused' ? 'row-refused' : ''
                  }>
                    <td>{formatDate(app.lodgeDate)}</td>
                    <td>{app.applicantName}</td>
                    <td>{app.university}</td>
                    <td>{app.course}</td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{formatDate(app.finalisedDate)}</td>
                    <td className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(app)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(app.id, app.applicantName)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin