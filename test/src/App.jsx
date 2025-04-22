import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/movies'; 
import Series from './pages/Series';
import Categories from './pages/categories';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Sidebar from './components/Sidebar';
import { SubscriptionGuard } from './components/SubscriptionGuard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
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
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;