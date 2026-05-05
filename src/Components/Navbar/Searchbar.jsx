import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiClock, FiX } from "react-icons/fi";
import useLocalStorage from "../../Hooks/useLocaleStorage";
import { products } from "../../data/staticProducts";
import { ProductList } from "./productDropDown";

export const SearchBar = ({ onSearch, className = "" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inp, setInp] = useState("");
  const [debouncedInp, setDebouncedInp] = useState("");
  const [history, setHistory] = useLocalStorage("search_history", []);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  /// დებაუნსის ლოგიკა

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedInp(inp.trim());
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [inp]);

  const query = debouncedInp.toLowerCase();
  const hasInput = query.length > 0;
  const hasHistory = history.length > 0;

  //// ჩაწერილი ტექსტის მიხედვით ფილტრაცია
  const suggestions = useMemo(() => {
    if (!hasInput) return [];
    return products
      .filter((p) => p.name.replaceAll("_", " ").toLowerCase().includes(query))
      .slice(0, 5);
  }, [query, hasInput]);

  //// ადრე არჩეული პროდუქტები
  const historyProducts = useMemo(() => {
    if (hasInput || !hasHistory) return [];
    return products
      .filter((p) =>
        history.some((inpTxt) =>
          p.name
            .replaceAll("_", " ")
            .toLowerCase()
            .includes(inpTxt.toLowerCase()),
        ),
      )
      .slice(0, 5);
  }, [hasInput, hasHistory, history]);

  ////
  const handleSearch = useCallback(
    (txtToSearch = inp) => {
      const inpTxt = txtToSearch.trim();
      if (!inpTxt) return;

      setHistory((prev) => {
        const next = [inpTxt, ...prev.filter((item) => item !== inpTxt)];
        return next.slice(0, 5);
      });

      const exactProduct = products.find(
        (p) =>
          p.name.replaceAll("_", " ").toLowerCase() === inpTxt.toLowerCase(),
      );

      if (exactProduct) {
        navigate(`/product/${exactProduct.id}`);
      } else if (onSearch) {
        onSearch(inpTxt);
      }

      setIsOpen(false);
      inputRef.current?.blur();
    },
    [inp, onSearch, setHistory, navigate],
  );

  //| ჩამონათვალში მოცემულ პროდუქტზე დაკლიკებისთვის
  const handleProductClick = (product) => {
    setInp(product.name.replaceAll("_", " "));
    setHistory((prev) => {
      const next = [
        product.name.replaceAll("_", " "),
        ...prev.filter((item) => item !== product.name.replaceAll("_", " ")),
      ];
      return next.slice(0, 5);
    });
    setIsOpen(false);
    navigate(`/product/${product.id}`);
  };

  function handleHistoryClick(txt) {
    setInp(txt);
    handleSearch(txt);
  }

  const showDropdown = isOpen && (hasInput || (hasHistory && !hasInput));

  return (
    <div className={`relative z-1000 w-full max-w-xl ${className}`}>
      <div
        className={`flex items-center gap-2 px-4 h-11 bg-[#F0F0F0] rounded-full transition-all duration-150 ${
          isOpen ? "ring-2 ring-black" : ""
        }`}
      >
        <FiSearch
          onClick={() => handleSearch()}
          className="w-4 h-4 text-gray-500 cursor-pointer shrink-0 hover:text-black transition-colors"
        />
        <input
          ref={inputRef}
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for products..."
          className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder:text-gray-400 font-satoshi"
        />
        {inp && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setInp("");
              inputRef.current?.focus();
            }}
            className="shrink-0 text-gray-400 hover:text-black"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          {hasInput && (
            <ul>
              {suggestions.length > 0 ? (
                suggestions.map((p) => (
                  <ProductList
                    key={p.id}
                    product={p}
                    onMouseDown={() => handleProductClick(p)}
                  />
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400 font-satoshi">
                  No products found
                </p>
              )}
            </ul>
          )}

          {!hasInput && hasHistory && (
            <div className="py-2">
              {history.map((txt, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleHistoryClick(txt)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer group font-satoshi"
                >
                  <FiClock className="w-3.5 h-3.5 text-gray-300" />
                  <span className="flex-1 truncate">{txt}</span>
                </li>
              ))}

              {historyProducts.length > 0 && (
                <div className="border-t border-gray-100 mt-2">
                  <span className="block px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase font-satoshi">
                    Based on recent searches
                  </span>
                  <ul>
                    {historyProducts.map((p) => (
                      <ProductList
                        key={p.id}
                        product={p}
                        onMouseDown={() => handleProductClick(p)}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
