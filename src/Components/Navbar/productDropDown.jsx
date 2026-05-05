import React from "react";

//// ჩამონათვალზე რეიტინგი
const StarRating = ({ rating }) => (
  <span className="text-[#f59e0b]">
    {"★".repeat(Math.round(rating))}
    {"☆".repeat(5 - Math.round(rating))}
  </span>
);

//// პროდუქტების ჩამონათვალი
const ProductList = ({ product, onMouseDown }) => (
  <li
    role="option"
    aria-selected={false}
    tabIndex={0}
    onMouseDown={onMouseDown}
    onKeyDown={(e) => e.key === "Enter" && onMouseDown()}
    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer focus:outline-none focus:bg-gray-50 transition-colors"
  >
    <img
      src={product.images[0]}
      alt={product.name.replaceAll("_", " ")}
      className="w-10 h-12 object-cover rounded-lg shrink-0 bg-gray-100"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-gray-800 truncate font-satoshi">
        {product.name.replaceAll("_", " ")}
      </p>
      <StarRating rating={product.rating} />
      <div className="flex items-center gap-2 mt-0.5">
        {product.discountPrice ? (
          <>
            <span className="text-sm font-bold text-gray-900 font-satoshi">
              ${product.discountPrice}
            </span>
            <span className="text-xs text-gray-400 line-through font-satoshi">
              ${product.price}
            </span>
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full font-satoshi">
              {product.discountPercent}
            </span>
          </>
        ) : (
          <span className="text-sm font-bold text-gray-900 font-satoshi">
            ${product.price}
          </span>
        )}
      </div>
    </div>
  </li>
);

export { ProductList, StarRating };
