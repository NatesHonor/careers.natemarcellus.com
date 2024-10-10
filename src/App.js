import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Main from './pages/Main';
import Footer from './components/Footer';
import Header from './components/Header';
import Contact from './pages/Contact';
import Listings from './pages/Listings';
import JobPage from './pages/JobPage';

function App() {
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {});
    ro.observe(document.body);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/jobs/:jobID" element={<JobPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
