import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../../data/staticProducts";
import { StarRating } from "../Navbar/productDropDown";
export const AlsoMayLike = () => {
  const navigate = useNavigate();
  /// url-დან წამოღებული id
  const { productId } = useParams();

  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      //// currentProduct-ს ვაშორებ
      const filtered = products.filter(
        (p) => String(p.id) !== String(productId),
      );

      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setDisplayedProducts(shuffled.slice(0, 4));
    }, 0);

    return () => clearTimeout(timer);
  }, [productId]);

  return (
    <section className="text-center space-y-10 ">
      <p className="uppercase text-2xl font-integral">You might also like</p>
      <div className="flex gap-5 overflow-x-scroll md:overflow-x-visible ">
        {displayedProducts.map((prod) => (
          <div className="flex flex-col text-left">
            <img
              onClick={() => navigate(`/product/${prod.id}`)}
              key={prod.id}
              src={prod.images[0]}
              alt={prod.name}
              className="rounded-2xl min-w-45 max-w-100 aspect-square object-cover bg-[#F0F0F0] w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            />
            <p className="font-bold pt-3 text-sm md:text-base">
              {prod.name.replaceAll("_", " ")}
            </p>
            <div className="flex items-center gap-2 py-1 ">
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
    </section>
  );
};
