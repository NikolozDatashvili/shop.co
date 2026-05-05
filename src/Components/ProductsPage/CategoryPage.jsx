import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { products } from "../../data/staticProducts";
import { ProductCard } from "./productCard";
import { Sidebar } from "./SideBar";
import { useWindowSize } from "../../Hooks/useWindowSize";
import { BsSliders2Vertical } from "react-icons/bs";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import "../../Css/startUp.css";

const defaultFilters = {
  color: "",
  price: { min: 0, max: 500 },
  style: "",
  size: "",
  gender: "",
  brand: "",
  subStyle: "",
  category: "",
  newArrival: false,
  onSale: false,
};

const colorPalette = {
  Black: "#000000",
  White: "#FFFFFF",
  "Navy Blue": "#000080",
  "Dark Olive Green": "#556b2f",
  "Spanish Gray": "#989898",
  Burgundy: "#800020",
  "Camel Brown": "#c19a6b",
  "Royal Blue": "#4169e1",
};

const styles = ["casual", "gym", "formal", "party"];
const genders = ["man", "woman"];

const CategoryPage = ({ defaultCategory }) => {
  const { categoryName } = useParams();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const isMobile = width < 768;

  const activeSlug = (categoryName || defaultCategory)?.toLowerCase() || "shop";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("most-popular");
  const [prevPath, setPrevPath] = useState(pathname);
  const [filters, setFilters] = useState(defaultFilters);
  const [clearedSlugStyle, setClearedSlugStyle] = useState(false);
  const [clearedSlugGender, setClearedSlugGender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const dropdownRef = useRef(null);

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      style:
        filters.style ||
        (styles.includes(activeSlug) && !clearedSlugStyle ? activeSlug : ""),
      gender:
        filters.gender ||
        (genders.includes(activeSlug) && !clearedSlugGender ? activeSlug : ""),
    }),
    [filters, activeSlug, clearedSlugStyle, clearedSlugGender],
  );

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setCurrentPage(1);
    setIsSidebarOpen(false);
    setIsSortOpen(false);
    setClearedSlugStyle(false);
    setClearedSlugGender(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow =
      isMobile && isSidebarOpen ? "hidden" : "unset";
  }, [isSidebarOpen, isMobile]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleApplyFilters = (newFilters) => {
    setClearedSlugStyle(false);
    setClearedSlugGender(false);
    setFilters(newFilters);
    setCurrentPage(1);
    if (newFilters.style) navigate(`/category/${newFilters.style}`);
    else if (newFilters.gender) navigate(`/category/${newFilters.gender}`);
    else if (newFilters.brand)
      navigate(`/category/${newFilters.brand.toLowerCase()}`);
    else navigate("/category/shop");
  };

  const clearFilter = (key) => {
    const newFilters = {
      ...filters,
      [key]: key === "price" ? { min: 0, max: 500 } : "",
    };
    setFilters(newFilters);
    setCurrentPage(1);
    if (key === "newarrival" || key === "onSale") navigate("/category/shop");
    if (key === "style") {
      setClearedSlugStyle(true);
      const nextGender =
        newFilters.gender || (genders.includes(activeSlug) ? activeSlug : null);
      nextGender
        ? navigate(`/category/${nextGender}`)
        : navigate("/category/shop");
    } else if (key === "gender") {
      setClearedSlugGender(true);
      const nextStyle =
        newFilters.style || (styles.includes(activeSlug) ? activeSlug : null);
      nextStyle
        ? navigate(`/category/${nextStyle}`)
        : navigate("/category/shop");
    }
  };

  const processedProducts = useMemo(() => {
    let result = [...products];
    if (activeSlug === "top-selling" || activeSlug === "popular")
      result = result.filter((p) => parseFloat(p.rating) >= 4.5);
    else if (activeSlug === "newarrival")
      result = result.filter((p) => p.newArrival === true);
    else if (activeSlug === "onsale")
      result = result.filter(
        (p) => p.discountPrice && p.discountPrice < p.price,
      );
    else if (activeSlug !== "shop" && activeSlug !== "all") {
      result = result.filter((p) => {
        if (activeSlug === "man") return p.isMans === true;
        if (activeSlug === "woman") return p.isMans === false;
        return (
          p.style?.toLowerCase() === activeSlug ||
          p.category?.toLowerCase() === activeSlug ||
          p.brand?.toLowerCase() === activeSlug ||
          p.brands?.toLowerCase() === activeSlug
        );
      });
    }

    if (effectiveFilters.brand)
      result = result.filter(
        (p) =>
          p.brand?.toLowerCase() === effectiveFilters.brand.toLowerCase() ||
          p.brands?.toLowerCase() === effectiveFilters.brand.toLowerCase(),
      );
    if (effectiveFilters.color)
      result = result.filter((p) =>
        p.colors?.some(
          (c) => c.toLowerCase() === effectiveFilters.color.toLowerCase(),
        ),
      );
    if (effectiveFilters.size)
      result = result.filter((p) =>
        p.sizes
          ?.map((s) => s.toLowerCase())
          .includes(effectiveFilters.size.toLowerCase()),
      );
    if (effectiveFilters.newArrival)
      result = result.filter((p) => p.newArrival === true);
    if (effectiveFilters.onSale)
      result = result.filter(
        (p) => p.discountPrice && p.discountPrice < p.price,
      );
    if (effectiveFilters.gender === "man")
      result = result.filter((p) => p.isMans === true);
    if (effectiveFilters.gender === "woman")
      result = result.filter((p) => p.isMans === false);
    if (effectiveFilters.style)
      result = result.filter(
        (p) => p.style?.toLowerCase() === effectiveFilters.style.toLowerCase(),
      );
    result = result.filter((p) => {
      const price = p.discountPrice ?? p.price;
      return (
        price >= (Number(effectiveFilters.price.min) || 0) &&
        price <= (Number(effectiveFilters.price.max) || 500)
      );
    });
    if (effectiveFilters.subStyle)
      result = result.filter(
        (p) =>
          p.subStyle?.toLowerCase() === effectiveFilters.subStyle.toLowerCase(),
      );
    if (effectiveFilters.category)
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() === effectiveFilters.category.toLowerCase(),
      );

    return result.sort((a, b) => {
      const priceA = a.discountPrice ?? a.price;
      const priceB = b.discountPrice ?? b.price;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return (
        parseFloat(b.rating) * (b.reviews?.length || 0) -
        parseFloat(a.rating) * (a.reviews?.length || 0)
      );
    });
  }, [activeSlug, sortBy, effectiveFilters]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.max(
    1,
    Math.ceil(processedProducts.length / itemsPerPage),
  );

  const isDefaultPrice =
    effectiveFilters.price.min === 0 && effectiveFilters.price.max === 500;
  const activeFilters = [
    effectiveFilters.color && {
      key: "color",
      label:
        Object.keys(colorPalette).find(
          (n) =>
            colorPalette[n].toLowerCase() ===
            effectiveFilters.color.toLowerCase(),
        ) || effectiveFilters.color,
    },
    effectiveFilters.newArrival && { key: "newarrival", label: "New Arrival" },
    effectiveFilters.onSale && { key: "onSale", label: "On Sale" },
    effectiveFilters.size && { key: "size", label: effectiveFilters.size },
    effectiveFilters.style && { key: "style", label: effectiveFilters.style },
    effectiveFilters.gender && {
      key: "gender",
      label: effectiveFilters.gender,
    },
    effectiveFilters.brand && { key: "brand", label: effectiveFilters.brand },
    effectiveFilters.subStyle && {
      key: "subStyle",
      label: effectiveFilters.subStyle,
    },
    effectiveFilters.category && {
      key: "category",
      label: effectiveFilters.category,
    },
    !isDefaultPrice && {
      key: "price",
      label: `$${effectiveFilters.price.min} - $${effectiveFilters.price.max}`,
    },
  ].filter(Boolean);

  // --- NEW: THE FINGERPRINT ---

  const filterFingerprint = `${activeSlug}-${sortBy}-${currentPage}-${activeFilters.length}`;

  const sortOptions = [
    { id: "most-popular", label: "Most Popular" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
  ];

  const pageTitle = (() => {
    if (activeSlug === "newarrival") return "New Arrivals";
    if (activeSlug === "onsale") return "On Sale";
    if (activeSlug === "top-selling" || activeSlug === "popular")
      return "Top Selling";
    if (activeSlug === "man") return "Men";
    if (activeSlug === "woman") return "Women";
    if (activeSlug === "shop" || activeSlug === "all") return "All Products";
    return activeSlug.replace(/-/g, " ");
  })();

  return (
    <main className="max-w-360 mx-auto px-4 md:px-10 py-6 startUp">
      <nav className="flex items-center gap-2 mb-6 md:mb-8 text-sm md:text-base font-satoshi border-t border-black/5 pt-6 ">
        <Link to="/" className="text-black/60 hover:text-black">
          Home
        </Link>
        <IoChevronForward className="text-black/60 w-3.5 h-3.5" />
        <span className="font-medium capitalize text-black">{pageTitle}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-5 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onApply={handleApplyFilters}
          activeSlug={activeSlug}
          appliedFilters={effectiveFilters}
        />

        <div className="flex-1">
          <div
            className={`flex justify-between items-center lg:items-end lg:mb-6 ${processedProducts.length === 0 ? "gap-x-50" : ""} mb-4`}
          >
            <h2 className="text-[20px] lg:text-2xl xl:text-4xl font-bold uppercase font-integral tracking-wider">
              {pageTitle}
            </h2>
            <div className="flex items-center lg:gap-x-4 gap-x-1">
              <p className="hidden md:block text-black/60 font-satoshi text-xs lg:text-[18px]">
                Showing{" "}
                {processedProducts.length > 12 ? 12 : processedProducts.length}/
                {processedProducts.length}
              </p>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2.5 rounded-full bg-[#F0F0F0]"
              >
                <BsSliders2Vertical size={18} />
              </button>

              <div className="hidden md:block relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <span className="text-black/60 font-satoshi text-xs lg:text-[18px]">
                    Sort by:
                  </span>
                  <span className="font-bold flex items-center gap-1 font-satoshi text-xs lg:text-[18px]">
                    {sortOptions.find((opt) => opt.id === sortBy)?.label}
                    <IoChevronDown
                      className={`transition-transform ${isSortOpen ? "rotate-180" : ""} duration-300`}
                    />
                  </span>
                </div>
                {isSortOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-2xl z-50 border border-gray-100 overflow-hidden">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsSortOpen(false);
                        }}
                        className="block w-full text-left px-5 py-3 text-xs xl:text-[18px] hover:bg-gray-50"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*  აქტიური ფილტრები  */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {activeFilters.map(({ key, label }) => (
                <span
                  key={key}
                  className="flex items-center gap-1 px-3 py-1 bg-[#F0F0F0] rounded-full text-sm font-satoshi capitalize"
                >
                  {label}
                  <button
                    onClick={() => clearFilter(key)}
                    className="ml-1 text-black/40 hover:text-black transition-colors cursor-pointer duration-300"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <button
                onClick={() => {
                  setClearedSlugStyle(true);
                  setClearedSlugGender(true);
                  setFilters({ ...defaultFilters });
                  navigate("/category/shop");
                }}
                className="text-sm text-black/50 hover:text-black underline font-satoshi duration-300 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {processedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-black/40 font-satoshi">
              <p className="text-xl font-medium">No products found</p>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {processedProducts.slice(startIndex, endIndex).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                filterKey={filterFingerprint}
              />
            ))}
          </div>

          {/*  page-ებზე გადასასვლელი  */}
          {processedProducts.length > 0 && (
            <div className="w-full border-t border-gray-200 p-5 mt-5 flex justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`border rounded-lg p-1 px-3 sm:p-2 sm:px-5 border-gray-200 flex items-center gap-2 ${currentPage === 1 ? "opacity-50" : "hover:bg-black hover:text-white"}`}
              >
                <FaArrowLeft /> Previous
              </button>
              <span className="flex items-center font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`border rounded-lg p-1 px-3 sm:p-2 sm:px-5 border-gray-200 flex items-center gap-2 ${currentPage === totalPages ? "opacity-50" : "hover:bg-black hover:text-white"}`}
              >
                Next <FaArrowLeft className="rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
