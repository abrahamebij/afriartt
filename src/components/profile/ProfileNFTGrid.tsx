import { useState } from "react";
import { Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileNFTCard from "./ProfileNFTCard";

interface NFT {
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
}

interface ProfileNFTGridProps {
  nfts: NFT[];
  activeTab: "created" | "owned" | "collections";
}

const ProfileNFTGrid = ({ nfts, activeTab }: ProfileNFTGridProps) => {
  const [sortBy, setSortBy] = useState("recent");
  const [filterCollection, setFilterCollection] = useState("all");

  const collections = Array.from(new Set(nfts.map((nft) => nft.collection)));

  const filteredAndSortedNFTs = nfts
    .filter((nft) => filterCollection === "all" || nft.collection === filterCollection)
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "likes":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const FilterContent = () => (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="font-semibold mb-3">Collection</h3>
        <Select value={filterCollection} onValueChange={setFilterCollection}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Collections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Collections</SelectItem>
            {collections.map((collection) => (
              <SelectItem key={collection} value={collection}>
                {collection}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setFilterCollection("all");
          setSortBy("recent");
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {activeTab === "created" && "Created NFTs"}
            {activeTab === "owned" && "Owned NFTs"}
            {activeTab === "collections" && "Collections"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredAndSortedNFTs.length} {filteredAndSortedNFTs.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Created</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {filteredAndSortedNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedNFTs.map((nft) => (
            <ProfileNFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No NFTs found</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ProfileNFTGrid;
