import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';


import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const MainContent = styled.main`
  min-height: 80vh;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <MainContent className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacto" element={<div className="text-center mt-5"><h2>Contacto: info@happypet.com</h2></div>} />

          <Route element={<ProtectedRoute requiredRole="user" />}>
            <Route path="/carrito" element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
      <Footer />
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
