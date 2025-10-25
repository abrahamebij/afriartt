import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Img from "../ui/Img";

const artworks = [
  {
    id: 1,
    image: "/images/arts/nft-1.jpg",
    title: "Ancestral Mask #12",
    creator: "Kwame Digital",
    initials: "KD",
    price: "8.5 HBAR",
    likes: 234,
  },
  {
    id: 2,
    image: "/images/arts/nft-2.jpg",
    title: "Golden Savanna",
    creator: "Amara Creates",
    initials: "AC",
    price: "12.0 HBAR",
    likes: 189,
  },
  {
    id: 3,
    image: "/images/arts/nft-3.jpg",
    title: "Geometric Dreams",
    creator: "Zola Art",
    initials: "ZA",
    price: "6.8 HBAR",
    likes: 156,
  },
  {
    id: 4,
    image: "/images/arts/nft-4.jpg",
    title: "Queen of Nubia",
    creator: "Thabo NFT",
    initials: "TN",
    price: "15.5 HBAR",
    likes: 312,
  },
  {
    id: 5,
    image: "/images/arts/nft-5.jpg",
    title: "Desert Architecture",
    creator: "Nia Vision",
    initials: "NV",
    price: "9.2 HBAR",
    likes: 198,
  },
  {
    id: 6,
    image: "/images/arts/nft-6.jpg",
    title: "Kente Weave #5",
    creator: "Kofi Blocks",
    initials: "KB",
    price: "11.0 HBAR",
    likes: 267,
  },
];

const FeaturedArtworks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Artworks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated masterpieces from Africa&apos;s most talented digital artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="group cursor-pointer overflow-hidden border-border hover:border-primary transition-all hover-lift"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col items-start gap-4 p-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {artwork.title}
                </h3>
                
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="gradient-warm text-primary-foreground text-xs font-bold">
                        {artwork.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{artwork.creator}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 fill-current" />
                    {artwork.likes}
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Current price</span>
                  <span className="text-lg font-bold text-primary">{artwork.price}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;
