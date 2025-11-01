import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-warm opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-warm">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>

          <h2 className="text-5xl font-bold">
            Ready to Share Your <span className="text-gradient">Art</span> with
            the World?
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of African artists already earning from their
            creativity. Mint your first NFT today and connect with collectors
            globally.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href={"/upload"}>
              <Button
                size="lg"
                className="gradient-warm border-0 text-lg px-8 hover-lift"
              >
                Mint Your First NFT
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">0%</div>
              <div className="text-muted-foreground">Platform Fees</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">Fast</div>
              <div className="text-muted-foreground">Hedera Transactions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">24/7</div>
              <div className="text-muted-foreground">Creator Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
