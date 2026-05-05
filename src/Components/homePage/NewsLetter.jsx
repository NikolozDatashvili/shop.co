import { TfiEmail } from "react-icons/tfi";
import { useScrollReveal } from "../../Hooks/useScroll";
import useLocalStorage from "../../Hooks/useLocaleStorage";
import { useState, useEffect } from "react";

export const NewsLetter = () => {
  const [storedEmails, setStoredEmails] = useLocalStorage(
    "newsletter_emails_list",
    [],
  );
  const [inp, setInp] = useState("");
  const [inpIsInvalid, setInpIsInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Use hex codes or standard colors to make inline styling reliable
  const [errorColor, setErrorColor] = useState("#ef4444");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (inpIsInvalid) {
      const timer = setTimeout(() => setInpIsInvalid(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [inpIsInvalid]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setInp("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleInp = (e) => {
    setInp(e.target.value);
    if (inpIsInvalid) setInpIsInvalid(false);
  };

  const HandleSave = () => {
    const trimmedEmail = inp.trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address");
      setErrorColor("#ef4444"); // Red-500
      setInpIsInvalid(true);
      return;
    }

    if (storedEmails.includes(trimmedEmail)) {
      setErrorMsg("This email is already subscribed!");
      setErrorColor("#f97316"); // Orange-500
      setInpIsInvalid(true);
      return;
    }

    setStoredEmails([...storedEmails, trimmedEmail]);
    setIsSuccess(true);
    setInpIsInvalid(false);
  };

  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
      flex flex-col md:flex-row gap-5 md:gap-20 rounded-[20px] bg-black text-white 
      px-6 py-10 tracking-wide items-center justify-between xl:px-20 
      xl:justify-evenly sm:px-10 z-50 transition-opacity duration-700 w-[90%] max-w-6xl
      ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <p className="uppercase text-3xl font-integral leading-9 py-3">
        Stay up to date about our latest offers
      </p>

      <div className="flex flex-col w-full md:max-w-80 gap-1">
        <div className="h-6 flex items-center px-5">
          {inpIsInvalid && (
            <p
              style={{ color: errorColor }}
              className="font-satoshi text-[12px] italic animate-pulse"
            >
              {errorMsg}
            </p>
          )}
        </div>

        <div
          style={{
            boxShadow: inpIsInvalid ? `0px 0px 15px ${errorColor}66` : "",
            borderColor: inpIsInvalid ? errorColor : "transparent",
          }}
          className={`relative w-full flex bg-white p-2 sm:p-3 px-5 rounded-3xl text-black font-satoshi items-center transition-all duration-300 border-2
          ${!inpIsInvalid ? "focus-within:ring-1 focus-within:ring-white focus-within:shadow-[0px_0px_15px_rgba(255,255,255,0.6)] border-transparent" : ""}`}
        >
          <TfiEmail
            className={`${isSuccess ? "text-green-600" : "text-[gray]"} transition-colors duration-500 cursor-pointer hover:text-black`}
          />
          <input
            type="text"
            onChange={handleInp}
            value={isSuccess ? "Subscription Successful!" : inp}
            placeholder="enter your email address"
            className={`w-full rounded-3xl px-3 outline-none bg-transparent font-satoshi text-black transition-colors ${
              isSuccess ? "text-green-600 font-bold" : ""
            }`}
            readOnly={isSuccess}
          />
        </div>

        <div className="h-2"></div>

        <button
          onClick={HandleSave}
          disabled={isSuccess}
          className="bg-white font-satoshi text-black p-2 sm:p-3 rounded-3xl w-full cursor-pointer transition-all duration-300 
          hover:shadow-[0px_0px_15px_rgba(255,255,255,0.6)] 
          active:shadow-[0px_0px_20px_rgba(255,255,255,0.9)] 
          active:scale-95 disabled:bg-gray-200 disabled:shadow-none"
        >
          {isSuccess ? "Thank You!" : "Subscribe to Newsletter"}
        </button>
      </div>
    </div>
  );
};
