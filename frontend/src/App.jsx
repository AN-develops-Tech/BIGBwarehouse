import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CompanyProvider>
    </Router>
  );
}

export default App;
