import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductAR from './pages/ProductAR';
import HomePage from './pages/HomePage';
import AdminQR from './pages/AdminQR';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ar/:sku" element={<ProductAR />} />
        <Route path="/admin/qr" element={<AdminQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
