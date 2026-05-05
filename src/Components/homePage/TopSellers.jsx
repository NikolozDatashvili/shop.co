import { products } from "../../data/staticProducts";
import { StarRating } from "../Navbar/productDropDown";
import { useWindowSize } from "../../Hooks/useWindowSize";
import { useScrollReveal } from "../../Hooks/useScroll";
import { Link, useNavigate } from "react-router-dom";
export const TopSellers = () => {
  const { width } = useWindowSize();
  const isWide = width > 767;
  const navigate = useNavigate();
  const topProducts = products.filter((prod) => prod.topSeller);

  const displayedProducts = !isWide
    ? topProducts.slice(0, 2)
    : topProducts.slice(0, 4);

  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`ml-10  transition-all duration-700 ease-out   md:px-10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <p className="font-integral text-center pb-10 text-3xl md:text-4xl">
        Top Selling
      </p>

      <div className="ml-8 flex gap-4 justify-center md:flex-wrap pb-4 scroll-snap font-satoshi">
        {displayedProducts.map((prod, i) => (
          <div
            key={i}
            className="min-w-50 md:min-w-0 max-w-100 md:flex-1 snap-item"
          >
            <img
              onClick={() => navigate(`/product/${prod.id}`)}
              className="rounded-2xl aspect-square object-cover bg-[#F0F0F0] w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              src={prod.images[0]}
              alt={prod.name.replaceAll("_", " ")}
            />
            <p className="font-bold pt-3 text-sm md:text-base truncate">
              {prod.name.replaceAll("_", " ")}
            </p>
            <div className="flex items-center gap-2 py-1">
              <StarRating rating={prod.rating} />
              <span className="text-sm">{prod.rating}/5</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-lg">
                ${prod.discountPrice ?? prod.price}
              </p>
              {prod.discountPrice && (
                <>
                  <p className="text-gray-400 line-through font-bold">
                    ${prod.price}
                  </p>
                  <span className="bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded-full">
                    {prod.discountPercent}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <Link
        to="category/shop"
        className="w-[85%] justify-self-center md:w-65 h-13 border border-black/10 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 cursor-pointer flex justify-center items-center mt-10"
      >
        View All
      </Link>
    </section>
  );
};
