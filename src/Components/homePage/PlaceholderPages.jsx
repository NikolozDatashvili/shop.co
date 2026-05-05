import { Link } from "react-router-dom";

const PlaceholderPage = ({ title }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-5 font-satoshi">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-gray-500">This page is coming soon.</p>
      <div className="group relative ">
        <Link
          to="/"
          className=" text-black/60 hover:text-black transition-colors"
        >
          Back to Home
        </Link>
        <span className="w-0 duration-300 absolute left-0 h-0.5 -bottom-1 bg-black group-hover:w-full"></span>
      </div>
    </main>
  );
};

export const AboutPage = () => <PlaceholderPage title="About" />;
export const FeaturesPage = () => <PlaceholderPage title="Features" />;
export const WorksPage = () => <PlaceholderPage title="Works" />;
export const CareerPage = () => <PlaceholderPage title="Career" />;

export const FaqAccountPage = () => <PlaceholderPage title="Account FAQ" />;
export const FaqDeliveriesPage = () => (
  <PlaceholderPage title="Manage Deliveries" />
);
export const FaqOrdersPage = () => <PlaceholderPage title="Orders FAQ" />;
export const FaqPaymentPage = () => <PlaceholderPage title="Payment FAQ" />;

export const EbookPage = () => <PlaceholderPage title="Free eBook" />;
export const TutorialPage = () => (
  <PlaceholderPage title="Development Tutorial" />
);
export const BlogPage = () => <PlaceholderPage title="How to - Blog" />;
export const YoutubePage = () => <PlaceholderPage title="Youtube Playlist" />;
