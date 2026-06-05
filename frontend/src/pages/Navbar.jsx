import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("isLoggedIn") === "true";
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    setIsLoggedIn(login);
    setUser(userData);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname === "/") {
      // already on home page
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // from profile/orders page
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* LEFT LOGO */}
      <div
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-yellow-500 cursor-pointer"
      >
        🛍️ Shoppifyy
      </div>

      {/* RIGHT MENU */}
      <div className="flex items-center gap-8 text-lg font-medium">
        <button
          onClick={() => navigate("/")}
          className="hover:text-yellow-500 cursor-pointer"
        >
          Home
        </button>

        <button
          onClick={() => handleSectionClick("about")}
          className="hover:text-yellow-500 cursor-pointer"
        >
          About
        </button>

        <button
          onClick={() => handleSectionClick("contact")}
          className="hover:text-yellow-500 cursor-pointer"
        >
          Contact
        </button>

        <button
          onClick={() => handleSectionClick("cart")}
          className="hover:text-yellow-500 cursor-pointer"
        >
          🛒 Cart
        </button>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="bg-yellow-400 px-5 py-2 rounded-xl font-semibold"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-yellow-400 font-bold cursor-pointer"
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 bg-white shadow-xl rounded-xl w-48 border z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  My Orders
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;