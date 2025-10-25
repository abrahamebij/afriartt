import { TrendingUp } from "lucide-react";
import Img from "../ui/Img";

const collections = [
  {
    id: 1,
    image: "/images/arts/nft-1.jpg",
    name: "Tribal Spirits",
    items: "156 items",
    volume: "245.8 HBAR",
  },
  {
    id: 2,
    image: "/images/arts/nft-2.jpg",
    name: "Savanna Sunsets",
    items: "89 items",
    volume: "189.2 HBAR",
  },
  {
    id: 3,
    image: "/images/arts/nft-3.jpg",
    name: "Geometric Heritage",
    items: "203 items",
    volume: "312.5 HBAR",
  },
  {
    id: 4,
    image: "/images/arts/nft-4.jpg",
    name: "African Queens",
    items: "124 items",
    volume: "267.9 HBAR",
  },
];

const TrendingCollections = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Trending Collections</h2>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-min">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="flex-none w-72 group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-4 hover-lift">
                  <Img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{collection.items}</span>
                    <span className="font-semibold text-primary">{collection.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCollections;
