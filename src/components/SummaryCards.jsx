import React from 'react'
import { 
  FaClipboardList, 
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle,
  FaClock,
  FaPercentage
} from 'react-icons/fa'
import '../styles/Components.css'

const SummaryCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: FaClipboardList,
      color: 'primary',
      description: 'All applications'
    },
    {
      title: 'Under Process',
      value: stats.underProcess,
      icon: FaSpinner,
      color: 'warning',
      description: 'Awaiting decision'
    },
    {
      title: 'Granted',
      value: stats.granted,
      icon: FaCheckCircle,
      color: 'success',
      description: 'Visa approved'
    },
    {
      title: 'Refused',
      value: stats.refused,
      icon: FaTimesCircle,
      color: 'danger',
      description: 'Visa denied'
    },
    {
      title: 'Avg. Waiting Time',
      value: `${stats.avgWaitingTime} days`,
      icon: FaClock,
      color: 'info',
      description: 'Average processing'
    },
    {
      title: 'Grant Ratio',
      value: `${stats.grantRatio}%`,
      icon: FaPercentage,
      color: 'purple',
      description: 'Success rate'
    }
  ]

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div key={index} className={`summary-card card-${card.color}`}>
          <div className="card-icon-wrapper">
            <card.icon className="card-icon" />
          </div>
          <div className="card-content">
            <h3 className="card-value">{card.value}</h3>
            <p className="card-title">{card.title}</p>
            <span className="card-description">{card.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards