import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { API } from "../pages/api.jsx";
import CartContext from "../context/CartContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // USER STATE
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // CART CONTEXT FUNCTIONS
  const { clearCart } = useContext(CartContext);

  // Load username on page load
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  // Logout system
  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("saved_address");
    setUsername(null);
    setMenuOpen(false);
    navigate("/");
  };

  // -------------------------
  // FUNCTIONAL SEARCH SYSTEM
  // -------------------------
  let typingDelay;

  const handleSearch = async (value) => {
    setSearchValue(value);
    setShowDropdown(true);

    if (typingDelay) clearTimeout(typingDelay);

    typingDelay = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const res = await API.get(`/products/search/${value}`);
        setResults(res.data);
      } catch (err) {
        console.log("Search Error:", err);
      }
    }, 300); // debounce
  };

  return (
    <div className="sticky top-0 z-50 border-b shadow-sm bg-white/40 backdrop-blur-xl border-white/30">

      {/* ROW 1 */}
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Marketzen
        </Link>

        {/* SEARCH BAR */}
        <div className="relative w-1/2">
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full ml-2 bg-transparent outline-none"
              onFocus={() => setShowDropdown(true)}
            />
          </div>

          {showDropdown && results.length > 0 && (
            <div className="absolute z-50 w-full mt-2 overflow-y-auto bg-white rounded shadow-lg max-h-60">
              {results.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className="block px-4 py-2 border-b hover:bg-gray-100"
                  onClick={() => {
                    setSearchValue("");
                    setShowDropdown(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* USER + CART + SELLER */}
        <div className="flex items-center gap-6 text-lg">

          {/* SELLER LOGIN BUTTON */}
          <Link
            to="/seller-login"
            className="flex items-center font-semibold text-blue-600 hover:text-blue-800"
          >
            Seller Login
          </Link>

          {/* USER LOGIN OR DROPDOWN */}
          {username ? (
            <div className="relative">
              <span
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 font-semibold cursor-pointer"
              >
                👤 {username} ▼
              </span>

              {menuOpen && (
                <div className="absolute right-0 p-2 mt-2 bg-white border rounded shadow w-28">
                  <p
                    onClick={handleLogout}
                    className="px-2 py-1 font-medium text-red-600 rounded cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2">
              <FaUser /> Login
            </Link>
          )}

          {/* CART */}
          <Link to="/cart" className="flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>
        </div>
      </div>

      {/* ROW 2: CATEGORY LINKS */}
      <div className="bg-white border-t">
        <div className="flex gap-8 px-4 py-3 mx-auto overflow-x-auto font-medium text-gray-700 max-w-7xl whitespace-nowrap">
          <Link to="/category/whats-new">What's New</Link>
          <Link to="/category/makeup">Makeup</Link>
          <Link to="/category/skin">Skin</Link>
          <Link to="/category/hair">Hair</Link>
          <Link to="/category/fragrance">Fragrance</Link>
          <Link to="/category/men">Men</Link>
          <Link to="/category/bath-body">Bath & Body</Link>
          <Link to="/category/tools">Tools</Link>
          <Link to="/category/mom-baby">Mom & Baby</Link>
          <Link to="/category/wellness">Wellness</Link>
          <Link to="/category/minis">Minis</Link>
          <Link to="/category/gifts">Gifts</Link>
        </div>
      </div>

    </div>
  );
}
