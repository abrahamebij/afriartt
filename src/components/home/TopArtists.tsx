import { Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const artists = [
  { id: 1, name: "Kwame Digital", sales: "156 HBAR", initials: "KD" },
  { id: 2, name: "Amara Creates", sales: "142 HBAR", initials: "AC" },
  { id: 3, name: "Zola Art", sales: "128 HBAR", initials: "ZA" },
  { id: 4, name: "Thabo NFT", sales: "115 HBAR", initials: "TN" },
  { id: 5, name: "Nia Vision", sales: "98 HBAR", initials: "NV" },
  { id: 6, name: "Kofi Blocks", sales: "87 HBAR", initials: "KB" },
];

const TopArtists = () => {
  return (
    <section className="py-20 gradient-earth">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Top Artists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary transition-all hover-lift cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground font-bold">
                #{index + 1}
              </div>
              
              <Avatar className="h-16 w-16">
                <AvatarFallback className="gradient-warm text-primary-foreground text-lg font-bold">
                  {artist.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Total Sales: <span className="text-primary font-semibold">{artist.sales}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;
