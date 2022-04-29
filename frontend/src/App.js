import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddProductPage from './Pages/AddProductPage';
import AllProductsPage from './Pages/AllProductsPage';
import LoginPage from './Pages/LoginPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import RegistrationPage from './Pages/RegistrationPage';
import WishlistPage from './Pages/WishlistPage';

function App() {
  const [token, setToken] = useState(null)
  const logout = () => setToken(null)
  console.log("token: ", token)
  return (
    <div className="App">
     <BrowserRouter>
      <Navigation token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
        <Route path="/shop" element={<AllProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/addProduct" element={<AddProductPage token={token} />} />

        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route path="/wishlist" element={<WishlistPage token={token} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;


// Todo:
    
//     * E-Mail Verification    
//     * Refresh Token!!

//     * Add To Wishlist Feature...
//     * exisitierende Product Variations als Vorschlag beim form

// New Features:
//     * Edit Product
//     * Forgot Password / Password Reset
