"use client";

import React, { useState } from "react";
import { FilterSidebar } from "@/components/explore/FilterSidebar";
import { Category, OwnershipOption, Artwork } from "../../../types/artwork";
import Image from "next/image";
import { ArtworkGrid } from "@/components/explore/ArtworkGrid";



export function HeroSection(): React.ReactElement {
  return (
    <section className="bg-[#DF620C] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-medium mb-6 leading-tight">
              Discover unique creations
              <br />
              from talented artist
            </h2>
            <p className="text-lg font-medium mb-6 text-orange-100">
              Explore a vibrant collection of African creativity — from timeless
              music and captivating stories to expressive dances and stunning
              visual art — all preserved and owned securely on the blockchain.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/15 rounded-full text-sm">
                3D
              </span>
              <span className="px-4 py-2 bg-white/15 rounded-full text-sm">
                Digital Art
              </span>
              <span className="px-4 py-2 bg-white/15 rounded-full text-sm">
                Photography
              </span>
              <span className="px-4 py-2 bg-white/15 rounded-full text-sm">
                Folktales
              </span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src="/images/explore-hero.svg"
                width={500}
                height={500}
                alt="Explore page"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Explore(): React.ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Visual Art",
  ]);
  const [selectedOwnership, setSelectedOwnership] = useState<string[]>([
    "For Sale",
  ]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const categories: Category[] = [
    { id: "visual-art", label: "Visual Art" },
    { id: "music", label: "Music" },
    { id: "folktales", label: "Folktales" },
    { id: "sculptures", label: "Sculptures" },
  ];

  const ownershipOptions: OwnershipOption[] = [
    { id: "for-sale", label: "For Sale" },
    { id: "not-for-sale", label: "Not For Sale" },
  ];

  const artworks: Artwork[] = Array(8).fill({
    title: "Oba Of Benin",
    artist: "Alan Smith",
    price: "5 HBAR",
    image: "/images/arts/benin.png",
  });

  const toggleCategory = (category: string): void => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleOwnership = (ownership: string): void => {
    setSelectedOwnership((prev) =>
      prev.includes(ownership)
        ? prev.filter((o) => o !== ownership)
        : [...prev, ownership]
    );
  };

  const resetFilters = () => {
    setSelectedCategories(["Visual Art"]);
    setSelectedOwnership(["For Sale"]);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            ownershipOptions={ownershipOptions}
            selectedOwnership={selectedOwnership}
            toggleOwnership={toggleOwnership}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            resetFilters={resetFilters}
          />
          <ArtworkGrid artworks={artworks} />
        </div>
      </div>
    </div>
  );
}
