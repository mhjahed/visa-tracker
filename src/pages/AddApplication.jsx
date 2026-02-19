import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { 
  FaPlusCircle, 
  FaSave, 
  FaTimes, 
  FaUser, 
  FaCalendar,
  FaUniversity,
  FaGraduationCap,
  FaClipboardCheck,
  FaEdit
} from 'react-icons/fa'
import { universityList, courseList } from '../utils/helpers'
import '../styles/AddApplication.css'

const AddApplication = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addApplication, updateApplication } = useAppContext()

  // Check if editing existing application
  const editApplication = location.state?.editApplication
  const isEditing = !!editApplication

  // Form state
  const [formData, setFormData] = useState({
    lodgeDate: '',
    applicantName: '',
    furtherAssessmentDate: '',
    university: '',
    course: '',
    status: 'Under Process',
    finalisedDate: ''
  })

  // Validation errors
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (editApplication) {
      setFormData({
        lodgeDate: editApplication.lodgeDate || '',
        applicantName: editApplication.applicantName || '',
        furtherAssessmentDate: editApplication.furtherAssessmentDate || '',
        university: editApplication.university || '',
        course: editApplication.course || '',
        status: editApplication.status || 'Under Process',
        finalisedDate: editApplication.finalisedDate || ''
      })
    }
  }, [editApplication])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // If status changes to Under Process, clear finalisedDate
    if (name === 'status' && value === 'Under Process') {
      setFormData(prev => ({
        ...prev,
        finalisedDate: ''
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.lodgeDate) {
      newErrors.lodgeDate = 'Lodge date is required'
    }

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant name is required'
    }

    if (!formData.university) {
      newErrors.university = 'University is required'
    }

    if (!formData.course) {
      newErrors.course = 'Course is required'
    }

    if (formData.status !== 'Under Process' && !formData.finalisedDate) {
      newErrors.finalisedDate = 'Finalised date is required for Granted/Refused status'
    }

    // Validate date logic
    if (formData.finalisedDate && formData.lodgeDate) {
      if (new Date(formData.finalisedDate) < new Date(formData.lodgeDate)) {
        newErrors.finalisedDate = 'Finalised date cannot be before lodge date'
      }
    }

    if (formData.furtherAssessmentDate && formData.lodgeDate) {
      if (new Date(formData.furtherAssessmentDate) < new Date(formData.lodgeDate)) {
        newErrors.furtherAssessmentDate = 'Assessment date cannot be before lodge date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const applicationData = {
        ...formData,
        furtherAssessmentDate: formData.furtherAssessmentDate || null,
        finalisedDate: formData.status === 'Under Process' ? null : formData.finalisedDate
      }

      if (isEditing) {
        updateApplication(editApplication.id, applicationData)
      } else {
        addApplication({
          id: uuidv4(),
          ...applicationData
        })
      }

      // Navigate back to applications
      navigate('/applications')
    } catch (error) {
      console.error('Error saving application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="add-application-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="form-header">
          <h1 className="form-title">
            {isEditing ? (
              <>
                <FaEdit className="form-icon" />
                Edit Application
              </>
            ) : (
              <>
                <FaPlusCircle className="form-icon" />
                Add New Application
              </>
            )}
          </h1>
          <p className="form-subtitle">
            {isEditing 
              ? 'Update the application details below'
              : 'Fill in the details to add a new visa application'
            }
          </p>
        </div>

        {/* Form */}
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Lodge Date */}
            <div className={`form-group ${errors.lodgeDate ? 'error' : ''}`}>
              <label className="form-label">
                <FaCalendar className="label-icon" />
                Lodge Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="lodgeDate"
                className="form-input"
                value={formData.lodgeDate}
                onChange={handleChange}
              />
              {errors.lodgeDate && (
                <span className="error-message">{errors.lodgeDate}</span>
              )}
            </div>

            {/* Applicant Name */}
            <div className={`form-group ${errors.applicantName ? 'error' : ''}`}>
              <label className="form-label">
                <FaUser className="label-icon" />
                Applicant Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="applicantName"
                className="form-input"
                placeholder="Enter full name"
                value={formData.applicantName}
                onChange={handleChange}
              />
              {errors.applicantName && (
                <span className="error-message">{errors.applicantName}</span>
              )}
            </div>

            {/* Further Assessment Date */}
            <div className={`form-group ${errors.furtherAssessmentDate ? 'error' : ''}`}>
              <label className="form-label">
                <FaCalendar className="label-icon" />
                Further Assessment Date
              </label>
              <input
                type="date"
                name="furtherAssessmentDate"
                className="form-input"
                value={formData.furtherAssessmentDate}
                onChange={handleChange}
              />
              {errors.furtherAssessmentDate && (
                <span className="error-message">{errors.furtherAssessmentDate}</span>
              )}
            </div>

            {/* University */}
            <div className={`form-group ${errors.university ? 'error' : ''}`}>
              <label className="form-label">
                <FaUniversity className="label-icon" />
                University <span className="required">*</span>
              </label>
              <select
                name="university"
                className="form-select"
                value={formData.university}
                onChange={handleChange}
              >
                <option value="">Select University</option>
                {universityList.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
              {errors.university && (
                <span className="error-message">{errors.university}</span>
              )}
            </div>

            {/* Course */}
            <div className={`form-group ${errors.course ? 'error' : ''}`}>
              <label className="form-label">
                <FaGraduationCap className="label-icon" />
                Course <span className="required">*</span>
              </label>
              <select
                name="course"
                className="form-select"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {courseList.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.course && (
                <span className="error-message">{errors.course}</span>
              )}
            </div>

            {/* Status */}
            <div className={`form-group ${errors.status ? 'error' : ''}`}>
              <label className="form-label">
                <FaClipboardCheck className="label-icon" />
                Status <span className="required">*</span>
              </label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Under Process">Under Process</option>
                <option value="Granted">Granted</option>
                <option value="Refused">Refused</option>
              </select>
              {errors.status && (
                <span className="error-message">{errors.status}</span>
              )}
            </div>

            {/* Finalised Date - Only show if not Under Process */}
            {formData.status !== 'Under Process' && (
              <div className={`form-group ${errors.finalisedDate ? 'error' : ''}`}>
                <label className="form-label">
                  <FaCalendar className="label-icon" />
                  Finalised Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="finalisedDate"
                  className="form-input"
                  value={formData.finalisedDate}
                  onChange={handleChange}
                />
                {errors.finalisedDate && (
                  <span className="error-message">{errors.finalisedDate}</span>
                )}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="form-btn cancel-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
            <button 
              type="submit" 
              className="form-btn submit-btn"
              disabled={isSubmitting}
            >
              <FaSave />
              <span>{isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Save')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApplication