import { Heart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NFTDetailDrawer from "@/components/explore/NFTDetailDrawer";
import { toast } from "sonner";
import Img from "../ui/Img";

interface ProfileNFTCardProps {
  nft: {
    id: number;
    title: string;
    creator: string;
    price: string;
    image: string;
    likes: number;
    collection: string;
    createdAt: string;
    tokenId: string;
    hederaTransactionId: string;
  };
}

const ProfileNFTCard = ({ nft }: ProfileNFTCardProps) => {
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

  const handleViewOnHedera = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Opening Hedera transaction explorer...");
    window.open(
      `https://hashscan.io/mainnet/transaction/${nft.hederaTransactionId}`,
      "_blank"
    );
  };

  const handleNFTChange = (newNFT: typeof nft) => {
    setCurrentNFT(newNFT);
  };

  return (
    <>
      <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover-lift">
        <div
          className="relative aspect-square overflow-hidden cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <Img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isLiked ? "fill-primary text-primary" : "text-foreground"
              }`}
            />
          </button>

          <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border-border">
            {nft.collection}
          </Badge>

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
            <Button
              size="sm"
              className="gradient-warm border-0 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setDrawerOpen(true);
              }}
            >
              View Details
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              onClick={handleViewOnHedera}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

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

          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              size="sm"
              onClick={handleViewOnHedera}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View on Hedera
            </Button>
            <Button
              className="flex-1"
              size="sm"
              onClick={() => setDrawerOpen(true)}
            >
              Details
            </Button>
          </div>
        </div>
      </Card>

      <NFTDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        nft={currentNFT}
        onNFTChange={() => handleNFTChange(currentNFT)}
      />
    </>
  );
};

export default ProfileNFTCard;
