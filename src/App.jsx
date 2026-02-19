import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import Applications from './pages/Applications'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import Developer from './pages/Developer'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <ScrollToTopButton />
    </div>
  )
}

export default App