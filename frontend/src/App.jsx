import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import products from './data/products';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import OrderHistory from './pages/OrderHistory';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast.show) return undefined;
    const timer = window.setTimeout(() => setToast({ show: false, message: '' }), 2200);
    return () => window.clearTimeout(timer);
  }, [toast.show]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...currentCart, { ...product, quantity }];
    });
    setToast({ show: true, message: `${product.name} added to cart` });
  };

  const updateQuantity = (id, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setToast({ show: true, message: 'Cart cleared successfully' });
  };

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some((item) => item.id === product.id);
      if (exists) {
        return currentWishlist.filter((item) => item.id !== product.id);
      }
      return [...currentWishlist, product];
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                cart={cart}
                wishlist={wishlist}
                loading={loading}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cart={cart}
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <ScrollToTop />
        {toast.show && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
            {toast.message}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;