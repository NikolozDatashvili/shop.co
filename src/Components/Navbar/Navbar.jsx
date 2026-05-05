/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { useWindowSize } from "../../Hooks/useWindowSize";
import { SearchBar } from "./Searchbar";
import { useToggle } from "../../Hooks/useToggle";
import "../../Css/Navbar.css";
import { Link } from "react-router-dom";
import { NavigationDropdown } from "./NavigationDropdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
export const Navbar = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useToggle(false);
  const [navIsOpen, setNavIsOpen] = useToggle(false);
  const isMobile = width < 640;
  const isTablet = width < 900;
  const [isStarting, setIsStarting] = useToggle(true);
  const totalItems = useCart((state) => state.getTotalItems());
  const handleSearchNavigation = (searchTerm) => {
    if (!searchTerm) return;

    if (isTablet) setSearchOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarting(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTablet) {
      setSearchOpen(false);
      setNavIsOpen(false);
    }
  }, [isTablet]);

  return (
    <nav
      className={`${isStarting ? "startUp" : ""} flex items-center w-full p-4 gap-x-6 xl:gap-x-8 md:px-10 transition-all duration-300 justify-between xl:justify-center bg-white z-100 relative`}
    >
      {/* ლოგო და მობილური მენიუს ღილაკი */}
      <div className="flex items-center gap-4">
        {isMobile && !searchOpen && (
          <div
            className="cursor-pointer"
            onClick={() => setNavIsOpen(!navIsOpen)}
          >
            {navIsOpen ? (
              <IoClose className="w-7 h-7 text-gray-700 animate-rotateIn" />
            ) : (
              <FiMenu className="w-6 h-6 animate-fadeIn" />
            )}
          </div>
        )}

        {!searchOpen && (
          <h1
            onClick={() => navigate("/")}
            className="font-integral text-[24px] mb-1 md:text-[28px] xl:text-[32px] whitespace-nowrap animate-fadeIn cursor-pointer"
          >
            Shop.co
          </h1>
        )}
      </div>

      {/* ნავიგაცია */}
      {!isMobile && !searchOpen && (
        <ul className="flex gap-x-5 items-center animate-fadeIn">
          <li className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setNavIsOpen(!navIsOpen)}
            >
              <p className="navLi">Shop</p>
              <IoChevronDown
                className={`w-4 mt-1 ml-1 duration-300 transition-transform ${navIsOpen ? "-rotate-180" : ""}`}
              />
            </div>

            {!isMobile && (
              <NavigationDropdown
                isOpen={navIsOpen}
                onClose={() => setNavIsOpen(false)}
              />
            )}
          </li>

          {[
            { name: "On Sale", path: "category/onsale" },
            { name: "New Arrivals", path: "category/newarrival" },
            { name: "Brands", path: "/Brands" },
          ].map((link) => (
            <li key={link.name}>
              <Link className="whitespace-nowrap" to={link.path}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* საძიებო ველი */}
      {!isTablet && <SearchBar onSearch={handleSearchNavigation} />}

      {isTablet && (
        <div
          className={`flex-1 ${
            searchOpen
              ? "animate-slideInRight relative z-20"
              : "animate-slideOutRight absolute inset-x-10 pointer-events-none invisible"
          }`}
        >
          <SearchBar onSearch={handleSearchNavigation} className="w-full" />
        </div>
      )}

      {/* Icons */}
      <div className="flex gap-3 items-center">
        {isTablet && (
          <div
            onClick={() => setSearchOpen(!searchOpen)}
            className="cursor-pointer z-30"
          >
            {searchOpen ? (
              <IoClose className="w-7 h-7 text-gray-700 animate-rotateIn" />
            ) : (
              <FiSearch className="w-6 h-6 animate-fadeIn" />
            )}
          </div>
        )}

        {!searchOpen && (
          <div className="flex gap-3 ">
            <Link to="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 cursor-pointer animate-fadeIn" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login">
              <HiOutlineUserCircle className="w-6 h-6 cursor-pointer animate-fadeIn" />
            </Link>
          </div>
        )}
      </div>

      {isMobile && (
        <NavigationDropdown
          isOpen={navIsOpen}
          isMobile={isMobile}
          onClose={() => setNavIsOpen(false)}
        />
      )}
    </nav>
  );
};
