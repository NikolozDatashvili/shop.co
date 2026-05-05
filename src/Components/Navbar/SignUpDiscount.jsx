import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useToggle } from "../../Hooks/useToggle";
import { Link } from "react-router-dom";
const SignUpDiscount = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [bool, toggle] = useToggle(true);
  useEffect(() => {
    const handleWidthChange = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthChange);
    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return (
    bool && (
      <div className="bg-[#000000] text-[white] flex items-center justify-center p-2 font-satoshi sm:px-10 w-full">
        <p className="text-xs sm:ml-auto ">
          Sign up and get 20% off to your first order.{" "}
          <Link
            to="signup"
            className="underline cursor-pointer hover:font-bold transition-all duration-600"
          >
            Sign Up Now
          </Link>
        </p>
        {width > 640 ? (
          <IoClose
            onClick={() => toggle(false)}
            className="sm:ml-auto text-lg cursor-pointer transition-transform duration-500 hover:rotate-90 hover:scale-[1.2]"
          />
        ) : (
          <></>
        )}
      </div>
    )
  );
};

export { SignUpDiscount };
