import {
  Search,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Mail,
} from "lucide-react";
import "../../Css/startUp.css";
const helpCategories = [
  {
    id: "orders",
    icon: ShoppingBag,
    title: "Orders",
    desc: "Track, change, or cancel an order",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Delivery",
    desc: "Shipping speeds and carrier info",
  },
  {
    id: "returns",
    icon: RotateCcw,
    title: "Returns",
    desc: "Start a return or check refund status",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    desc: "Manage password and account privacy",
  },
];

const FAQS = [
  {
    q: "How can I track my order status?",
    a: "Once your order ships, you'll receive an email with a tracking link. You can also view this in your Account Dashboard under 'Order History'.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return window for all unworn items in their original packaging. Return shipping is free for all domestic orders.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We currently ship to over 50 countries. Shipping costs and delivery times vary by location and are calculated at checkout.",
  },
];

export const HelpPage = () => {
  return (
    <div className="min-h-screen bg-white mt-10 startUp ">
      {/* Search */}
      <section className="bg-[#F0F0F0] py-20 px-8 rounded-3xl w-[80%] mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-integral text-2xl sm:text-3xl md:text-6xl uppercase leading-tight">
            How can we help?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-black/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for articles (e.g. 'refunds')"
              className="w-full pl-14 pr-6 py-2 sm:py-4 rounded-full font-satoshi border-none focus:ring-2 focus:ring-black outline-none shadow-sm caret-black"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Category */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpCategories.map((cat) => (
            <div
              key={cat.id}
              className="border border-black/5 p-8 rounded-[20px] hover:border-black transition-all cursor-pointer group"
            >
              <cat.icon
                className="mb-4 text-black group-hover:scale-110 transition-transform"
                size={32}
              />
              <h3 className="font-satoshi font-bold text-xl mb-2">
                {cat.title}
              </h3>
              <p className="text-black/50 font-satoshi text-sm">{cat.desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-integral text-3xl uppercase text-center">
            Popular Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-black/10 pb-4 outline-none"
              >
                <summary className="list-none flex justify-between items-center cursor-pointer font-satoshi font-bold text-lg py-2">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="font-satoshi text-black/60 pt-2 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <section className="bg-black rounded-4xl p-10 md:p-16 text-center text-white space-y-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="font-integral text-3xl uppercase">
              Still need support?
            </h2>
            <p className="font-satoshi text-white/60">
              Our support team is available Monday to Friday, 9am - 5pm EST.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-satoshi font-bold hover:bg-white/90 transition-all cursor-pointer">
              <MessageCircle size={20} />
              Live Chat
            </button>
            <button className="flex items-center justify-center gap-3 border border-white/20 px-8 py-4 rounded-full font-satoshi font-bold hover:bg-white/10 transition-all cursor-pointer">
              <Mail size={20} />
              Email Support
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
