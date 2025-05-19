import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import Sidebar from '@components/Sidebar';
// import { SubscriptionGuard } from './components/SubscriptionGuard';
import { ProtectedRoute } from '@components/ProtectedRoute';
// import ErrorBoundary from './components/ErrorBoundary'; 
import { Spinner } from '@components/Spinner';
import { MovieProvider } from './contexts/MovieContext';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import ContinueWatching from './pages/ContinueWatching';


// Lazy-loaded components
const Login = lazy(() => import('./pages/Login'));
const Movies = lazy(() => import('./pages/Movies'));
const Series = lazy(() => import('./pages/Series'));
const Categories = lazy(() => import('./pages/categories'));
const Contact = lazy(() => import('./pages/Contact'));
const Payment = lazy(() => import('./pages/Payment'));
const Profile = lazy(() => import('./pages/Profile'));
const Services = lazy(() => import('./pages/Services'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-gray-950">
          <div className="flex">
            <Sidebar isVisible={isSidebarVisible} onVisibilityChange={setIsSidebarVisible} />
            <main className={`flex-1 transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'} p-8`}>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/movies" 
                    element={
                      <ProtectedRoute>
                        <Movies />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/series" 
                    element={
                      <ProtectedRoute>
                        <Series />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/payment" 
                    element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/categories" 
                    element={
                      <ProtectedRoute>
                        <Categories />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <ProtectedRoute>
                        <Contact />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/services" 
                    element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/continue-watching" element={<ContinueWatching />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;