"use client";

import React from "react";
import { ArtworkCard } from "./ArtworkCard";
import { Artwork } from "../../../types/artwork";

interface ArtworkGridProps {
  type?: string,
  artworks: Artwork[];
}

export function ArtworkGrid({
  type,
  artworks,
}: ArtworkGridProps): React.ReactElement {
  return (
    <div className="flex-1">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${ type !== "related" && "xl:grid-cols-4" }`}>
        {artworks.map((artwork: Artwork, index: number) => (
          <ArtworkCard key={index} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
 