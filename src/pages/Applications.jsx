import React, { useState, useMemo, useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import SummaryCards from '../components/SummaryCards'
import ApplicationsTable from '../components/ApplicationsTable'
import { FaListAlt, FaDownload } from 'react-icons/fa'
import { calculateStatistics } from '../utils/calculations'
import { sortApplications, filterApplications, exportToCSV } from '../utils/helpers'
import '../styles/Applications.css'

const Applications = () => {
  const { applications } = useAppContext()

  // Filter and Sort States
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    university: 'all',
    course: 'all',
    status: 'all'
  })
  const [sortBy, setSortBy] = useState('lodgeDate')
  const [sortOrder, setSortOrder] = useState('desc')

  // Calculate statistics
  const stats = useMemo(() => calculateStatistics(applications), [applications])

  // Apply filters and sorting
  const filteredAndSortedApps = useMemo(() => {
    let result = applications
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(app =>
        app.applicantName.toLowerCase().includes(term) ||
        app.university.toLowerCase().includes(term) ||
        app.course.toLowerCase().includes(term)
      )
    }

    result = filterApplications(result, filters)
    result = sortApplications(result, sortBy, sortOrder)

    return result
  }, [applications, searchTerm, filters, sortBy, sortOrder])

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setSearchTerm('')
    setFilters({
      university: 'all',
      course: 'all',
      status: 'all'
    })
    setSortBy('lodgeDate')
    setSortOrder('desc')
  }, [])

  // Handle export
  const handleExport = useCallback(() => {
    exportToCSV(filteredAndSortedApps, `visa-applications-${new Date().toISOString().split('T')[0]}.csv`)
  }, [filteredAndSortedApps])

  return (
    <div className="applications-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-left">
            <h1 className="page-title">
              <FaListAlt className="page-icon" />
              All Applications
            </h1>
            <p className="page-subtitle">
              Showing {filteredAndSortedApps.length} of {applications.length} applications
            </p>
          </div>
          <div className="header-actions">
            <button className="header-btn export-btn" onClick={handleExport}>
              <FaDownload />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards stats={stats} />

        {/* Search Bar */}
        <div className="search-section">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, university, or course..."
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          applications={applications}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onReset={handleResetFilters}
        />

        {/* Applications Table - View Only */}
        <div className="table-section">
          <ApplicationsTable
            applications={filteredAndSortedApps}
            compact={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Applications