import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}') || {};
    } catch {
      return {};
    }
  });

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSectionClick = (sectionId) => {
    setShowMenu(false);
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  };

  const navLinks = [
    { label: 'Home', action: () => { setShowMenu(false); navigate('/'); } },
    { label: 'Shop', action: () => handleSectionClick('products') },
    { label: 'Categories', action: () => handleSectionClick('products') },
    { label: 'About', action: () => handleSectionClick('about') },
    { label: 'Contact', action: () => handleSectionClick('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <button type="button" onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
          <span className="rounded-full bg-yellow-400 px-3 py-1 text-lg">🛍️</span>
          Shoppifyy
        </button>

        <div className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
          {navLinks.map((link) => (
            <button key={link.label} type="button" onClick={link.action} className="transition hover:text-yellow-600">
              {link.label}
            </button>
          ))}
          <Link to="/checkout" className="relative rounded-full p-2 transition hover:text-yellow-600" aria-label="View cart">
            🛒
            {cartCount > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-yellow-400 px-1 text-center text-[0.7rem] font-semibold text-black">{cartCount}</span>}
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button type="button" onClick={() => setShowMenu((value) => !value)} className="flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 font-semibold text-black">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-gray-800">{user?.username?.charAt(0).toUpperCase() || (user?.email?.charAt(0) || 'U').toUpperCase()}</span>
                <span className="hidden sm:inline">{user?.username || user?.email || 'User'}</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-48 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                  <Link to="/profile" onClick={() => setShowMenu(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" onClick={() => setShowMenu(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-gray-100">My Orders</Link>
                  <button type="button" onClick={logout} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-500">Login</Link>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link to="/checkout" className="relative rounded-full p-2" aria-label="View cart">
            🛒
            {cartCount > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-yellow-400 px-1 text-center text-[0.7rem] font-semibold text-black">{cartCount}</span>}
          </Link>
          <button type="button" aria-label="Toggle navigation menu" onClick={() => setShowMenu((value) => !value)} className="rounded-full border border-gray-200 p-2 text-xl">
            ☰
          </button>
        </div>
      </nav>

      <div className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 lg:hidden ${showMenu ? 'max-h-80' : 'max-h-0'}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <button key={link.label} type="button" onClick={link.action} className="rounded-2xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              {link.label}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={() => setShowMenu(false)} className="rounded-2xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100">Profile</Link>
              <Link to="/orders" onClick={() => setShowMenu(false)} className="rounded-2xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100">My Orders</Link>
              <button type="button" onClick={logout} className="rounded-2xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setShowMenu(false)} className="rounded-2xl bg-yellow-400 px-3 py-3 text-left text-sm font-semibold text-black">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
