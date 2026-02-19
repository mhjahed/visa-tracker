import { format, parseISO } from 'date-fns'

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    return format(parseISO(dateString), 'dd MMM yyyy')
  } catch {
    return dateString
  }
}

// Format date for input fields
export const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  return dateString
}

// University logo mapping - matches your exact filenames
const universityLogoMap = {
  'Adelaide University': 'Adelaide University.png',
  'AIBI': 'AIBI.png',
  'Box Hill Institute': 'Box Hill Institute.png',
  'Catholic Schools NSW': 'Catholic Schools NSW.jpg',
  'Charles Darwin University': 'Charles Darwin University.png',
  'Charles Sturt University': 'Charles Sturt University.png',
  'CQ University': 'CQ University.png',
  'Curtin University': 'Curtin University.jpg',
  'Deakin University': 'Deakin University.png',
  'Edith Cowan University': 'Edith Cowan University.png',
  'Federation University': 'Federation University.png',
  'Flinders University': 'Flinders University.png',
  'GLI': 'GLI.webp',
  'Griffith University': 'Griffith University.png',
  'ICMS': 'ICMS.png',
  'James Cook University': 'James Cook University.png',
  'Kaplan Business School': 'Kaplan business School.jpg',
  'KOI': 'KOI.png',
  'La Trobe University': 'La Trobe University.png',
  'Macquarie University': 'Macquarie University.png',
  'Melbourne Institute of Technology': 'Melbourne Institute of Technology.jpg',
  'Murdoch University': 'Murdoch University.jpg',
  'RMIT': 'RMIT.png',
  'SIHE': 'SIHE.png',
  'SISH': 'SISH.png',
  'Sydney Met': 'Sydney Met.png',
  'TAFE NSW': 'TAFE NSW.png',
  'Torrens University': 'Torrens University.jpg',
  'UHE': 'UHE.png',
  'University of Canberra': 'University of Canberra.png',
  'University of New England': 'University of New England.png',
  'University of Newcastle': 'University of Newcastle.png',
  'University of Queensland': 'University of Queensland.jpg',
  'University of Sunshine Coast': 'University of Sunshine Coast.png',
  'University of Tasmania': 'University of Tasmania.png',
  'University of Western Australia': 'University of Western Australia.png',
  'University of Western Sydney': 'University of Western Sydney.png',
  'University of Wollongong': 'University of Wollongong.png',
  'Victoria University': 'Victoria University.png',
  'Institution': 'Undefined.png',
  'Queensland University of Technology': 'Queensland University of Technology.jpg',
  'University of Southern Queensland': 'University of Southern Queensland.png',
}

// List of all universities for dropdowns
export const universityList = Object.keys(universityLogoMap).sort()

// Get university logo path
export const getUniversityLogo = (universityName) => {
  if (!universityName) return '/logos/Undefined.png'
  const logoFile = universityLogoMap[universityName]
  if (logoFile) {
    return `/logos/${logoFile}`
  }
  return '/logos/Undefined.png'
}

// Course types for dropdown
export const courseList = [
  'Bachelor of IT',
  'Bachelor of Commerce',
  'Bachelor Program',
  'Cybersecurity',
  'Bachelor of Science',
  'Bachelor of Business',
  'Bachelor of Engineering',
  'Bachelor of Science',
  'Bachelor of Nursing',
  'Bachelor of Arts',
  'Bachelor of Design',
  'Bachelor of Law',
  'Bachelor of Education',
  'Nursing',
  'Health Science',
  'Early Childhood Education',
  'Masters Program',
  'Master of Science',
  'Masters of Data Analytics',
  'Master of Data Science',
  'Master of Business',
  'Master of Business Administration',
  'Master of Engineering',
  'Master of Cyber Security',
  'Master of Architecture',
  'Master of Education',
  'Master of Psychology',
  'Master of Public Health',
  'Master of Accounting',
  'Master of Business Analytics',
  'Master of Marketing',
  'Graduate Diploma',
  'Diploma',
  'AEP/EAP',
  'Diploma of IT',
  'Diploma of Business',
  'Certificate IV',
  'PhD'
].sort()

