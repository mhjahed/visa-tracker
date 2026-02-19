import React, { createContext, useContext, useState, useEffect } from 'react'
import initialData from '../data/applications.json'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to JSON data
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('visaApplications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return initialData
      }
    }
    return initialData
  })

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('visaApplications', JSON.stringify(applications))
  }, [applications])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Add new application
  const addApplication = (application) => {
    setApplications(prev => [...prev, application])
  }

  // Update existing application
  const updateApplication = (id, updatedData) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, ...updatedData } : app))
    )
  }

  // Delete application
  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id))
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  // Import data from JSON
  const importData = (data) => {
    setApplications(data)
  }

  // Export data
  const exportData = () => {
    return applications
  }

  // Reset to initial data
  const resetData = () => {
    setApplications(initialData)
    localStorage.setItem('visaApplications', JSON.stringify(initialData))
  }

  const value = {
    applications,
    setApplications,
    addApplication,
    updateApplication,
    deleteApplication,
    darkMode,
    toggleDarkMode,
    importData,
    exportData,
    resetData
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}