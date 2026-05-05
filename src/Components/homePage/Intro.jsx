import bgPhone from "../../assets/bgPhone.png";

import { useWindowSize } from "../../Hooks/useWindowSize";
import bgImg from "../../assets/bgImg.png";
import { Link } from "react-router-dom";
export const Intro = () => {
  const { width } = useWindowSize();

  const isWide = width > 1024;

  return (
    <section className="startUp relative w-full min-h-125 lg:h-[80vh] bg-[#F2F0F1] overflow-hidden flex flex-col lg:flex-row items-center md:justify-start lg:w-full 2xl:pl-30 px-7  ">
      {isWide && (
        <img
          src={bgImg}
          className="absolute inset-0 w-full h-full object-contain object-right z-0 select-none"
          alt="Banner Background"
        />
      )}

      {/* intro-ს დივი */}

      <div className="introDiv relative z-10 w-full lg:w-[55%] xl:w-[50%] px-10 sm:px-10 lg:pl-10   xl:pl-20 2xl:pl-35 py-12 lg:py-0 flex flex-col gap-8 md:gap-8 items-center lg:text-left lg:gap-6 2xl:gap-10 justify-center text-left sm:text-center  ">
        <h2 className="font-integral text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-tight xl:leading-15 md:leading-12 text-black   2xl:text-center ">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>

        <p className="text-[#00000099] text-sm md:text-base leading-relaxed font-satoshi w-[95%] self-start 2xl:self-center 2xl:text-center ">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        <Link
          to={"category/shop"}
          className="w-full flex items-center justify-center sm:w-auto rounded-full py-3 bg-black text-white  transition-all hover:scale-[1.05] duration-300 active:scale-95 cursor-pointer sm:px-15 group"
        >
          Shop Now
        </Link>

        {/* Stats */}
        <div className=" font-satoshi flex flex-wrap justify-center sm:justify-start lg:gap-x-4 gap-y-6 gap-x-8 md:gap-x-12 mt-4">
          <div className="pr-8 border-r border-[#0000001A]">
            <p className=" font-bold text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              200+
            </p>
            <p className="text-xs md:text-sm text-[#00000099]">
              International Brands
            </p>
          </div>

          <div className="sm:pr-8 sm:border-r border-[#0000001A]">
            <p className=" font-bold text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  ">
              2,000+
            </p>
            <p className=" text-xs md:text-sm text-[#00000099]">
              High-Quality Products
            </p>
          </div>

          <div className="w-full sm:w-auto text-center sm:text-left">
            <p className=" font-bold text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl">
              30,000+
            </p>
            <p className=" text-xs md:text-sm text-[#00000099]">
              Happy Customers
            </p>
          </div>
        </div>
      </div>

      {!isWide && (
        <div className="w-full mt-auto bg-[#F2F0F1]">
          <img
            className="w-full h-auto object-contain"
            src={bgPhone}
            alt="Mobile Banner"
          />
        </div>
      )}
    </section>
  );
};
