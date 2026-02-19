import { differenceInDays, parseISO, format, subDays, isToday, isYesterday } from 'date-fns'

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  return format(new Date(), 'yyyy-MM-dd')
}

// Get yesterday's date
export const getYesterdayDate = () => {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd')
}

// Check if date is today
export const isDateToday = (dateString) => {
  if (!dateString) return false
  return isToday(parseISO(dateString))
}

// Check if date is yesterday
export const isDateYesterday = (dateString) => {
  if (!dateString) return false
  return isYesterday(parseISO(dateString))
}

// Calculate statistics from applications
export const calculateStatistics = (applications) => {
  const total = applications.length
  const underProcess = applications.filter(app => app.status === 'Under Process').length
  const granted = applications.filter(app => app.status === 'Granted').length
  const refused = applications.filter(app => app.status === 'Refused').length

  // Today's statistics
  const today = getTodayDate()
  const yesterday = getYesterdayDate()

  const grantedToday = applications.filter(
    app => app.status === 'Granted' && app.finalisedDate === today
  ).length

  const refusedToday = applications.filter(
    app => app.status === 'Refused' && app.finalisedDate === today
  ).length

  const grantedYesterday = applications.filter(
    app => app.status === 'Granted' && app.finalisedDate === yesterday
  ).length

  const refusedYesterday = applications.filter(
    app => app.status === 'Refused' && app.finalisedDate === yesterday
  ).length

  // Calculate average waiting time (in days)
  const finalisedApplications = applications.filter(
    app => app.finalisedDate && app.lodgeDate && app.status !== 'Under Process'
  )

  let avgWaitingTime = 0
  if (finalisedApplications.length > 0) {
    const totalDays = finalisedApplications.reduce((sum, app) => {
      const days = differenceInDays(parseISO(app.finalisedDate), parseISO(app.lodgeDate))
      return sum + days
    }, 0)
    avgWaitingTime = Math.round(totalDays / finalisedApplications.length)
  }

  // Calculate visa grant ratio
  const totalFinalised = granted + refused
  const grantRatio = totalFinalised > 0 ? ((granted / totalFinalised) * 100).toFixed(1) : 0

  return {
    total,
    underProcess,
    granted,
    refused,
    grantedToday,
    refusedToday,
    grantedYesterday,
    refusedYesterday,
    avgWaitingTime,
    grantRatio,
    totalFinalised
  }
}

// Get applications finalised today
export const getTodaysApplications = (applications) => {
  const today = getTodayDate()
  return applications.filter(app => app.finalisedDate === today)
}

// Get applications finalised yesterday
export const getYesterdaysApplications = (applications) => {
  const yesterday = getYesterdayDate()
  return applications.filter(app => app.finalisedDate === yesterday)
}

// Get today's and yesterday's applications combined
export const getRecentApplications = (applications) => {
  const today = getTodayDate()
  const yesterday = getYesterdayDate()
  return applications.filter(
    app => app.finalisedDate === today || app.finalisedDate === yesterday
  )
}

// Calculate waiting days for an application
export const calculateWaitingDays = (lodgeDate, finalisedDate = null) => {
  if (!lodgeDate) return 0
  const endDate = finalisedDate ? parseISO(finalisedDate) : new Date()
  return differenceInDays(endDate, parseISO(lodgeDate))
}

// Get 7-day trend data for charts
export const getSevenDayTrend = (applications) => {
  const trend = []
  
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd')
    const displayDate = format(subDays(new Date(), i), 'MMM dd')
    
    const granted = applications.filter(
      app => app.finalisedDate === date && app.status === 'Granted'
    ).length
    
    const refused = applications.filter(
      app => app.finalisedDate === date && app.status === 'Refused'
    ).length
    
    trend.push({
      date: displayDate,
      granted,
      refused
    })
  }
  
  return trend
}

// Get university-wise statistics
export const getUniversityStats = (applications) => {
  const stats = {}
  
  applications.forEach(app => {
    if (!stats[app.university]) {
      stats[app.university] = {
        total: 0,
        granted: 0,
        refused: 0,
        underProcess: 0
      }
    }
    stats[app.university].total++
    if (app.status === 'Granted') stats[app.university].granted++
    else if (app.status === 'Refused') stats[app.university].refused++
    else stats[app.university].underProcess++
  })
  
  return Object.entries(stats).map(([university, data]) => ({
    university,
    ...data,
    successRate: data.granted + data.refused > 0 
      ? ((data.granted / (data.granted + data.refused)) * 100).toFixed(1) 
      : 'N/A'
  }))
}

// Get course-wise statistics
export const getCourseStats = (applications) => {
  const stats = {}
  
  applications.forEach(app => {
    if (!stats[app.course]) {
      stats[app.course] = {
        total: 0,
        granted: 0,
        refused: 0,
        underProcess: 0
      }
    }
    stats[app.course].total++
    if (app.status === 'Granted') stats[app.course].granted++
    else if (app.status === 'Refused') stats[app.course].refused++
    else stats[app.course].underProcess++
  })
  
  return Object.entries(stats).map(([course, data]) => ({
    course,
    ...data,
    successRate: data.granted + data.refused > 0 
      ? ((data.granted / (data.granted + data.refused)) * 100).toFixed(1) 
      : 'N/A'
  }))
}