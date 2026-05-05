import { NewsLetter } from "./NewsLetter";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa6";
import "../../Css/Footer.css";
import { Link } from "react-router-dom";
import {
  FaCcApplePay,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
} from "react-icons/fa6";

export const Footer = () => {
  const footerLinks = [
    { name: "Customer Support", path: "/help" },
    { name: "Delivery Details", path: "/delivery" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Works", path: "/works" },
    { name: "Career", path: "/career" },
  ];

  const faqLinks = [
    { name: "Account", path: "/faq/account" },
    { name: "Manage Deliveries", path: "/faq/deliveries" },
    { name: "Orders", path: "/faq/orders" },
    { name: "Payment", path: "/faq/payment" },
  ];

  const resourceLinks = [
    { name: "Free eBook", path: "/resources/ebook" },
    { name: "Development Tutorial", path: "/resources/tutorial" },
    { name: "How to - Blog", path: "/resources/blog" },
    { name: "Youtube Playlist", path: "/resources/youtube" },
  ];

  return (
    <footer className="mt-50 w-full bg-[#F0F0F0] relative flex flex-col px-5 pt-50 pb-10 gap-10 md:px-10 xl:px-25 xl:pt-40">
      <NewsLetter />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-gray-300 pb-10">
        {/* Brand */}
        <div className="flex flex-col gap-5 max-w-sm">
          <p className="font-integral text-3xl">Shop.co</p>
          <p className="font-satoshi text-gray-500 leading-6">
            We have clothes that suits your style and which you're proud to
            wear. From women to men.
          </p>
          <div className="socials flex gap-3 items-center">
            <div className="social-icon-wrapper">
              <FaFacebookF />
            </div>
            <div className="social-icon-wrapper">
              <FaTwitter />
            </div>
            <div className="social-icon-wrapper">
              <FaInstagram />
            </div>
            <div className="social-icon-wrapper">
              <FaGithub />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
          {/* Company */}
          <div className="footer-column">
            <h4 className="liHead">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black/60 hover:text-black font-satoshi transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-satoshi font-bold uppercase mb-6">Help</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black/60 hover:text-black font-satoshi transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="footer-column">
            <h4 className="liHead">FAQ</h4>
            <ul className="space-y-4">
              {faqLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black/60 hover:text-black font-satoshi transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h4 className="liHead">Resources</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black/60 hover:text-black font-satoshi transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* copyright, cards */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-5">
        <p className="text-gray-500 font-satoshi text-sm">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <div className="flex gap-2">
          <FaCcApplePay className="card" />
          <FaCcVisa className="card" />
          <FaCcMastercard className="card" />
          <FaPaypal className="card" />
          <FaGooglePay className="card px-1" />
        </div>
      </div>
    </footer>
  );
};
