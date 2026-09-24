import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <Router>
      <CompanyProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="location" element={<Contact />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          {/* Hidden Admin Routes */}
          <Route path="admin-portal" element={<AdminPortal />} />
          <Route path="admin" element={<AdminPortal />} />
        </Routes>
      </CompanyProvider>
    </Router>
  );
}

export default App;
