import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Img from "../ui/Img";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden gradient-earth">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Built on Hedera Blockchain
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Own African <span className="text-gradient">Creativity</span> on
              the Blockchain
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Discover, collect, and trade unique African digital art.
              Supporting artists and celebrating culture through Web3.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={"/explore"}>
                <Button
                  size="lg"
                  className="gradient-warm border-0 text-lg px-8 hover-lift"
                >
                  Start Exploring
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={"/upload"}>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Create NFT
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-gradient">12K+</div>
                <div className="text-sm text-muted-foreground">Artworks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">5K+</div>
                <div className="text-sm text-muted-foreground">Artists</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">20K+</div>
                <div className="text-sm text-muted-foreground">Collectors</div>
              </div>
            </div>
          </div>

          {/* Right Featured Art */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <Img
                src="/images/hero-artwork.jpg"
                alt="Featured African NFT Artwork"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <p className="text-sm opacity-80 mb-1">Featured Collection</p>
                  <h3 className="text-2xl font-bold mb-2">Kente Dreams</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">by @afroblockchain</span>
                    <span className="text-lg font-bold text-primary">
                      12.5 HBAR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
