"use client";
import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileNFTGrid from "@/components/profile/ProfileNFTGrid";

const mockUserData = {
  username: "Kwame Nkrumah",
  bio: "Digital artist celebrating African heritage through contemporary art. Merging tradition with technology to tell stories of our vibrant culture.",
  avatar: "",
  isVerified: true,
  culturalTags: ["West African Art", "Abstract", "Contemporary", "Digital Painting"],
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
  isOwnProfile: true,
  coverImage: "/images/hero-artwork.jpg",
  joinedDate: "January 2024",
  stats: {
    created: 42,
    owned: 18,
    collections: 5,
    followers: 1247,
    following: 342,
  },
};

const mockNFTs = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `African Heritage #${i + 1}`,
  creator: mockUserData.username,
  price: (Math.random() * 5 + 0.5).toFixed(2),
  image: `/src/assets/nft-${(i % 6) + 1}.jpg`,
  likes: Math.floor(Math.random() * 500),
  collection: i % 3 === 0 ? "Heritage Series" : i % 3 === 1 ? "Modern Africa" : "Cultural Fusion",
  createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  tokenId: `0x${Math.random().toString(16).substr(2, 40)}`,
  hederaTransactionId: `0.0.${Math.floor(Math.random() * 100000)}@${Date.now() / 1000}`,
}));

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"created" | "owned" | "collections">("created");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <ProfileHeader user={mockUserData} />

        <div className="container mx-auto px-4 mt-16 relative z-10">
          <ProfileStats stats={mockUserData.stats} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <ProfileNFTGrid nfts={mockNFTs} activeTab={activeTab} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
