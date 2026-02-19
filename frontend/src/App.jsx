import { Routes, Route, NavLink } from 'react-router-dom'
import Price from './pages/Price'
import Calculator from './pages/Calculator'
import History from './pages/History'
import Alert from './pages/Alert'
import './App.css'

const navItems = [
  { path: '/', label: 'ราคา', icon: '💰' },
  { path: '/calculator', label: 'คำนวณ', icon: '📊' },
  { path: '/history', label: 'ย้อนหลัง', icon: '📈' },
  { path: '/alert', label: 'แจ้งเตือน', icon: '🔔' },
]

function Layout({ children }) {
  return (
    <div className="app">
      <main className="main">{children}</main>
      <nav className="bottom-nav" aria-label="เมนูหลัก">
        {navItems.map(({ path, label, icon }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end={path === '/'}>
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Price />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/history" element={<History />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </Layout>
  )
}
