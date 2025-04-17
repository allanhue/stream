import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Movies from './pages/movies';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-black text-white">
        {/* Desktop Sidebar */}
        <div 
          className={`bg-gray-900 fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out hidden md:block
                      ${isOpen ? 'w-64' : 'w-20'}`}
        >
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {isOpen ? (
              <Link to="/" className="flex items-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">LanPrime</span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center justify-center w-full">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">LP</span>
              </Link>
            )}
            
            <button 
              onClick={toggleSidebar} 
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                </svg>
              )}
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="mt-6">
            <ul>
              <li className="px-4 py-2">
                <NavLink 
                  to="/" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  {isOpen && <span className="ml-3">Home</span>}
                </NavLink>
              </li>
              <li className="px-4 py-2">
                <NavLink 
                  to="/services" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  {isOpen && <span className="ml-3">Services</span>}
                </NavLink>
              </li>
              <li className="px-4 py-2">
                <NavLink 
                  to="/about" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {isOpen && <span className="ml-3">About</span>}
                </NavLink>
              </li>
              <li className="px-4 py-2">
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {isOpen && <span className="ml-3">Contact</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
          
          {/* Auth Links */}
          <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
            <ul>
              <li className="px-4 py-2">
                <NavLink 
                  to="/login" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  {isOpen && <span className="ml-3">Login</span>}
                </NavLink>
              </li>
              <li className="px-4 py-2">
                <NavLink 
                  to="/profile" 
                  className={({isActive}) => `
                    flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                    ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {isOpen && <span className="ml-3">Profile</span>}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="fixed top-4 left-4 z-40 md:hidden">
          <button 
            onClick={toggleMobileSidebar}
            className="text-gray-400 hover:text-white focus:outline-none p-2 bg-gray-900 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Sidebar */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={toggleMobileSidebar}>
            <div 
              className="fixed left-0 top-0 h-full w-64 bg-gray-900 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold text-green-500">LanPrime</span>
                </Link>
                <button 
                  onClick={toggleMobileSidebar}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <nav className="mt-6">
                <ul>
                  <li className="py-2">
                    <NavLink 
                      to="/" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      <span className="ml-3">Home</span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink 
                      to="/services" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                      </svg>
                      <span className="ml-3">Services</span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink 
                      to="/about" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="ml-3">About</span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink 
                      to="/contact" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span className="ml-3">Contact</span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink 
                      to="/login" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      </svg>
                      <span className="ml-3">Login</span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink 
                      to="/profile" 
                      className={({isActive}) => `
                        flex items-center px-4 py-2 rounded-lg transition-colors duration-300
                        ${isActive ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                      `}
                      onClick={toggleMobileSidebar}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="ml-3">Profile</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <main className="min-h-screen bg-black">
            <Routes>
                      <Route path="/movies" element={<Movies />} />

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;