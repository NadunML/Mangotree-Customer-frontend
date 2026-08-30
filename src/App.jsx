import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ShoppingCart, UtensilsCrossed, ClipboardList, Menu, X, LogOut, User, Info } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import MyOrders from './pages/MyOrders';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const addToCart = (item) => {
    const currentToken = localStorage.getItem('token');
    
    if (!currentToken) {
      window.location.href = '/auth';
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
      toast.success(`${item.name} quantity increased!`);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      toast.success(`${item.name} added to cart!`);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`;

  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            fontWeight: 'bold',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
        }} 
      />

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/favicon.png" alt="MangoTree Logo" className="h-9 w-9 object-contain" />
              <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-orange-500 transition-colors">
                Mango<span className="text-orange-500">Tree</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" end className={navLinkClass}>
                <UtensilsCrossed className="w-4 h-4" /> Menu
              </NavLink>

              {token && (
                <Link to="/cart" className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {token && (
                <NavLink to="/my-orders" className={navLinkClass}>
                  <ClipboardList className="w-4 h-4" /> My Orders
                </NavLink>
              )}

              <NavLink to="/about" className={navLinkClass}>
                <Info className="w-4 h-4" /> About Us
              </NavLink>

              {/* Vertical Divider & User Profile/Auth Section */}
              <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                {token ? (
                  <>
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      Hi, <span className="font-semibold text-gray-800">{user?.name?.split(' ')[0]}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="text-sm font-semibold px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              {token && (
                <Link to="/cart" className="relative text-gray-600">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-orange-50 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4" /> Menu
                </Link>

                {token && (
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors"
                  >
                    <ClipboardList className="w-4 h-4" /> My Orders
                  </Link>
                )}

                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors"
                >
                  <Info className="w-4 h-4" /> About Us
                </Link>

                {token ? (
                  <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 mt-2 pt-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      Hi, <span className="font-semibold text-gray-800">{user?.name}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mx-4 mt-3 py-3 text-sm font-semibold text-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1 bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Customer Routes */}
          <Route path="/cart" element={
            <ProtectedRoute requiredRole="customer">
              <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute requiredRole="customer">
              <Checkout cart={cart} clearCart={clearCart} />
            </ProtectedRoute>
          } />
          
          <Route path="/my-orders" element={
            <ProtectedRoute requiredRole="customer">
              <MyOrders />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MangoTree · Pre-order & Skip the Line
      </footer>
    </BrowserRouter>
  );
}

export default App;