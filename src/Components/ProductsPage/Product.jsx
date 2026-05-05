import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/staticProducts";
import { FaCheck } from "react-icons/fa6";
import { BsCheckLg } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  IoChevronForward,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";
import { useCart } from "../../Hooks/useCart";
import "../../css/Product.css";
import { ProductDetails } from "./ProductDetails";
import { AlsoMayLike } from "./AlsoMayLike";

export const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const addItem = useCart((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [prevId, setPrevId] = useState(productId);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");

  if (productId !== prevId) {
    setPrevId(productId);
    setSelectedSize(product?.sizes?.[0] || "");
    setSelectedColor(product?.colors?.[0] || "");
    setQuantity(1);
    setMainImage(product?.images?.[0] || "");
  }

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setQuantity("");
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1 && num <= 20) setQuantity(num);
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, Number(quantity) || 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="py-20 text-center font-satoshi">Product not found.</div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating)
        stars.push(<IoStar key={i} className="text-[#FFC633]" />);
      else if (i - 0.5 <= rating)
        stars.push(<IoStarHalf key={i} className="text-[#FFC633]" />);
      else stars.push(<IoStarOutline key={i} className="text-[#FFC633]" />);
    }
    return stars;
  };

  const prodName = product.name.replaceAll("_", " ");
  const currentProduct = products.find((p) => p.id === parseInt(productId));

  return (
    <main className="max-w-360 mx-auto px-4 md:px-10 py-6 startUp  w-full ">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-6 md:mb-10 text-sm md:text-base font-satoshi border-t border-black/10 pt-6">
        <Link to="/" className="text-black/60 hover:text-black">
          Home
        </Link>
        <IoChevronForward className="text-black/60 w-3.5 h-3.5" />
        <Link to="/category/shop" className="text-black/60 hover:text-black">
          Shop
        </Link>
        <IoChevronForward className="text-black/60 w-3.5 h-3.5 " />
        <span className=" text-black truncate ">{prodName}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 mx-auto items-center">
        <div className="flex-1 flex flex-col md:flex-row-reverse gap-4  items-center justify-be">
          {/* მთავარი img */}
          <img
            src={mainImage}
            alt={prodName}
            className="h-full max-w-80 sm:min-w-120 aspect-square object-cover rounded-2xl"
          />
          {/* მინი-ფოტოები */}
          <div className="flex flex-row md:flex-col gap-5 w-full md:w-auto ">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className={`min-w-18 max-w-25 sm:min-w-30 md:w-full md:max-h-40 aspect-square object-cover rounded-xl hover:scale-105 duration-300 cursor-pointer transition-all
          ${mainImage === img ? "ring-2 ring-black scale-105" : "opacity-70 hover:opacity-100"}`}
              />
            ))}
          </div>
        </div>

        {/* ინფორმაცია */}
        <div className="flex-1 w-full space-y-3 xl:space-y-6 ">
          <h1 className="text-2xl md:text-3xl lg:4xl font-bold font-integral uppercase ">
            {prodName}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">{renderStars(product.rating)}</div>
            <span className="text-sm font-satoshi">{product.rating}/5</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold">
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-2xl md:text-3xl font-bold text-black/30 line-through">
                ${product.price}
              </span>
            )}
          </div>
          <p className="text-black/60 font-satoshi pb-6 border-b border-black/10">
            {product.description}
          </p>

          {/* ფერები */}
          <div className="space-y-4 border-b border-black/10 pb-6">
            <p className="text-black/60 font-satoshi">
              Select Colors{" "}
              {!selectedColor && (
                <span className="text-red-400 text-xs ml-1">* required</span>
              )}
            </p>
            <div className="flex gap-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all border 
                  ${color.toLowerCase() === "#ffffff" ? "border-black/20" : "border-transparent"} 
                  ${
                    selectedColor?.toLowerCase() === color.toLowerCase()
                      ? "ring-2 ring-offset-1 ring-[#646464] scale-105"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <FaCheck
                      className={`${color !== "#FFFFFF" ? "text-white" : "text-black"} text-xs`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ზომები */}
          <div className="space-y-4 border-b border-black/10 pb-6">
            <p className="text-black/60 font-satoshi">
              Choose Size{" "}
              {!selectedSize && (
                <span className="text-red-400 text-xs ml-1">* required</span>
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer px-5 py-2 sm:px-6 sm:py-3 rounded-full font-satoshi transition-all ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* რაოდენობა */}
          <div className="flex gap-5 pt-4 ">
            <div className="flex items-center justify-between bg-[#F0F0F0] w-30 md:w-40 rounded-full px-4 py-2 sm:px-4 sm:py-2 max-w-35">
              <FaMinus
                onClick={() =>
                  setQuantity(Math.max(1, (Number(quantity) || 1) - 1))
                }
                className="text-2xl cursor-pointer select-none"
              ></FaMinus>
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                className="quantity-input font-bold w-full text-center bg-transparent border-none outline-none"
              />
              <FaPlus
                onClick={() => setQuantity((Number(quantity) || 0) + 1)}
                className="text-2xl cursor-pointer select-none"
              ></FaPlus>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !quantity}
              className={`flex-1 rounded-full font-medium py-4 active:scale-95 transition-all flex items-center justify-center min-w-35
                ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-black text-white disabled:bg-black/40"
                }`}
            >
              {addedToCart ? (
                <>
                  <BsCheckLg /> Added to Cart
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
      <ProductDetails product={currentProduct} />
      <AlsoMayLike />
    </main>
  );
};
