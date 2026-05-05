import "../../Css/startUp.css";
export const DeliveryDetails = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 startUp">
      <h1 className="font-integral text-4xl mb-6 uppercase">
        Delivery Details
      </h1>
      <div className="font-satoshi space-y-4 text-black/70">
        <p>Standard Shipping: 3-5 Business Days</p>
        <p>Express Shipping: 1-2 Business Days</p>
        <p>Free shipping on all orders over $100.</p>
      </div>
    </div>
  );
};
