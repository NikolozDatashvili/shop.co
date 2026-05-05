import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import "../../Css/ProductDetails.css";
const tabs = [
  { id: "DetailsActive", label: "Product Details" },
  { id: "RatingAndReviews", label: "Rating & Reviews" },
  { id: "Faqs", label: "FAQs" },
];

export const ProductDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState("RatingAndReviews");
  const [commentCount, setCommentCount] = useState(2);
  const [showReviewInput, setShowReviewInput] = useState(false);

  if (!product) return null;

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-20">
      {/* Tabs */}
      <div className="relative border-b border-gray-200">
        <div className="flex w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 flex-1 text-center transition-colors duration-300 font-satoshi text-[14px] sm:text-lg relative z-10 cursor-pointer 
                ${activeTab === tab.id ? "text-black font-medium" : "text-black/40 hover:text-black"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="absolute bottom-0 h-0.5 bg-black transition-all duration-500 ease-out"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeTabIndex * 100}%)`,
          }}
        />
      </div>

      <div className="py-12">
        {/* ტანსაცმლის დეტალები */}
        {activeTab === "DetailsActive" && (
          <div className="tab-content">
            <h3 className="font-integral text-2xl uppercase mb-4">
              Specifications
            </h3>

            <p className="text-black/60 font-satoshi leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* რევიუები */}
        {activeTab === "RatingAndReviews" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between sm:flex-row flex-col gap-4">
              <h3 className="font-integral text-2xl uppercase">
                All Reviews{" "}
                <span className="text-black/40 text-lg">
                  ({product.reviews.length})
                </span>
              </h3>
              <div className="flex gap-4 items-center">
                <button className="bg-[#F0F0F0] px-4 py-2 rounded-full font-satoshi font-medium cursor-pointer">
                  Latest
                </button>
                <button
                  onClick={() => setShowReviewInput(!showReviewInput)}
                  className="bg-black text-white px-6 py-2 rounded-full font-satoshi font-medium cursor-pointer"
                >
                  {showReviewInput ? "Cancel" : "Write a Review"}
                </button>
              </div>
            </div>

            <div
              className="review-input-container"
              style={{
                maxHeight: showReviewInput ? "400px" : "0",
                opacity: showReviewInput ? 1 : 0,
              }}
            >
              <div className="pb-5 border border-black/10 rounded-[20px] p-4 mb-8 sm:p-6">
                <textarea
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-black/10 rounded-xl focus:outline-none focus:border-black"
                  rows="4"
                />
                <button className="mt-4 bg-black text-white px-8 py-2 rounded-full cursor-pointer">
                  Submit Review
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-5">
              {product.reviews.map((review, i) => {
                const isVisible = i < commentCount;
                return (
                  <div
                    key={i}
                    className={`review-card-wrapper ${isVisible ? "is-visible" : ""}`}
                  >
                    <div className="border border-black/10 rounded-[20px] p-7 space-y-3 bg-white h-full">
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
                      <span className="text-sm text-black/60">
                        {product.rating}/5
                      </span>
                      <div className="flex items-center gap-2">
                        <p className="font-satoshi font-bold text-xl">
                          {review.user}
                        </p>
                        <FaCheck className="bg-green-500 text-white rounded-full w-4 h-4 p-1 flex items-center justify-center text-[10px]" />
                      </div>
                      <p className="text-black/60 font-satoshi italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LOAD MORE / SHOW LESS BUTTON */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  commentCount < product.reviews.length
                    ? setCommentCount((prev) => prev + 2)
                    : setCommentCount(2)
                }
                className="border border-black/10 px-10 py-3 rounded-full font-satoshi font-medium hover:bg-black hover:text-white transition-all duration-300 cursor-pointer bg-white"
              >
                {commentCount < product.reviews.length
                  ? "Load More Reviews"
                  : "Show Less"}
              </button>
            </div>
          </div>
        )}

        {/* 3. FAQS TAB */}
        {activeTab === "Faqs" && (
          <div className="tab-content max-w-3xl">
            <h3 className="font-integral text-2xl uppercase mb-6">
              Common Questions
            </h3>
            <div className="space-y-4 font-satoshi">
              <p className="font-bold">How long does shipping take?</p>
              <p className="text-black/60">
                Standard shipping usually takes 3-5 business days.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
