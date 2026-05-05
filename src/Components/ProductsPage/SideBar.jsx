import React, { useState, useEffect } from "react";
import { IoChevronForward, IoChevronDown, IoClose } from "react-icons/io5";
import { FiCheck, FiSliders } from "react-icons/fi";
import { useToggle } from "../../Hooks/useToggle";
import "../../Css/sideBar.css";

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, toggle] = useToggle(defaultOpen);

  return (
    <div className="py-5 border-t border-black/10">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggle}
      >
        <h3 className="text-lg font-bold font-satoshi">{title}</h3>
        <IoChevronDown
          className={`transition-transform duration-300 ${!isOpen ? "-rotate-90" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="animate-in fade-in duration-300">{children}</div>
      )}
    </div>
  );
};

export const Sidebar = ({
  isOpen,
  onClose,
  activeSlug,
  onApply,
  appliedFilters,
}) => {
  // Config
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const styles = ["casual", "gym", "formal", "party"];
  const genders = ["man", "woman"];
  const categories = [
    "T-shirt",
    "Shorts",
    "Shirt",
    "Hoodie",
    "Jeans",
    "Jacket",
  ];
  const brands = ["zara", "versache", "prada", "gucci", "calvin klein"];
  const colors = [
    "#FFFFFF",
    "#9B9B9B",
    "#000000",
    "#000080",
    "#4169E1",
    "#C19A6B",
    "#556B2F",
    "#800020",
  ];

  const subStyles = {
    "T-shirt": ["Graphic", "Oversized", "V-Neck", "Slim Fit"],
    Jeans: ["Skinny", "Straight", "Slim Fit", "Relaxed", "Distressed"],
    Hoodie: ["Pullover", "Zip-up", "Oversized", "Fleece"],
    Shorts: ["Cargo", "Chino", "Athletic", "Denim"],
    Shirt: ["Oxford", "Flannel", "Cuban Collar", "Dress Shirt"],
    Jacket: ["Bomber", "Denim", "Windbreaker", "Parka"],
  };

  const maxLimit = 500;

  // --- States ---
  const [pending, setPending] = useState(appliedFilters);
  const [expandedCategory, setExpandedCategory] = useState(null); // Tracks which sub-menu is open

  // Sync with parent when filters change externally
  useEffect(() => {
    setPending(appliedFilters);
  }, [appliedFilters]);

  // Derived Values
  // ✅ Only fall back to activeSlug if pending.style is truly empty
  const activeStyle =
    pending.style !== ""
      ? pending.style
      : styles.includes(activeSlug)
        ? activeSlug
        : "";
  const activeGender = pending.gender;
  const activeBrand = pending.brand;
  // --- Handlers ---
  const handlePriceChange = (e, type) => {
    const val = e.target.value;
    if (val === "") {
      setPending((prev) => ({ ...prev, price: { ...prev.price, [type]: "" } }));
      return;
    }
    const clamped = Math.max(0, Math.min(parseInt(val), maxLimit));
    setPending((prev) => ({
      ...prev,
      price: { ...prev.price, [type]: clamped },
    }));
  };

  const handleApply = () => {
    onApply({ ...pending, style: activeStyle });
    onClose();
  };

  const toggleCategory = (cat) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={` fixed inset-y-0 left-0 z-1005 w-[85%] max-w-[320px] bg-white p-5 transition-transform duration-300 
      md:static md:w-[35%] md:max-w-65 md:h-fit md:p-6 md:border md:border-black/10 md:rounded-[20px] md:z-0 md:translate-x-0 overflow-y-auto h-screen scroll-smooth
      ${isOpen ? "translate-x-0 shadow-2xl md:shadow-none" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center pb-6 border-b border-black/10">
        <h2 className="text-xl font-bold font-satoshi">Filters</h2>
        <button onClick={onClose} className="md:hidden">
          <IoClose size={24} />
        </button>
        <FiSliders className="hidden md:block text-black/40 w-5 h-5" />
      </div>

      {/* კატეგორიები */}
      <div className="py-5 border-b border-black/10">
        <div className="space-y-1">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col">
              <div
                onClick={() => toggleCategory(cat)}
                className={`flex justify-between items-center py-2 cursor-pointer transition-colors font-satoshi
                  ${expandedCategory === cat ? "text-black font-bold" : "text-black/60 hover:text-black"}`}
              >
                <span>{cat}s</span> {/* Added 's' for plural UI display */}
                <IoChevronForward
                  className={`transition-transform duration-300 ${expandedCategory === cat ? "rotate-90" : ""}`}
                />
              </div>

              {/* Substyles*/}
              {expandedCategory === cat && subStyles[cat] && (
                <div className="pl-4 pb-2 flex flex-col gap-2 animate-in slide-in-from-top-1 duration-300">
                  {subStyles[cat].map((sub) => (
                    <div
                      key={sub}
                      onClick={() =>
                        setPending((prev) => ({
                          ...prev,
                          subStyle: prev.subStyle === sub ? "" : sub,
                          category: cat,
                        }))
                      }
                      className={`text-sm cursor-pointer hover:text-black transition-all ${pending.subStyle === sub ? "text-black font-bold flex items-center gap-2" : "text-black/40"}`}
                    >
                      {pending.subStyle === sub && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      )}
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <FilterSection title="Price">
        <div className="flex items-center gap-3 mb-6">
          {["min", "max"].map((t) => (
            <div key={t} className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm">
                $
              </span>
              <input
                type="number"
                value={pending.price[t]}
                placeholder={t === "min" ? "0" : "500"}
                onChange={(e) => handlePriceChange(e, t)}
                className="w-full bg-[#F0F0F0] border border-transparent rounded-xl py-2 pl-7 pr-3 font-bold text-sm outline-none transition-all focus:bg-white focus:border-black"
              />
            </div>
          ))}
        </div>
        <div className="range-slider-container relative h-6">
          <div className="absolute w-full h-1.5 bg-[#F0F0F0] rounded-full top-1/2 -translate-y-1/2" />
          <div
            className="absolute h-1.5 bg-black rounded-full top-1/2 -translate-y-1/2"
            style={{
              left: `${(Math.min(pending.price.min, pending.price.max) / maxLimit) * 100}%`,
              right: `${100 - (Math.max(pending.price.min, pending.price.max) / maxLimit) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max={maxLimit}
            value={Number(pending.price.min) || 0}
            onChange={(e) => handlePriceChange(e, "min")}
            className="range-input"
          />
          <input
            type="range"
            min="0"
            max={maxLimit}
            value={Number(pending.price.max) || 0}
            onChange={(e) => handlePriceChange(e, "max")}
            className="range-input"
          />
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() =>
                setPending((prev) => ({
                  ...prev,
                  color: prev.color === color ? "" : color,
                }))
              }
              style={{ backgroundColor: color }}
              className={`w-9 h-9 rounded-full border border-black/10 cursor-pointer flex items-center justify-center transition-all hover:scale-110 
                ${pending.color === color ? "ring-2 ring-black ring-offset-2" : ""}`}
            >
              {pending.color === color && (
                <FiCheck
                  className={
                    color.toLowerCase() === "#ffffff"
                      ? "text-black"
                      : "text-white"
                  }
                />
              )}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                setPending((prev) => ({
                  ...prev,
                  size: prev.size === size ? "" : size,
                }))
              }
              className={`px-5 py-2.5 rounded-full text-sm font-satoshi transition-all
                ${pending.size === size ? "bg-black text-white" : "bg-[#F0F0F0] text-black hover:ring-1"}
                cursor-pointer`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Gender">
        <div className="flex flex-wrap gap-2">
          {genders.map((gen) => (
            <button
              key={gen}
              onClick={() =>
                setPending((prev) => ({
                  ...prev,
                  gender: prev.gender === gen ? "" : gen,
                }))
              }
              className={`px-5 py-2.5 rounded-full text-sm font-satoshi transition-all capitalize
                ${activeGender === gen ? "bg-black text-white" : "bg-[#F0F0F0] text-black hover:ring-1"}
                cursor-pointer`}
            >
              {gen}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Style">
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() =>
                setPending((p) => ({ ...p, style: p.style === s ? "" : s }))
              }
              className={`px-5 py-2.5 rounded-full text-sm font-satoshi transition-all capitalize
                ${activeStyle === s ? "bg-black text-white" : "bg-[#F0F0F0] text-black hover:ring-1"}
                cursor-pointer`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Brands">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() =>
                setPending((p) => ({ ...p, brand: p.brand === b ? "" : b }))
              }
              className={`px-5 py-2.5 rounded-full text-sm font-satoshi transition-all capitalize
                ${activeBrand === b ? "bg-black text-white" : "bg-[#F0F0F0] text-black hover:ring-1"}
                cursor-pointer`}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="sticky bottom-0 bg-white pt-2 pb-4 mb-20 md:mb-0">
        <button
          onClick={handleApply}
          className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all font-satoshi cursor-pointer"
        >
          Apply Filter
        </button>
      </div>
    </aside>
  );
};
