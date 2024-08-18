import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Notebooks from './components/Notebooks';
import Pencils from './components/Pencils';
import ArtisticCollection from './components/ArtisticCollection';
import CollegeCollection from './components/CollegeCollection';
import OfficeEssentials from './components/OfficeEssentials';
import PrinterEssentials from './components/PrinterEssentials';
import './App.css'; // Adjust the path if necessary

function Home() {
  return (
    <div className="Home">
      <header>
        <h1>Online Stationery Store</h1>
      </header>
      
      <main className="products-container">
        <section className="products">
          <a href="/notebooks" target="_blank" className="product-link">
            <img src="/images/notebooks.jpg" alt="Notebooks" />
            <h2>Notebooks & Planners</h2>
            <div className="description-container">
              <p className="description">Browse our collection of high-quality notebooks for every need.</p>
            </div>
          </a>
        </section>
        
        <section className="products">
          <a href="/pencils" target="_blank" className="product-link">
            <img src="/images/pens.jpg" alt="Pens" />
            <h2>Writing Essentials</h2>
            <div className="description-container">
              <p className="description">Find the perfect pens and pencils for your writing or drawing needs.</p>
            </div>
          </a>
        </section>
        
        <section className="products">
          <a href="/artistic-collection" target="_blank" className="product-link">
            <img src="/images/artistic_collection.jpg" alt="Artistic Collection" />
            <h2>Artistic Collection</h2>
            <div className="description-container">
              <p className="description">Explore our range of artistic supplies for creative projects.</p>
            </div>
          </a>
        </section>

        <section className="products">
          <a href="/college-collection" target="_blank" className="product-link">
            <img src="/images/college_collection.jpg" alt="College Collection" />
            <h2>College Collection</h2>
            <div className="description-container">
              <p className="description">Discover essential items for college students.</p>
            </div>
          </a>
        </section>
        
        <section className="products">
          <a href="/office-essentials" target="_blank" className="product-link">
            <img src="/images/office_essentials.jpg" alt="Office Essentials" />
            <h2>Office Use Essentials</h2>
            <div className="description-container">
              <p className="description">Stock up on the essentials for a well-equipped office.</p>
            </div>
          </a>
        </section>
        
        <section className="products">
          <a href="/printer-essentials" target="_blank" className="product-link">
            <img src="/images/printer_essentials.jpg" alt="Printer Essentials" />
            <h2>Printer Essentials</h2>
            <div className="description-container">
              <p className="description">Find everything you need for your printing needs.</p>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/pencils" element={<Pencils />} />
        <Route path="/artistic-collection" element={<ArtisticCollection />} />
        <Route path="/college-collection" element={<CollegeCollection />} />
        <Route path="/office-essentials" element={<OfficeEssentials />} />
        <Route path="/printer-essentials" element={<PrinterEssentials />} />
      </Routes>
    </Router>
  );
}

export default App;
