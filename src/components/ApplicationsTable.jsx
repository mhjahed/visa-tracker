import React, { useState } from 'react'
import { FaEye, FaUniversity, FaGraduationCap, FaClipboardList } from 'react-icons/fa'
import { formatDate, getUniversityLogo, getStatusBadgeClass, getRowClass } from '../utils/helpers'
import { calculateWaitingDays } from '../utils/calculations'
import '../styles/Components.css'

const ApplicationsTable = ({ 
  applications, 
  compact = false 
}) => {
  const [selectedApp, setSelectedApp] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [imageError, setImageError] = useState({})

  const handleView = (app) => {
    setSelectedApp(app)
    setShowModal(true)
  }

  const handleImageError = (id) => {
    setImageError(prev => ({ ...prev, [id]: true }))
  }

  if (applications.length === 0) {
    return (
      <div className="table-empty">
        <FaClipboardList className="empty-icon" />
        <h3>No Applications Found</h3>
        <p>Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <>
      <div className="table-container">
        <table className={`applications-table ${compact ? 'compact' : ''}`}>
          <thead>
            <tr>
              <th>Lodge Date</th>
              <th>Name</th>
              <th>University</th>
              <th>Course</th>
              <th>Status</th>
              <th>Finalised</th>
              {!compact && <th>Waiting</th>}
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id} className={getRowClass(app.status)}>
                <td data-label="Lodge Date">{formatDate(app.lodgeDate)}</td>
                <td data-label="Name" className="name-cell">{app.applicantName}</td>
                <td data-label="University" className="university-cell">
                  <div className="university-info">
                    {!imageError[app.id] ? (
                      <img
                        src={getUniversityLogo(app.university)}
                        alt={app.university}
                        className="university-logo"
                        onError={() => handleImageError(app.id)}
                      />
                    ) : (
                      <FaUniversity className="university-fallback-icon" />
                    )}
                    <span className="university-name">{app.university}</span>
                  </div>
                </td>
                <td data-label="Course" className="course-cell">
                  <div className="course-info">
                    <FaGraduationCap className="course-icon" />
                    <span>{app.course}</span>
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td data-label="Finalised">{formatDate(app.finalisedDate)}</td>
                {!compact && (
                  <td data-label="Waiting">
                    <span className="waiting-days">
                      {calculateWaitingDays(app.lodgeDate, app.finalisedDate)} days
                    </span>
                  </td>
                )}
                <td data-label="View" className="actions-cell">
                  <button 
                    className="action-btn view-btn" 
                    onClick={() => handleView(app)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {showModal && selectedApp && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Applicant Name:</span>
                <span className="detail-value">{selectedApp.applicantName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Lodge Date:</span>
                <span className="detail-value">{formatDate(selectedApp.lodgeDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">University:</span>
                <span className="detail-value">{selectedApp.university}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{selectedApp.course}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Further Assessment:</span>
                <span className="detail-value">{formatDate(selectedApp.furtherAssessmentDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${getStatusBadgeClass(selectedApp.status)}`}>
                  {selectedApp.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Finalised Date:</span>
                <span className="detail-value">{formatDate(selectedApp.finalisedDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Processing Time:</span>
                <span className="detail-value">
                  {calculateWaitingDays(selectedApp.lodgeDate, selectedApp.finalisedDate)} days
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ApplicationsTable