import React, { useState, useEffect } from 'react'
import { 
  FaCalendarAlt, 
  FaClock, 
  FaSync, 
  FaBell,
  FaCheckCircle,
  FaHourglassHalf
} from 'react-icons/fa'
import { useAppContext } from '../context/AppContext'
import '../styles/UpdateInfo.css'

const UpdateInfo = () => {
  const { darkMode } = useAppContext()

  // ============================================
  // 🔧 DEVELOPER: CHANGE THESE DATES AS NEEDED
  // ============================================
  const LAST_UPDATE = "2024-02-25T10:30:00"  // Format: YYYY-MM-DDTHH:MM:SS
  const NEXT_UPDATE = "2024-02-25T22:00:00"  // Format: YYYY-MM-DDTHH:MM:SS
  // ============================================

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }
    return date.toLocaleString('en-US', options)
  }

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(NEXT_UPDATE).getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setIsExpired(false)
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [NEXT_UPDATE])

  // Pad number with zero
  const padZero = (num) => String(num).padStart(2, '0')

  return (
    <div className={`update-info-section ${darkMode ? 'dark' : 'light'}`}>
      <div className="update-info-container">
        {/* Last Update Card */}
        <div className="update-card last-update">
          <div className="update-card-glow"></div>
          <div className="update-card-inner">
            <div className="update-card-icon">
              <FaCheckCircle />
            </div>
            <div className="update-card-content">
              <div className="update-card-header">
                <FaSync className="header-icon spin" />
                <span className="update-card-label">Last Updated</span>
              </div>
              <p className="update-card-value">{formatDate(LAST_UPDATE)}</p>
              <div className="update-card-footer">
                <FaCalendarAlt />
                <span>Data is up to date</span>
              </div>
            </div>
            <div className="update-card-badge success">
              <span className="badge-dot"></span>
              <span>Latest</span>
            </div>
          </div>
        </div>

        {/* Next Update Card with Countdown */}
        <div className={`update-card next-update ${isExpired ? 'expired' : ''}`}>
          <div className="update-card-glow"></div>
          <div className="update-card-inner">
            <div className="update-card-icon">
              {isExpired ? <FaBell className="shake" /> : <FaHourglassHalf className="flip" />}
            </div>
            <div className="update-card-content">
              <div className="update-card-header">
                <FaClock className="header-icon" />
                <span className="update-card-label">
                  {isExpired ? 'Update Status' : 'Next Update In'}
                </span>
              </div>
              
              {isExpired ? (
                <p className="update-card-value expired-text">
                  Update Available Soon!
                </p>
              ) : (
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <div className="countdown-value-wrapper">
                      <span className="countdown-value">{padZero(timeLeft.days)}</span>
                    </div>
                    <span className="countdown-label">Days</span>
                  </div>
                  <span className="countdown-separator">:</span>
                  <div className="countdown-item">
                    <div className="countdown-value-wrapper">
                      <span className="countdown-value">{padZero(timeLeft.hours)}</span>
                    </div>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <span className="countdown-separator">:</span>
                  <div className="countdown-item">
                    <div className="countdown-value-wrapper">
                      <span className="countdown-value">{padZero(timeLeft.minutes)}</span>
                    </div>
                    <span className="countdown-label">Mins</span>
                  </div>
                  <span className="countdown-separator">:</span>
                  <div className="countdown-item">
                    <div className="countdown-value-wrapper">
                      <span className="countdown-value">{padZero(timeLeft.seconds)}</span>
                    </div>
                    <span className="countdown-label">Secs</span>
                  </div>
                </div>
              )}
              
              <div className="update-card-footer">
                <FaBell />
                <span>{isExpired ? 'Check back soon' : 'Stay tuned for updates'}</span>
              </div>
            </div>
            <div className={`update-card-badge ${isExpired ? 'pending' : 'upcoming'}`}>
              <span className="badge-dot"></span>
              <span>{isExpired ? 'Pending' : 'Upcoming'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateInfo
