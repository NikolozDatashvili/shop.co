import "../../Css/startUp.css";
export const LegalLayout = ({ title, children }) => (
  <main className=" bg-white startUp">
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-integral text-4xl md:text-5xl mb-10 uppercase">
        {title}
      </h1>
      <div className="font-satoshi text-black/70 leading-loose space-y-8 text-lg">
        {children}
      </div>
    </div>
  </main>
);
