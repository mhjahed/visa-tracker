import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {
  FaHome,
  FaListAlt,
  FaChartBar,
  FaChartPie,
  FaCog,
  FaCode,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import '../styles/Navbar.css'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img
            src="/australia-flag.png"
            alt="Australia Flag"
            className="navbar-flag"
          />
          <span className="navbar-title">Visa Tracker &nbsp; </span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/applications" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaListAlt />
              <span>Applications</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaChartBar />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/statistics" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaChartPie />
              <span>Statistics</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/developer" onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }>
              <FaCode />
              <span>Developer</span>
            </NavLink>
          </li>

          {/* Theme toggle */}
          <li className="theme-toggle-wrapper">
            <button
              className="navbar-theme-toggle"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
