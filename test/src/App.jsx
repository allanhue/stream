import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import Categories from './pages/categories';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Sidebar from './components/Sidebar';
import { Movies } from './pages/Movies'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;