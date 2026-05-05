import calvin from "../../assets/calvin.png";
import zara from "../../assets/zara.png";
import versache from "../../assets/versache.png";
import prada from "../../assets/prada.png";
import gucci from "../../assets/gucci.png";
import "../../Css/startUp.css";
import { useNavigate } from "react-router-dom";
export const Brands = () => {
  const navigate = useNavigate();
  const brands = [
    { src: zara, id: "zara" },
    { src: versache, id: "versache" },
    { src: prada, id: "prada" },
    { src: gucci, id: "gucci" },
    { src: calvin, id: "calvin klein" },
  ];

  return (
    <div className="w-[90%] 2xl:w-[60%] flex items-center justify-center flex-col bg-[#F0F0F0] mt-10 rounded-3xl md:mb-10 mb-50 ">
      <p className="mt-10 font-integral text-4xl  tracking-widest ">Brands</p>
      <div className="gap-x-8 flex flex-col  sm:grid sm:grid-cols-2 p-10 md:p-20 gap-5   w-full startUp">
        {brands.map((brand, index) => (
          <div
            onClick={() => navigate(`/category/${brand.id}`)}
            key={index}
            className={`bg-white px-8 py-7 sm:px-15 sm:py-10 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-sm hover:scale-102 hover:drop-shadow-[0_2px_3px_rgba(2,2,2,0.3)] cursor-pointer duration-300
            ${brand.id === "calvin klein" ? "col-span-2 sm:py-12" : "col-span-1"}
          `}
          >
            <img
              className="h-8 md:h-12 object-contain invert"
              src={brand.src}
              alt={`${brand.id} logo`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
