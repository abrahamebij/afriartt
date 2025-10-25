import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const categories = [
  "Art",
  "Photography",
  "Music",
  "Video",
  "3D Models",
  "Collectibles",
];

const collections = [
  "African Legends",
  "Savannah Dreams",
  "Urban Africa",
  "Traditional Masks",
  "Contemporary Mix",
];

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [statusOpen, setStatusOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [blockchainOpen, setBlockchainOpen] = useState(true);

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Filters</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <Collapsible open={statusOpen} onOpenChange={setStatusOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-semibold">Status</h4>
            {statusOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="buy-now" />
              <Label htmlFor="buy-now" className="text-sm cursor-pointer">
                Buy Now
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-auction" />
              <Label htmlFor="on-auction" className="text-sm cursor-pointer">
                On Auction
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="new" />
              <Label htmlFor="new" className="text-sm cursor-pointer">
                New
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="has-offers" />
              <Label htmlFor="has-offers" className="text-sm cursor-pointer">
                Has Offers
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Price Range */}
        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-semibold">Price Range</h4>
            {priceOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Min:</span>
                <span className="font-medium">{priceRange[0]} HBAR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Max:</span>
                <span className="font-medium">{priceRange[1]} HBAR</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Categories */}
        <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-semibold">Categories</h4>
            {categoriesOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Collections */}
        <Collapsible open={collectionsOpen} onOpenChange={setCollectionsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-semibold">Collections</h4>
            {collectionsOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            {collections.map((collection) => (
              <div key={collection} className="flex items-center space-x-2">
                <Checkbox id={collection} />
                <Label htmlFor={collection} className="text-sm cursor-pointer">
                  {collection}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Blockchain */}
        <Collapsible open={blockchainOpen} onOpenChange={setBlockchainOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-semibold">Blockchain</h4>
            {blockchainOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="hedera" defaultChecked />
              <Label htmlFor="hedera" className="text-sm cursor-pointer">
                Hedera (HBAR)
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FilterSidebar;
