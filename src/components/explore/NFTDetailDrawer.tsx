import { X, ExternalLink, Clock, TrendingUp } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface NFTDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: {
    id: number;
    title: string;
    creator: string;
    price: string;
    image: string;
    likes: number;
  };
  onNFTChange?: (nft: NFTDetailDrawerProps['nft']) => void;
}

const ownershipHistory = [
  { owner: "0x1234...5678", date: "2025-01-15", price: "12.5 HBAR" },
  { owner: "0xabcd...efgh", date: "2024-12-20", price: "10.0 HBAR" },
  { owner: "0x9876...5432", date: "2024-11-10", price: "8.5 HBAR" },
];

const attributes = [
  { trait: "Background", value: "Sunset", rarity: "15%" },
  { trait: "Style", value: "Abstract", rarity: "23%" },
  { trait: "Color Palette", value: "Warm", rarity: "35%" },
  { trait: "Medium", value: "Digital", rarity: "67%" },
];

const relatedNFTs = Array.from({ length: 6 }, (_, i) => ({
  id: i + 100,
  title: `Related Art #${i + 1}`,
  creator: `Artist ${i + 1}`,
  price: (Math.random() * 5 + 0.5).toFixed(2),
  image: `/src/assets/nft-${(i % 6) + 1}.jpg`,
}));

const NFTDetailDrawer = ({ open, onOpenChange, nft, onNFTChange }: NFTDetailDrawerProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = 0;
      }
    }
  }, [nft.id]);

  const handleRelatedClick = (relatedNFT: typeof nft) => {
    if (onNFTChange) {
      onNFTChange(relatedNFT);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] bg-card border-t-2 border-primary/20">
        <DrawerHeader className="border-b border-border px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DrawerTitle className="text-2xl font-bold mb-1">
                {nft.title}
              </DrawerTitle>
              <p className="text-sm text-muted-foreground">
                African Legends Collection
              </p>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <ScrollArea ref={scrollAreaRef} className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <div className="space-y-6">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      Digital Art
                    </Badge>
                    <Badge variant="secondary" className="backdrop-blur-sm">
                      Verified
                    </Badge>
                  </div>
                </div>

                {/* Attributes */}
                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-lg mb-4">Attributes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {attributes.map((attr) => (
                      <div
                        key={attr.trait}
                        className="bg-card rounded-lg p-3 border border-border"
                      >
                        <p className="text-xs text-muted-foreground uppercase">
                          {attr.trait}
                        </p>
                        <p className="font-semibold mt-1">{attr.value}</p>
                        <p className="text-xs text-primary mt-1">
                          {attr.rarity} have this
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Creator Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="gradient-warm text-white text-xl">
                      {nft.creator.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-bold text-lg">{nft.creator}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {/* Price & Purchase */}
                <div className="bg-card rounded-xl border-2 border-primary/30 p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Current Price
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-primary">
                        {nft.price}
                      </p>
                      <p className="text-xl text-muted-foreground">HBAR</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ≈ ${(parseFloat(nft.price) * 0.05).toFixed(2)} USD
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 gradient-warm border-0 h-12 text-base font-semibold">
                      Buy Now
                    </Button>
                    <Button variant="outline" className="flex-1 h-12">
                      Make Offer
                    </Button>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Creator Royalty
                      </span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A stunning piece capturing the essence of African creativity
                    and culture. This artwork represents the vibrant colors and
                    rich traditions of the continent, blending contemporary digital
                    art with timeless cultural motifs. Each element has been
                    carefully crafted to tell a story of heritage and innovation.
                  </p>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{nft.likes}</p>
                    <p className="text-xs text-muted-foreground mt-1">Likes</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {Math.floor(Math.random() * 50)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Views</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-xs text-muted-foreground mt-1">Owners</p>
                  </div>
                </div>

                <Separator />

                {/* Ownership History */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Ownership History
                  </h3>
                  <div className="space-y-3">
                    {ownershipHistory.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div>
                          <p className="font-mono text-sm">{record.owner}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {record.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Purchase
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related NFTs */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-xl">More from this collection</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedNFTs.map((related) => (
                  <button
                    key={related.id}
                    className="group text-left hover-lift"
                    onClick={() => handleRelatedClick(related)}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold text-sm truncate">
                        {related.title}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {related.price} HBAR
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default NFTDetailDrawer;
