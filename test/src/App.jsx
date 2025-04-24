import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { SubscriptionGuard } from './components/SubscriptionGuard';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary'; 
import Spinner from './components/Spinner';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Movies = lazy(() => import('./pages/Movies'));
const Series = lazy(() => import('./pages/Series'));
const Categories = lazy(() => import('./pages/Categories'));
const Contact = lazy(() => import('./pages/Contact'));
const Payment = lazy(() => import('./pages/Payment'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-950">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Suspense fallback={<LoadingSpinner />}>
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
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;