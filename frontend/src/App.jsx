import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductAR from './pages/ProductAR';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ar/:sku" element={<ProductAR />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
