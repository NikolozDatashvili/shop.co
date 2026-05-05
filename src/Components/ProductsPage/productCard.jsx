/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import "../../Css/startUp.css";
import { motion, AnimatePresence } from "framer-motion";

export const ProductCard = ({ product, filterKey }) => {
  const hasDiscount = product.discountPrice !== null;
  const prodName = product.name.replaceAll("_", " ");

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col gap-2 group cursor-pointer"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${filterKey}-${product.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="w-full h-full"
        >
          <img
            src={
              product.images?.[0] ||
              "https://placehold.co/400x500?text=Loading..."
            }
            alt={prodName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 rounded-[20px] aspect-[1/1.2]"
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-1 mt-2">
        <h3 className="font-bold text-base md:text-lg lg:text-xl truncate">
          {prodName}
        </h3>

        {/* რეიტინგი */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <IoStar
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-black/60">{product.rating}/5</span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="font-bold text-xl lg:text-2xl">
            ${hasDiscount ? product.discountPrice : product.price}
          </span>

          {hasDiscount && (
            <>
              <span className="text-black/40 line-through font-bold text-xl lg:text-2xl">
                ${product.price}
              </span>
              <span className="bg-[#FF3333]/10 text-[#FF3333] px-3 py-1 rounded-full text-xs font-medium">
                {product.discountPercent}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
