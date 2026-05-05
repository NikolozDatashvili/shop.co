import calvin from "../../assets/calvin.png";
import zara from "../../assets/zara.png";
import versache from "../../assets/versache.png";
import prada from "../../assets/prada.png";
import gucci from "../../assets/gucci.png";
import "../../Css/Logos.css";
export const Sponsors = () => {
  return (
    <div className="logos startUp flex flex-row  w-full translate-0 -translate-y-10 gap-5 ">
      <img src={versache} alt="" />
      <img src={zara} alt="" />
      <img src={gucci} alt="" />
      <img src={prada} alt="" />
      <img src={calvin} alt="" />
    </div>
  );
};
