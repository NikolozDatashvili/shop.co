import casual from "../../assets/casual.png";
import gym from "../../assets/gym.png";
import formal from "../../assets/formal.png";
import party from "../../assets/party.png";
import "../../Css/DressStyle.css";
import { useWindowSize } from "../../Hooks/useWindowSize";
import { useScrollReveal } from "../../Hooks/useScroll";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const DressStyle = () => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const navigate = useNavigate();
  const styles = [
    { name: "Casual", img: casual, divClass: "max-w-88.5", bg: "white" },
    { name: "Formal", img: formal, divClass: "formalDiv", bg: "#fcfcfc" },
    { name: "Party", img: party, divClass: "partyDiv", bg: "white" },
    { name: "Gym", img: gym, divClass: "lg:w-101.75", bg: "white" },
  ];

  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="p-5 px-10  xl:p-10">
      <div className="bg-[#F0F0F0]   mt-10 rounded-3xl flex flex-col items-center px-5">
        <p className="font-integral pb-5 text-3xl xl:text-5xl text-center pt-8 xl:pt-12 px-2 uppercase tracking-wide">
          Browse By Dress Style
        </p>

        <div
          ref={ref}
          className={`gap-5 ${isMobile ? "flex flex-col" : "flex flex-row flex-wrap"} w-full items-center justify-center py-8 pt-10 px-5 xl:px-15 font-satoshi font-bold text-2xl md:text-4xl`}
        >
          {styles.map((style, i) => (
            <motion.div
              key={style.name}
              /// ასქროლვა ჩამოსქროლვის დროს
              initial={{ opacity: 0, y: 100 }}
              animate={
                isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
              }
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: isVisible ? i * 0.1 : 0,
              }}
              className={`imgDivs shrink-0 ${style.divClass}`}
            >
              <motion.div
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.4 }}
                className="relative w-full flex justify-end rounded-3xl overflow-hidden"
                style={{ backgroundColor: style.bg }}
                onClick={() =>
                  navigate(`/category/${style.name.toLowerCase()}`)
                }
              >
                <p className="absolute left-5 top-5 sm:left-8 sm:top-8 z-20 text-black">
                  {style.name}
                </p>

                <img
                  className="dressStyleImg justify-self-end"
                  src={style.img}
                  alt={`${style.name} section`}
                  style={{ zIndex: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
