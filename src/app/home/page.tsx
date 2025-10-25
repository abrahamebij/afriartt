import TrendingCollections from "@/components/home/TrendingCollections";
import TopArtists from "@/components/home/TopArtists";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrendingCollections />
      <TopArtists />
      <FeaturedArtworks />
      <CTASection />
    </div>
  );
};

export default Index;
