import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { IoChevronForward, IoTrash } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import "../../Css/startUp.css";
export const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCart();

  const total = getTotalPrice();
  const discount = items.reduce((acc, item) => {
    if (item.discountPrice) {
      return acc + (item.price - item.discountPrice) * item.quantity;
    }
    return acc;
  }, 0);

  if (items.length === 0) {
    return (
      <main className="w-[45%] mx-auto px-4 md:px-10 py-6 startUp">
        <nav className="flex items-center gap-2 mb-6 text-sm font-satoshi border-t border-black/10 pt-6">
          <Link to="/" className="text-black/60 hover:text-black">
            Home
          </Link>
          <IoChevronForward className="text-black/60 w-3.5 h-3.5" />
          <span className="font-medium text-black">Cart</span>
        </nav>
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-black/40 font-satoshi">
          <p className="text-2xl font-medium">Your cart is empty</p>
          <p className="text-sm">Add some products to get started</p>
          <Link
            to="/category/shop"
            className="mt-4 bg-black text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full font-medium hover:bg-black/80 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-360 mx-auto px-4 md:px-10 py-6 startUp">
      {/* მინი-ნავიგაცია */}
      <nav className="flex items-center gap-2 mb-6 text-sm font-satoshi border-t border-black/10 pt-6">
        <Link to="/" className="text-black/60 hover:text-black">
          Home
        </Link>
        <IoChevronForward className="text-black/60 w-3.5 h-3.5" />
        <span className="font-medium text-black">Cart</span>
      </nav>

      <h1 className="text-3xl font-bold font-integral uppercase mb-8">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="flex gap-4 p-4 border border-black/10 rounded-[20px]"
            >
              {/* სურათი */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-xl overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* დეტალები */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base md:text-lg capitalize">
                      {item.name.replaceAll("_", " ")}
                    </h3>
                    <p className="text-black/60 font-satoshi text-sm mt-1">
                      Size:{" "}
                      <span className="text-black font-medium">
                        {item.size}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-black/60 font-satoshi text-sm">
                        Color:
                      </p>
                      <div
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-xl">
                    ${item.discountPrice ?? item.price}
                  </span>
                  {/* რაოდენობა */}
                  <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-full px-4 py-2">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.cartId)
                          : updateQuantity(item.cartId, item.quantity - 1)
                      }
                      className="cursor-pointer hover:text-black/60 transition-colors"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                      className="cursor-pointer hover:text-black/60 transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="self-start text-sm text-black/40 hover:text-red-500 transition-colors font-satoshi underline mt-2"
          >
            Clear Cart
          </button>
        </div>

        {/* გამოწერილი ტანსაცმელი */}
        <div className="lg:w-96 h-fit border border-black/10 rounded-[20px] p-6 space-y-4 font-satoshi">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex justify-between text-black/60">
            <span>
              Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)
            </span>
            <span className="text-black font-medium">
              ${(total + discount).toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-black/60">
            <span>Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>

          <div className="border-t border-black/10 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add promo code"
              className="flex-1 bg-[#F0F0F0] rounded-full px-4 py-3 text-sm outline-none"
            />
            <button className="bg-black text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-all">
              Apply
            </button>
          </div>

          <button className="w-full bg-black text-white rounded-full py-4 font-medium hover:bg-black/80 transition-all active:scale-95">
            Go to Checkout →
          </button>
        </div>
      </div>
    </main>
  );
};
