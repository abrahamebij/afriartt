"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/explore/FilterSidebar";
import NFTCard from "@/components/explore/NFTCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock NFT data
const nfts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `African Art #${i + 1}`,
  creator: `Artist ${Math.floor(Math.random() * 10) + 1}`,
  price: (Math.random() * 5 + 0.5).toFixed(2),
  image: `/src/assets/nft-${(i % 6) + 1}.jpg`,
  likes: Math.floor(Math.random() * 500),
}));

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(nfts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNfts = nfts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Search & Filter Bar */}
        <section className="border-b border-border bg-card/50 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search NFTs, collections, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>

              {/* Sort & Mobile Filter */}
              <div className="flex gap-3 w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-muted/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Listed</SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden md:block w-64 flex-shrink-0">
                <FilterSidebar />
              </aside>

              {/* NFT Grid */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Explore NFTs</h1>
                  <p className="text-muted-foreground">
                    Discover {nfts.length} unique African artworks
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedNfts.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(page);
                                }}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Explore;
