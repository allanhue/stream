import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
// import Login from './pages/Login'
// import Profile from './pages/Profile'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      {/* navigation bar using Link instead of a tags */}
      <nav className="flex justify-center space-x-4">
        {/* <Link to="/" className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Home
        </Link> */}
             <Link to="/Services" className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Services
        </Link>
        <Link to="/Contact" className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Contact
        </Link>
        <Link to="/login" className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Login
        </Link>
        <Link to="/profile" className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Profile
        </Link>
      </nav>

      {/* Define routes */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
