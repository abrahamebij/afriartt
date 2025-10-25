import { Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Img from "../ui/Img";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Img src="/images/logo/AfriArtt.png" className="w-20" alt="Logo" />
          {/* <div className="w-10 h-10 rounded-lg gradient-warm flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              A
            </span>
          </div>
          <span className="text-xl font-bold text-gradient">AfriArtt</span> */}
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search collections, artists, or NFTs..."
              className="pl-10 w-full bg-muted/50 border-border focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/explore">
            <Button variant="ghost" className="hidden lg:inline-flex">
              Explore
            </Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost" className="hidden lg:inline-flex">
              Upload
            </Button>
          </Link>
          <Button className="gradient-warm border-0">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
