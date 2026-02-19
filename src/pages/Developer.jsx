import React from 'react'
import { 
  FaGithub, 
  FaGlobe, 
  FaCode, 
  FaLinkedin,
  FaHeart,
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaDatabase,
  FaPython,
  FaHtml5,
  FaGitAlt,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaBrain,
  FaTable,
  FaCalculator,
  FaFileExcel,
  FaServer,
  FaChartArea,
  FaLaptopCode,
  FaCogs,
  FaProjectDiagram
} from 'react-icons/fa'
import { 
  SiVite, 
  SiChartdotjs, 
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiCplusplus,
  SiMysql
} from 'react-icons/si'
import '../styles/Developer.css'

const Developer = () => {
  // DEVELOPER 1 - MH Jahed
  const developer1 = {
    name: "MH Jahed",
    title: "Full Stack Developer",
    role: "Lead Developer",
    tagline: "Building modern web applications with passion",
    github: "https://github.com/mhjahed",
    website: "https://mhjahedportfolio.netlify.app",
    skills: ["React", "Python", "C++", "C", "C#", "Next JS", "JavaScript", "Node JS", "Tailwind CSS", "CSS", "HTML", "Git"],
    icon: FaCode,
    color: "#7c3aed"
  }

  const developer1TechStack = [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Database", icon: FaDatabase, color: "#4DB33D" }
  ]

  // DEVELOPER 2 - Amit (Data Analyst)
  const developer2 = {
    name: "MD Amit Hossain",
    title: "Data Analyst",
    role: "Data & Analytics Lead",
    tagline: "Transforming data into actionable insights and predictions",
    github: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/mdamithossain/",  // ← Add Amit's LinkedIn URL here
    skills: ["Data Analysis", "Python", "Excel", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Predictive Analytics", "Reporting", "Data Mining"],
    icon: FaChartBar,
    color: "#06b6d4"
  }

  const developer2TechStack = [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Excel", icon: FaFileExcel, color: "#217346" },
    { name: "SQL", icon: SiMysql, color: "#4479A1" },
    { name: "Statistics", icon: FaCalculator, color: "#9333ea" },
    { name: "Charts", icon: SiChartdotjs, color: "#FF6384" },
    { name: "Analytics", icon: FaChartLine, color: "#06b6d4" },
    { name: "ML", icon: FaBrain, color: "#ec4899" },
    { name: "Data", icon: FaTable, color: "#f59e0b" },
    { name: "Reports", icon: FaChartPie, color: "#22c55e" },
    { name: "Visualize", icon: FaChartArea, color: "#8b5cf6" },
    { name: "Database", icon: FaDatabase, color: "#4DB33D" },
    { name: "Pipeline", icon: FaProjectDiagram, color: "#ef4444" }
  ]

  // Project Info
  const projectInfo = {
    name: "Australian Student Visa Tracker",
    version: "1.9.7"
  }

  return (
    <div className="developer-page">
      <div className="developer-container">
        
        {/* Page Header */}
        <div className="dev-page-header">
          <h1 className="dev-page-title">
            <FaHeart className="heart-icon-title" />
            Meet The Team
          </h1>
          <p className="dev-page-subtitle">
            The individuals behind the Australian Student Visa Tracker
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          
          {/* Developer 1 - MH Jahed */}
          <div className="developer-card">
            <div className="card-glow" style={{ background: `linear-gradient(135deg, ${developer1.color}, #ec4899)` }}></div>
            
            <div className="card-header">
              <div className="avatar-container">
                <div className="avatar-ring" style={{ background: `linear-gradient(135deg, ${developer1.color}, #06b6d4, #ec4899)` }}>
                  <div className="avatar">
                    <developer1.icon className="avatar-icon" style={{ color: developer1.color }} />
                  </div>
                </div>
                <div className="role-badge lead">
                  <span>{developer1.role}</span>
                </div>
              </div>
            </div>
<br></br>
            <div className="card-body">
              <h2 className="developer-name">{developer1.name}</h2>
              <p className="developer-title" style={{ color: developer1.color }}>{developer1.title}</p>
              <p className="developer-tagline">{developer1.tagline}</p>

              {/* Skills */}
              <div className="skills-container">
                {developer1.skills.map((skill, index) => (
                  <span key={index} className="skill-tag" style={{ borderColor: developer1.color, color: developer1.color }}>{skill}</span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mini-tech-stack">
                {developer1TechStack.slice(0, 8).map((tech, index) => (
                  <div key={index} className="mini-tech-item" title={tech.name}>
                    <tech.icon style={{ color: tech.color }} />
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-links">
                <a 
                  href={developer1.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a 
                  href={developer1.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link website"
                >
                  <FaGlobe />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Developer 2 - Amit */}
          <div className="developer-card">
            <div className="card-glow" style={{ background: `linear-gradient(135deg, ${developer2.color}, #22c55e)` }}></div>
            
            <div className="card-header">
              <div className="avatar-container">
                <div className="avatar-ring" style={{ background: `linear-gradient(135deg, ${developer2.color}, #22c55e, #eab308)` }}>
                  <div className="avatar">
                    <developer2.icon className="avatar-icon" style={{ color: developer2.color }} />
                  </div>
                </div>
                <div className="role-badge analyst">
                  <span>{developer2.role}</span>
                </div>
              </div>
            </div>
<br></br>
            <div className="card-body">
              <h2 className="developer-name">{developer2.name}</h2>
              <p className="developer-title" style={{ color: developer2.color }}>{developer2.title}</p>
              <p className="developer-tagline">{developer2.tagline}</p>

              {/* Skills */}
              <div className="skills-container">
                {developer2.skills.map((skill, index) => (
                  <span key={index} className="skill-tag" style={{ borderColor: developer2.color, color: developer2.color }}>{skill}</span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mini-tech-stack">
                {developer2TechStack.slice(0, 8).map((tech, index) => (
                  <div key={index} className="mini-tech-item" title={tech.name}>
                    <tech.icon style={{ color: tech.color }} />
                  </div>
                ))}
              </div>
              {/* Social Links */}
              <div className="social-links" style={{ marginBottom: '16px' }}>
                <a 
                  href={developer2.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  style={{
                    background: 'linear-gradient(135deg, #0077B5, #00A0DC)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Contribution Info */}
              <div className="contribution-info">
                <div className="contribution-item">
                  <FaTable className="contrib-icon" />
                  <span>Data Collection & Preparation</span>
                </div>
                <div className="contribution-item">
                  <FaChartPie className="contrib-icon" />
                  <span>Statistical Analysis</span>
                </div>
                <div className="contribution-item">
                  <FaBrain className="contrib-icon" />
                  <span>Predictive Modeling</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info Card */}
        <div className="project-card">
          <h2 className="project-title">
            <FaCode className="project-icon" />
            {projectInfo.name}
          </h2>
          <p className="project-version">Version {projectInfo.version}</p>
          
          {/* Combined Tech Stack */}
          <div className="tech-stack">
            <h3>Technologies Used</h3>
            <div className="tech-grid">
              {[...developer1TechStack.slice(0, 6), ...developer2TechStack.slice(0, 6)].map((tech, index) => (
                <div key={index} className="tech-item">
                  <tech.icon 
                    className="tech-icon" 
                    style={{ color: tech.color }} 
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="features-list">
            <h3>Key Features</h3>
            <ul>
              <li>📊 Real-time visa application tracking</li>
              <li>📈 Interactive charts and analytics</li>
              <li>🔮 Predictive analysis & probability insights</li>
              <li>🎨 Beautiful, responsive design</li>
              <li>🌙 Dark mode support</li>
              <li>📱 Mobile-friendly interface</li>
              <li>💾 Local data persistence</li>
              <li>📤 Export functionality (JSON & CSV)</li>
              <li>🔐 Admin panel with passcode protection</li>
            </ul>
          </div>
        </div>

        {/* Team Contributions Card */}
        <div className="contributions-card">
          <h2>Team Contributions</h2>
          <div className="contributions-grid">
            <div className="contrib-section">
              <div className="contrib-header">
                <FaLaptopCode className="contrib-section-icon" style={{ color: '#7c3aed' }} />
                <h3>Development</h3>
              </div>
              <p>MH Jahed</p>
              <ul>
                <li>Frontend Development (React)</li>
                <li>UI/UX Design</li>
                <li>Backend Logic</li>
                <li>Deployment & DevOps</li>
              </ul>
            </div>
            <div className="contrib-section">
              <div className="contrib-header">
                <FaChartBar className="contrib-section-icon" style={{ color: '#06b6d4' }} />
                <h3>Data & Analytics</h3>
              </div>
              <p>Amit</p>
              <ul>
                <li>Data Collection & Preparation</li>
                <li>Statistical Analysis</li>
                <li>Predictive Modeling</li>
                <li>Probability Calculations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="thank-you-card">
          <h2>Thank You!</h2>
          <p>
            Thank you for using the Australian Student Visa Tracker. 
            This project was created collaboratively to help students and agents track 
            visa applications efficiently with data-driven insights.
          </p>
          <p>
            If you find this useful, please consider giving it a star on GitHub!
          </p>
          <a 
            href={developer1.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="star-btn"
          >
            <FaGithub />
            Star on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default Developer
