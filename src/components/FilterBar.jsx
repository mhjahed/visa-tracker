import React from 'react'
import { FaFilter, FaSortAmountDown, FaSortAmountUp, FaUndo } from 'react-icons/fa'
import { getUniqueValues } from '../utils/helpers'
import '../styles/Components.css'

const FilterBar = ({ 
  applications, 
  filters, 
  setFilters, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder,
  onReset 
}) => {
  const universities = getUniqueValues(applications, 'university')
  const courses = getUniqueValues(applications, 'course')
  const statuses = ['Under Process', 'Granted', 'Refused']

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <div className="filter-title">
          <FaFilter className="filter-icon" />
          <span>Filters & Sorting</span>
        </div>
        <button className="filter-reset-btn" onClick={onReset}>
          <FaUndo />
          <span>Reset</span>
        </button>
      </div>

      <div className="filter-controls">
        {/* University Filter */}
        <div className="filter-group">
          <label className="filter-label">University</label>
          <select
            className="filter-select"
            value={filters.university || 'all'}
            onChange={(e) => handleFilterChange('university', e.target.value)}
          >
            <option value="all">All Universities</option>
            {universities.map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        {/* Course Filter */}
        <div className="filter-group">
          <label className="filter-label">Course</label>
          <select
            className="filter-select"
            value={filters.course || 'all'}
            onChange={(e) => handleFilterChange('course', e.target.value)}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            className="filter-select"
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="lodgeDate">Lodge Date</option>
            <option value="applicantName">Name</option>
            <option value="university">University</option>
            <option value="course">Course</option>
            <option value="status">Status</option>
            <option value="finalisedDate">Finalised Date</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="filter-group">
          <label className="filter-label">Order</label>
          <button className="sort-order-btn" onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? (
              <>
                <FaSortAmountUp />
                <span>Ascending</span>
              </>
            ) : (
              <>
                <FaSortAmountDown />
                <span>Descending</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar