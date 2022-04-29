import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddProductPage from './Pages/AddProductPage';
import AllProductsPage from './Pages/AllProductsPage';
import LoginPage from './Pages/LoginPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import RegistrationPage from './Pages/RegistrationPage';

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
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;


// Todo:
    
//     * Add Product -> Product image + Variations

//     * Registartion Feature (Form + connect to backend)
//     * E-Mail Verification
    
//     * Refresh Token!!

//     * Add To Wishlist Feature...
//     * exisitierende Product Variations als Vorschlag beim form
    
// New Features:
//     * Edit Product
//     * Forgot Password / Password Reset
