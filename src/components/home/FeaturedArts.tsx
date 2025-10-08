"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heart } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    title: "Visual Arts",
    items: [
      { name: "The Golden Mask", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Queen Mother", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Bronze Guardian", artist: "Ayo Bello", image: "/images/art1.png" },
      { name: "The Bronze Dancers", artist: "Koni Kode", image: "/images/art1.png" },
    ],
  },
  {
    title: "Music",
    items: [
      { name: "Soul Rhythm", artist: "Ada Eze", image: "/images/art1.png" },
      { name: "The Talking Drum", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
    ],
  },
  {
    title: "Folktales",
    items: [
      { name: "Soul Rhythm", artist: "Ada Eze", image: "/images/art1.png" },
      { name: "The Talking Drum", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
    ],
  },
  {
    title: "Dance",
    items: [
      { name: "Soul Rhythm", artist: "Ada Eze", image: "/images/art1.png" },
      { name: "The Talking Drum", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
    ],
  },
  {
    title: "Sculpture",
    items: [
      { name: "Soul Rhythm", artist: "Ada Eze", image: "/images/art1.png" },
      { name: "The Talking Drum", artist: "Koni Kode", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
      { name: "Afro Harmony", artist: "Lekan Ayo", image: "/images/art1.png" },
    ],
  },
  // add other categories (Folktales, Dance, Sculpture)
];

export default function FeaturedArts() {
  return (
    <section className="bg-[#eeeeee] py-16 px-4 md:px-10">
      <h2 className="text-center text-black text-4xl md:text-5xl font-bold pb-15">Featured Arts</h2>
      {categories.map((category, index) => (
        <div key={index} className="mb-14">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-black font-semibold">{category.title}</h2>
            <button className="text-orange-500 hover:text-orange-400 transition-all font-medium">
              See All &gt;&gt;&gt;
            </button>
          </div>

          {/* Swiper */}
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="pb-4"
          >
            {category.items.map((art, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-xl overflow-hidden text-black">
                  <div className="w-full aspect-[3/4] h-75 relative">
                    <Image
                      src={art.image}
                      alt={art.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{art.name}</h3>
                        <p className="text-xs text-gray-600">by {art.artist}</p>
                      </div>
                      <Heart size={16} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      {/* Global See All */}
      <div className="flex justify-center mt-10">
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold transition-all">
          See All
        </button>
      </div>
    </section>
  );
}
