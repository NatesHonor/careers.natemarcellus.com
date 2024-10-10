import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Main from './pages/Main';
import Footer from './components/Footer';
import Header from './components/Header';
import Contact from './pages/Contact';
import Listings from './pages/Listings';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/listings" element={<Listings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
