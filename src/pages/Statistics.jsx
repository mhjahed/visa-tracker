import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { 
  FaChartPie, 
  FaUniversity, 
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa'
import { getUniversityStats, getCourseStats } from '../utils/calculations'
import '../styles/Statistics.css'

const Statistics = () => {
  const { applications } = useAppContext()
  
  // Sorting state for tables
  const [uniSort, setUniSort] = useState({ field: 'total', order: 'desc' })
  const [courseSort, setCourseSort] = useState({ field: 'total', order: 'desc' })

  // Get statistics
  const universityStats = useMemo(() => getUniversityStats(applications), [applications])
  const courseStats = useMemo(() => getCourseStats(applications), [applications])

  // Sort university stats
  const sortedUniStats = useMemo(() => {
    return [...universityStats].sort((a, b) => {
      let comparison = 0
      if (uniSort.field === 'university') {
        comparison = a.university.localeCompare(b.university)
      } else if (uniSort.field === 'successRate') {
        const aRate = a.successRate === 'N/A' ? -1 : parseFloat(a.successRate)
        const bRate = b.successRate === 'N/A' ? -1 : parseFloat(b.successRate)
        comparison = aRate - bRate
      } else {
        comparison = a[uniSort.field] - b[uniSort.field]
      }
      return uniSort.order === 'asc' ? comparison : -comparison
    })
  }, [universityStats, uniSort])

  // Sort course stats
  const sortedCourseStats = useMemo(() => {
    return [...courseStats].sort((a, b) => {
      let comparison = 0
      if (courseSort.field === 'course') {
        comparison = a.course.localeCompare(b.course)
      } else if (courseSort.field === 'successRate') {
        const aRate = a.successRate === 'N/A' ? -1 : parseFloat(a.successRate)
        const bRate = b.successRate === 'N/A' ? -1 : parseFloat(b.successRate)
        comparison = aRate - bRate
      } else {
        comparison = a[courseSort.field] - b[courseSort.field]
      }
      return courseSort.order === 'asc' ? comparison : -comparison
    })
  }, [courseStats, courseSort])

  // Handle sort
  const handleUniSort = (field) => {
    setUniSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc'
    }))
  }

  const handleCourseSort = (field) => {
    setCourseSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc'
    }))
  }

  // Get sort icon
  const getSortIcon = (sortState, field) => {
    if (sortState.field !== field) return null
    return sortState.order === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />
  }

  return (
    <div className="statistics-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            <FaChartPie className="page-icon" />
            Detailed Statistics
          </h1>
          <p className="page-subtitle">
            University and course-wise success rates
          </p>
        </div>

        {/* University Statistics */}
        <section className="stats-section">
          <h2 className="section-title">
            <FaUniversity className="section-icon" />
            University-wise Statistics
          </h2>
          <div className="stats-table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('university')}
                  >
                    University {getSortIcon(uniSort, 'university')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('total')}
                  >
                    Total {getSortIcon(uniSort, 'total')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('granted')}
                  >
                    <FaCheckCircle className="th-icon success" />
                    Granted {getSortIcon(uniSort, 'granted')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('refused')}
                  >
                    <FaTimesCircle className="th-icon danger" />
                    Refused {getSortIcon(uniSort, 'refused')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('underProcess')}
                  >
                    <FaSpinner className="th-icon warning" />
                    Pending {getSortIcon(uniSort, 'underProcess')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleUniSort('successRate')}
                  >
                    Success Rate {getSortIcon(uniSort, 'successRate')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUniStats.map(uni => (
                  <tr key={uni.university}>
                    <td className="university-name">{uni.university}</td>
                    <td className="total-cell">{uni.total}</td>
                    <td className="granted-cell">{uni.granted}</td>
                    <td className="refused-cell">{uni.refused}</td>
                    <td className="pending-cell">{uni.underProcess}</td>
                    <td className="rate-cell">
                      <div className="rate-wrapper">
                        <div 
                          className="rate-bar"
                          style={{ 
                            width: uni.successRate !== 'N/A' ? `${uni.successRate}%` : '0%',
                            backgroundColor: uni.successRate !== 'N/A' 
                              ? parseFloat(uni.successRate) >= 70 ? '#28a745' 
                              : parseFloat(uni.successRate) >= 50 ? '#ffc107' 
                              : '#dc3545'
                              : '#dee2e6'
                          }}
                        ></div>
                        <span className="rate-text">
                          {uni.successRate !== 'N/A' ? `${uni.successRate}%` : 'N/A'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Statistics */}
        <section className="stats-section">
          <h2 className="section-title">
            <FaGraduationCap className="section-icon" />
            Course-wise Statistics
          </h2>
          <div className="stats-table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('course')}
                  >
                    Course {getSortIcon(courseSort, 'course')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('total')}
                  >
                    Total {getSortIcon(courseSort, 'total')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('granted')}
                  >
                    <FaCheckCircle className="th-icon success" />
                    Granted {getSortIcon(courseSort, 'granted')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('refused')}
                  >
                    <FaTimesCircle className="th-icon danger" />
                    Refused {getSortIcon(courseSort, 'refused')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('underProcess')}
                  >
                    <FaSpinner className="th-icon warning" />
                    Pending {getSortIcon(courseSort, 'underProcess')}
                  </th>
                  <th 
                    className="sortable"
                    onClick={() => handleCourseSort('successRate')}
                  >
                    Success Rate {getSortIcon(courseSort, 'successRate')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCourseStats.map(course => (
                  <tr key={course.course}>
                    <td className="course-name">{course.course}</td>
                    <td className="total-cell">{course.total}</td>
                    <td className="granted-cell">{course.granted}</td>
                    <td className="refused-cell">{course.refused}</td>
                    <td className="pending-cell">{course.underProcess}</td>
                    <td className="rate-cell">
                      <div className="rate-wrapper">
                        <div 
                          className="rate-bar"
                          style={{ 
                            width: course.successRate !== 'N/A' ? `${course.successRate}%` : '0%',
                            backgroundColor: course.successRate !== 'N/A' 
                              ? parseFloat(course.successRate) >= 70 ? '#28a745' 
                              : parseFloat(course.successRate) >= 50 ? '#ffc107' 
                              : '#dc3545'
                              : '#dee2e6'
                          }}
                        ></div>
                        <span className="rate-text">
                          {course.successRate !== 'N/A' ? `${course.successRate}%` : 'N/A'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Statistics