import { Camera, Link as LinkIcon, Calendar, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Img from "../ui/Img";

interface ProfileHeaderProps {
  user: {
    username: string;
    bio: string;
    avatar: string;
    isVerified: boolean;
    culturalTags: string[];
    walletAddress: string;
    isOwnProfile: boolean;
    coverImage: string;
    joinedDate: string;
  };
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user.walletAddress);
    toast.success("Wallet address copied to clipboard");
  };

  const handleConnectWallet = () => {
    toast.info("Wallet connection feature coming soon");
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
        <Img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {user.isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 backdrop-blur-sm mb-12"
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="relative group">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="gradient-warm text-white text-4xl md:text-5xl font-bold">
                  {user.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {user.isOwnProfile && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              )}
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 ring-4 ring-background">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{user.username}</h1>
                    {user.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified Artist
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span className="font-mono">{shortenAddress(user.walletAddress)}</span>
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>

                  <p className="text-muted-foreground max-w-2xl mb-4 leading-relaxed">
                    {user.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {user.culturalTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {user.isOwnProfile ? (
                    <>
                      <Button variant="outline" size="lg">
                        Edit Profile
                      </Button>
                      <Button size="lg" className="gradient-warm border-0" onClick={handleConnectWallet}>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg">
                        Follow
                      </Button>
                      <Button size="lg" className="gradient-warm border-0">
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
