import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface ProfileStatsProps {
  stats: {
    created: number;
    owned: number;
    collections: number;
    followers: number;
    following: number;
  };
  activeTab: "created" | "owned" | "collections";
  onTabChange: (tab: "created" | "owned" | "collections") => void;
}

const ProfileStats = ({ stats, activeTab, onTabChange }: ProfileStatsProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full lg:w-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.created}</p>
            <p className="text-sm text-muted-foreground mt-1">Created</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.owned}</p>
            <p className="text-sm text-muted-foreground mt-1">Owned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.collections}</p>
            <p className="text-sm text-muted-foreground mt-1">Collections</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.followers}</p>
            <p className="text-sm text-muted-foreground mt-1">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.following}</p>
            <p className="text-sm text-muted-foreground mt-1">Following</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as typeof activeTab)} className="w-full lg:w-auto">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-muted">
            <TabsTrigger value="created" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Created
            </TabsTrigger>
            <TabsTrigger value="owned" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Owned
            </TabsTrigger>
            <TabsTrigger value="collections" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Collections
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  );
};

export default ProfileStats;