// Get course icon filename
export const getCourseIcon = (courseName) => {
  if (!courseName) return '/course-icons/default.png'
  
  const courseType = courseName.toLowerCase()
  
  if (courseType.includes('it') || courseType.includes('computer') || courseType.includes('cyber') || courseType.includes('data')) {
    return '/course-icons/it.png'
  }
  if (courseType.includes('business') || courseType.includes('commerce') || courseType.includes('mba') || courseType.includes('accounting') || courseType.includes('marketing')) {
    return '/course-icons/business.png'
  }
  if (courseType.includes('engineering')) {
    return '/course-icons/engineering.png'
  }
  if (courseType.includes('science')) {
    return '/course-icons/science.png'
  }
  if (courseType.includes('nursing') || courseType.includes('health')) {
    return '/course-icons/health.png'
  }
  if (courseType.includes('education')) {
    return '/course-icons/education.png'
  }
  if (courseType.includes('law')) {
    return '/course-icons/law.png'
  }
  if (courseType.includes('art') || courseType.includes('design')) {
    return '/course-icons/arts.png'
  }
  if (courseType.includes('architecture')) {
    return '/course-icons/architecture.png'
  }
  if (courseType.includes('psychology')) {
    return '/course-icons/psychology.png'
  }
  if (courseType.includes('diploma') || courseType.includes('certificate')) {
    return '/course-icons/diploma.png'
  }
  if (courseType.includes('phd')) {
    return '/course-icons/phd.png'
  }
  
  return '/course-icons/default.png'
}

// Get status badge class
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Granted':
      return 'badge-granted'
    case 'Refused':
      return 'badge-refused'
    case 'Under Process':
      return 'badge-pending'
    default:
      return 'badge-default'
  }
}

// Get row class based on status
export const getRowClass = (status) => {
  switch (status) {
    case 'Granted':
      return 'row-granted'
    case 'Refused':
      return 'row-refused'
    default:
      return ''
  }
}

// Sort applications
export const sortApplications = (applications, sortBy, sortOrder) => {
  return [...applications].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'lodgeDate':
        comparison = new Date(a.lodgeDate) - new Date(b.lodgeDate)
        break
      case 'applicantName':
        comparison = a.applicantName.localeCompare(b.applicantName)
        break
      case 'university':
        comparison = a.university.localeCompare(b.university)
        break
      case 'course':
        comparison = a.course.localeCompare(b.course)
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'finalisedDate':
        if (!a.finalisedDate && !b.finalisedDate) comparison = 0
        else if (!a.finalisedDate) comparison = 1
        else if (!b.finalisedDate) comparison = -1
        else comparison = new Date(a.finalisedDate) - new Date(b.finalisedDate)
        break
      default:
        comparison = 0
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })
}

// Filter applications
export const filterApplications = (applications, filters) => {
  return applications.filter(app => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch = 
        app.applicantName.toLowerCase().includes(searchTerm) ||
        app.university.toLowerCase().includes(searchTerm) ||
        app.course.toLowerCase().includes(searchTerm)
      if (!matchesSearch) return false
    }
    
    // University filter
    if (filters.university && filters.university !== 'all') {
      if (app.university !== filters.university) return false
    }
    
    // Course filter
    if (filters.course && filters.course !== 'all') {
      if (app.course !== filters.course) return false
    }
    
    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (app.status !== filters.status) return false
    }
    
    return true
  })
}

// Get unique values for filter dropdowns
export const getUniqueValues = (applications, field) => {
  const values = [...new Set(applications.map(app => app[field]))]
  return values.sort()
}

// Export to CSV
export const exportToCSV = (applications, filename = 'visa-applications.csv') => {
  const headers = [
    'ID',
    'Lodge Date',
    'Applicant Name',
    'Further Assessment Date',
    'University',
    'Course',
    'Status',
    'Finalised Date'
  ]
  
  const rows = applications.map(app => [
    app.id,
    app.lodgeDate,
    app.applicantName,
    app.furtherAssessmentDate || '',
    app.university,
    app.course,
    app.status,
    app.finalisedDate || ''
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

// Import from CSV (parse CSV string)
export const parseCSV = (csvString) => {
  const lines = csvString.split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
  
  const applications = []
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    
    const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim())
    const app = {
      id: values[0] || crypto.randomUUID(),
      lodgeDate: values[1],
      applicantName: values[2],
      furtherAssessmentDate: values[3] || null,
      university: values[4],
      course: values[5],
      status: values[6],
      finalisedDate: values[7] || null
    }
    applications.push(app)
  }
  
  return applications
}
