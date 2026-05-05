import { IoChevronDown, IoChevronUp } from "react-icons/io5";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../Css/NavDropdown.css";
import "../../Css/startUp.css";

export const NavigationDropdown = ({ isOpen, onClose, isMobile }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-30 animate-fadeIn md:bg-transparent w-full"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, display: "block" }
            : { opacity: 0, y: -10, transitionEnd: { display: "none" } }
        }
        className={`absolute z-50 bg-white shadow-2xl 
        ${isMobile ? "top-full left-0 w-full" : "top-[120%] left-0 w-64 rounded-2xl"}`}
      >
        <div className="flex  w-full font-medium text-black">
          <div className="w-full">
            <div className="overflow-hidden flex flex-col sm:flex-row  items-center  text-gray-600 sm:px-5 sm:py-2">
              <ul className=" py-1  flex flex-col w-full text-center sm:text-start">
                {["Casual", "Formal", "Party", "Gym"].map((cat) => (
                  <li
                    key={cat}
                    className="w-full border-b border-gray-300 p-2.5 sm:p-1 sm:border-0"
                  >
                    <Link
                      to={`/category/${cat.toLowerCase()}`}
                      onClick={onClose}
                      className="hover:text-black transition-colors w-full"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col text-center sm:text-end w-full ">
                {["Man", "Woman"].map((cat) => (
                  <li
                    key={cat}
                    className="w-full border-b border-gray-300 p-2.5 sm:border-0 sm:p-1"
                  >
                    <Link
                      to={`/category/${cat.toLowerCase()}`}
                      onClick={onClose}
                      className="hover:text-black transition-colors  w-full"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
                {isMobile && (
                  <>
                    {[
                      { name: "On Sale", path: "/onsale" },
                      { name: "New Arrivals", path: "/newarrival" },
                      { name: "Brands", path: "/Brands" },
                    ].map((link) => (
                      <li
                        key={link.name}
                        className="w-full border-b border-gray-300 p-2.5"
                      >
                        <Link
                          onClick={onClose}
                          to={link.path}
                          className="w-full"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
