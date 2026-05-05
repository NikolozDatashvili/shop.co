import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { reviewBank } from "../../data/products";
import { useWindowSize } from "../../Hooks/useWindowSize";
import { useScrollReveal } from "../../Hooks/useScroll";
import { FaCheck } from "react-icons/fa6";
export const HappyCostumers = () => {
  const { width } = useWindowSize();
  const reviews = reviewBank.filter((review) => review.rating === 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isMobile = width < 640;
  const visibleCount = isMobile ? 1 : 3;
  const slideCount = isMobile ? 1 : 3;

  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.4 },
    }),
  };

  const slider = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + slideCount) % reviews.length);
    } else {
      setCurrentIndex(
        (prev) => (prev - slideCount + reviews.length) % reviews.length,
      );
    }
  };

  const getVisibleReviews = () => {
    let items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return items;
  };

  return (
    <section
      ref={ref}
      className={`py-10 px-16 md:py-20 overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="flex justify-between mb-8 max-w-7xl mx-auto px-5 gap-x-5">
        <p className="font-integral text-2xl md:text-5xl uppercase tracking-wide">
          Our Happy Customers
        </p>
        <div className="flex gap-x-3 mb-2 self-end">
          <button
            onClick={() => slider(-1)}
            className="p-2 border rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <HiArrowLeft className="h-4 w-4 sm:h-6 sm:w-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={() => slider(1)}
            className="p-2 border rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <HiArrowRight className="h-4 w-4  sm:h-6 sm:w-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      <div className="relative flex justify-center gap-5 px-5 min-h-62.5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {getVisibleReviews().map((rev, idx) => (
            <motion.div
              key={`${currentIndex}-${rev.user}-${idx}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="border border-black/10 rounded-[20px] p-6 md:p-8 bg-white flex flex-col justify-between
                         w-full md:w-[calc(33.33%-1.25rem)] shrink-0 shadow-sm cursor-pointer hover:border-black/20 transition-colors"
            >
              <div>
                <div className="text-yellow-400 mb-3 flex gap-1">
                  {"★".repeat(rev.rating)}
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold flex items-center gap-1 text-lg md:text-xl">
                    {rev.user}
                  </p>
                  <FaCheck className="bg-green-500 text-white rounded-full w-4.5 h-4.5 p-0.75"></FaCheck>
                </div>
                <p className="text-black/60 mt-3 text-sm md:text-base leading-relaxed line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
