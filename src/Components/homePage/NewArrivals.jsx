import { products } from "../../data/staticProducts";
import { StarRating } from "../Navbar/productDropDown";
import { useWindowSize } from "../../Hooks/useWindowSize"; // Assuming the path
import { useScrollReveal } from "../../Hooks/useScroll";
import { Link, useNavigate } from "react-router-dom";
export const NewArrivals = () => {
  const { width } = useWindowSize();
  const isWide = width > 767;
  const navigate = useNavigate();
  //// ახალი პროდუქტები
  const arrivalProducts = products.filter((prod) => prod.newArrival);

  const displayedProducts = !isWide
    ? arrivalProducts.slice(0, 2)
    : arrivalProducts.slice(0, 4);

  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`pt-20 ml-10 md:px-10 transition-all duration-700 ease-out mb-20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <p className="font-integral text-center pb-10 text-3xl md:text-4xl">
        New Arrivals
      </p>

      <div className="font-satoshi ml-8 flex gap-4  md:flex-wrap pb-4  justify-center">
        {displayedProducts.map((prod, i) => (
          <div
            onClick={() => navigate(`/product/${prod.id}`)}
            key={i}
            className="min-w-50 max-w-100 md:min-w-0 md:flex-1"
          >
            <img
              className="rounded-2xl aspect-square object-cover bg-[#F0F0F0] w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              src={prod.images[0]}
              alt={prod.name.replaceAll("_", " ")}
            />
            <p className="font-bold pt-3 text-sm md:text-base">
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
        to="category/newarrival"
        className="flex justify-self-center items-center justify-center w-[85%]  md:w-60 h-13 border-2 border-black/10 rounded-full font-medium hover:bg-black hover:text-white transition-all cursor-pointer duration-300  mt-10"
      >
        View All
      </Link>
    </section>
  );
};
