import { Link } from "react-router-dom";

export const BackToHome = () => {
  return (
    <>
      <div className="mt-20 mb-50 text-center flex flex-col items-center">
        <p className="text-3xl">404</p>
        <p className="pb-5 text-2xl">Page not Found </p>
        <div className="relative group w-max">
          <Link
            to="/"
            className="font-satoshi  block transition-all duration-300 group-hover:drop-shadow-[0_2px_3px_rgba(2,2,2,0.3)]"
          >
            Back to Home
          </Link>

          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
        </div>
      </div>
    </>
  );
};
