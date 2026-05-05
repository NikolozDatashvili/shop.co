import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import { SignUpDiscount } from "./Components/Navbar/SignUpDiscount.jsx";
import { Intro } from "./Components/homePage/Intro.jsx";
import { Sponsors } from "./Components/homePage/sponsors.jsx";
import { NewArrivals } from "./Components/homePage/NewArrivals.jsx";
import { TopSellers } from "./Components/homePage/TopSellers.jsx";
import { DressStyle } from "./Components/homePage/dressStyle.jsx";
import { HappyCostumers } from "./Components/homePage/happyCostumers.jsx";
import { Footer } from "./Components/homePage/Footer.jsx";
import CategoryPage from "./Components/ProductsPage/CategoryPage.jsx";
import { ProductPage } from "./Components/ProductsPage/Product.jsx";
import { BackToHome } from "./Components/homePage/BackToHome.jsx";
import { Brands } from "./Components/ProductsPage/Brands.jsx";
import { Cart } from "./Components/ProductsPage/Cart.jsx";
import { LoginPage } from "./Components/UserAccount/LoginPage.jsx";
import { SignupPage } from "./Components/UserAccount/SignUpPage.jsx";
import { HelpPage } from "./Components/help/Help.jsx";
import "./Css/startUp.css";
import { PrivacyPolicy } from "./Components/help/PrivacyPolicy.jsx";
import { DeliveryDetails } from "./Components/help/DeliveryDetails";
import { TermsAndConditions } from "./Components/help/TermsAndConditions.jsx";
import {
  AboutPage,
  FeaturesPage,
  WorksPage,
  CareerPage,
  FaqAccountPage,
  FaqDeliveriesPage,
  FaqOrdersPage,
  FaqPaymentPage,
  EbookPage,
  TutorialPage,
  BlogPage,
  YoutubePage,
} from "./Components/homePage/PlaceholderPages.jsx";

const brands = ["zara", "versache", "prada", "gucci", "calvin"];

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.key]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const isUnknownRoute = pathname === "*";

  return (
    <>
      <ScrollToTop />
      <SignUpDiscount />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Intro />
              <Sponsors />
              <NewArrivals />
              <TopSellers />
              <DressStyle />
              <HappyCostumers />
            </main>
          }
        />
        <Route path="*" element={<BackToHome />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route
          path="/newarrival"
          element={<CategoryPage defaultCategory="newarrival" />}
        />
        <Route
          path="/onsale"
          element={<CategoryPage defaultCategory="onsale" />}
        />
        <Route path="/Brands" element={<Brands />} />
        {brands.map((brand) => (
          <Route
            key={brand}
            path={`/${brand}`}
            element={<CategoryPage defaultCategory={brand} />}
          />
        ))}
        {/* პროდუქტები და სხვა */}
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/delivery" element={<DeliveryDetails />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Company */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/career" element={<CareerPage />} />

        {/* FAQ */}
        <Route path="/faq/account" element={<FaqAccountPage />} />
        <Route path="/faq/deliveries" element={<FaqDeliveriesPage />} />
        <Route path="/faq/orders" element={<FaqOrdersPage />} />
        <Route path="/faq/payment" element={<FaqPaymentPage />} />

        {/* Resources */}
        <Route path="/resources/ebook" element={<EbookPage />} />
        <Route path="/resources/tutorial" element={<TutorialPage />} />
        <Route path="/resources/blog" element={<BlogPage />} />
        <Route path="/resources/youtube" element={<YoutubePage />} />
      </Routes>

      {!isUnknownRoute && <Footer />}
    </>
  );
}

export default App;
