import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBill from './pages/CreateBill';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Bill Splitter</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/create-bill" element={<CreateBill />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
