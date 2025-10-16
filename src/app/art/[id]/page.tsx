
"use client"
import { Share2 } from "lucide-react";
import { Artwork } from "../../../../types/artwork";
import Image from "next/image";
import { ArtworkGrid } from "@/components/explore/ArtworkGrid";

export default function ArtDetailPage() {
  const artwork = {
    title: "Echoes of the Talking Drum",
    price: "5 HBAR",
    description:
      "A rhythmic fusion of Yoruba talking drums layered with ambient sounds, preserving the ancient language of beats. This piece celebrates the storytelling heritage of West Africa through sound.",
    culturalOrigin: "Yoruba",
    tags: ["Something", "Music", "Something"],
    artist: "Alan Smith",
    artistBio: "Short bio of this guy",
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop",
  };

  const  { title, price, description, culturalOrigin, tags, artist, artistBio, image} = artwork

  const relatedArtworks = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: i,
      title: "Oba Of Benin",
      artist: "Alan Smith",
      price: "5 HBAR",
      image: "/images/arts/benin.png",
    }));

  const handleBuy = () => {
    console.log("=== PURCHASE INITIATED ===");
    console.log("Artwork:", artwork.title);
    console.log("Price:", artwork.price);
    console.log("Artist:", artwork.artist);
    console.log("========================");
  };

  const handleShare = () => {
    console.log("Share artwork:", title);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media and Title Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Media Placeholder */}
              <div className="aspect-video bg-gray-50 flex items-center justify-center border-b border-gray-200">
                <div className="text-center p-12">
                  <svg
                    viewBox="0 0 600 400"
                    className="w-full h-full max-w-2xl mx-auto"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="600"
                      y2="400"
                      stroke="#d1d5db"
                      strokeWidth="2"
                    />
                    <line
                      x1="600"
                      y1="0"
                      x2="0"
                      y2="400"
                      stroke="#d1d5db"
                      strokeWidth="2"
                    />
                    <text
                      x="300"
                      y="180"
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="20"
                      fontWeight="500"
                    >
                      This is supposed to be space
                    </text>
                    <text
                      x="300"
                      y="210"
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="20"
                      fontWeight="500"
                    >
                      for an image, video
                    </text>
                    <text
                      x="300"
                      y="240"
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="20"
                      fontWeight="500"
                    >
                      or whatever
                    </text>
                  </svg>
                </div>
              </div>

              {/* Title and Actions */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {title}
                    </h1>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {price}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuy}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                      Buy
                    </button>
                    <button
                      onClick={handleShare}
                      className="border-2 border-gray-300 hover:border-gray-400 p-3 rounded-lg transition-colors"
                    >
                      <Image
                        src="/images/share.svg"
                        width={25}
                        height={25}
                        alt="share"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Related Artworks */}
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  More from this category
                </h2>
                <ArtworkGrid type="related" artworks={relatedArtworks} />
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Cultural Origin
                </h2>
                <p className="text-gray-700">{culturalOrigin}</p>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Creator
                </h2>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {artist.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{artist}</h3>
                    <p className="text-sm text-gray-600 mt-1">{artistBio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatedArtworkCard({ title, artist, price, image}: Artwork) {
  const handleViewDetails = () => {
    console.log("View details for:", title);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm">
            {title}
          </h3>
          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded whitespace-nowrap">
            {price}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-semibold">
            {artist.charAt(0)}
          </div>
          <span className="text-xs text-gray-600">{artist}</span>
        </div>
        <button
          onClick={handleViewDetails}
          className="w-full bg-white border-2 border-orange-600 text-orange-600 font-semibold py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors text-sm"
        >
          View Details 👁️
        </button>
      </div>
    </div>
  );
}
