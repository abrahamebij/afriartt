"use client";

import React from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "../../../types/artwork";



interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps): React.ReactElement {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <ArtworkImage image={artwork.image} title={artwork.title} />
      <ArtworkInfo artwork={artwork} />
    </div>
  );
}

// Sub-component for Artwork Image
interface ArtworkImageProps {
  image: string;
  title: string;
}

function ArtworkImage({ image, title }: ArtworkImageProps): React.ReactElement {
  return (
    <div className="aspect-square bg-gray-100 overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

// Sub-component for Artwork Information
interface ArtworkInfoProps {
  artwork: Artwork;
}

function ArtworkInfo({ artwork }: ArtworkInfoProps): React.ReactElement {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{artwork.title}</h3>
        <span className="text-sm font-normal">{artwork.price}</span>
      </div>
      <ArtistInfo artist={artwork.artist} />
      <ViewDetailsButton />
    </div>
  );
}

// Sub-component for Artist Information
interface ArtistInfoProps {
  artist: string;
}

function ArtistInfo({ artist }: ArtistInfoProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#DF620C] flex items-center justify-center text-white text-xs font-semibold">
        {artist.charAt(0)}
      </div>
      <span className="text-sm text-gray-600">{artist}</span>
    </div>
  );
}

// Sub-component for View Details Button
function ViewDetailsButton(): React.ReactElement {
  return (
    <Link href="#">
      <button className="w-full text-[#DF620C] font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 text-xs border-t border-gray-200">
        View Details <Eye size={16} />
      </button>
    </Link>
  );
}
