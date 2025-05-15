import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Sidebar from '@components/Sidebar';
// import { SubscriptionGuard } from './components/SubscriptionGuard';
import { ProtectedRoute } from '@components/ProtectedRoute';
// import ErrorBoundary from './components/ErrorBoundary'; 
import { Spinner } from '@components/Spinner';


// Lazy-loaded components
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Movies = lazy(() => import('./pages/Movies.jsx'));
const Series = lazy(() => import('./pages/Series.jsx'));
const Categories = lazy(() => import('./pages/categories.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Payment = lazy(() => import('./pages/Payment.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));

function App() {
  return (
    <Router>
        <div className="min-h-screen bg-gray-950">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route 
                    path="/" 
                    element={<Home />} 
                  />
                  <Route 
                    path="/login" 
                    element={<Login />} 
                  />
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
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
    </Router>
  );
}

export default App;