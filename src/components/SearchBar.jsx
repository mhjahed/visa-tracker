import React from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import '../styles/Components.css'

const SearchBar = ({ value, onChange, placeholder = "Search by name, university, or course..." }) => {
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={handleClear}>
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default SearchBar