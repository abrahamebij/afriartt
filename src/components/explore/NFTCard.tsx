import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NFTDetailDrawer from "./NFTDetailDrawer";
import Img from "../ui/Img";

interface NFTCardProps {
  nft: {
    id: number;
    title: string;
    creator: string;
    price: string;
    image: string;
    likes: number;
  };
}

const NFTCard = ({ nft }: NFTCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(nft.likes);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentNFT, setCurrentNFT] = useState(nft);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleNFTChange = (newNFT: typeof nft) => {
    setCurrentNFT(newNFT);
  };

  return (
    <>
      <Card className="group pt-0 pb-4 overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover-lift">
        {/* Image */}
        <div
          className="relative aspect-square overflow-hidden cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <Img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isLiked ? "fill-primary text-primary" : "text-foreground"
              }`}
            />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Button className="gradient-warm border-0 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg truncate">{nft.title}</h3>
            <p className="text-sm text-muted-foreground">by {nft.creator}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-bold text-primary">{nft.price} HBAR</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{likes} likes</p>
            </div>
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => setDrawerOpen(true)}
          >
            Buy Now
          </Button>
        </div>
      </Card>

      <NFTDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        nft={currentNFT}
        onNFTChange={handleNFTChange}
      />
    </>
  );
};

export default NFTCard;
