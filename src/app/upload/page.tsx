"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload as UploadIcon,
  X,
  Image as ImageIcon,
  Video,
  Box,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Upload = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Wallet connection state (mock - will be replaced with HashConnect)
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [culturalTags, setCulturalTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [royaltyPercentage, setRoyaltyPercentage] = useState("10");

  // Minting state
  const [isMinting, setIsMinting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [mintingStep, setMintingStep] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState("");

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);

  // Cultural tag suggestions
  const culturalTagSuggestions = [
    "West African Art",
    "East African Heritage",
    "North African Style",
    "Southern African Culture",
    "Malian Textile Art",
    "Nigerian Contemporary",
    "Ethiopian Traditional",
    "Kenyan Street Art",
    "South African Abstract",
    "Ghanaian Symbolism",
    "Senegalese Modern",
    "Moroccan Geometric",
  ];

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to mint NFTs on AfriArtt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => router.push("/login")} className="w-full">
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/register")}
                variant="outline"
                className="w-full"
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mock wallet connection function
  const connectWallet = async () => {
    // This will be replaced with actual HashConnect integration
    setWalletConnected(true);
    setWalletAddress("0.0.1234567");
    toast.success("Your Hasgraph Wallet has been connected successfully.");
  };

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/webm",
        "model/gltf-binary",
      ];
      if (
        !validTypes.includes(selectedFile.type) &&
        !selectedFile.name.endsWith(".glb")
      ) {
        toast.error("Invalid File Type");
        return;
      }

      // Validate file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error("Please upload a file smaller than 50MB.");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const addCulturalTag = (tag: string) => {
    if (tag && !culturalTags.includes(tag) && culturalTags.length < 5) {
      setCulturalTags([...culturalTags, tag]);
      setCurrentTag("");
    }
  };

  const removeCulturalTag = (tagToRemove: string) => {
    setCulturalTags(culturalTags.filter((tag) => tag !== tagToRemove));
  };

  const isFormValid = () => {
    return (
      file &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      culturalTags.length > 0 &&
      royaltyPercentage &&
      parseFloat(royaltyPercentage) >= 0 &&
      parseFloat(royaltyPercentage) <= 50
    );
  };

  const handleMint = async () => {
    if (!isFormValid() || !walletConnected) return;

    setIsMinting(true);
    setMintingProgress(0);
    setMintSuccess(false);

    try {
      // Step 1: Upload to IPFS
      setMintingStep("Uploading to IPFS...");
      setMintingProgress(25);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload

      // Step 2: Create metadata
      setMintingStep("Creating metadata...");
      setMintingProgress(50);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3: Minting on Hedera
      setMintingStep("Minting on Hedera blockchain...");
      setMintingProgress(75);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      setMintingProgress(100);
      setMintingStep("Minting complete!");
      setMintSuccess(true);
      setMintedTokenId("0.0.9876543"); // Mock token ID

      toast.success("Your artwork is now live on AfriArtt.");
    } catch (error) {
      toast.error("There was an error minting your NFT. Please try again.");
      setIsMinting(false);
      setMintingProgress(0);
      setMintingStep("");
    }
  };

  const getFileIcon = () => {
    if (!file)
      return <UploadIcon className="w-12 h-12 text-muted-foreground" />;
    if (file.type.startsWith("image/"))
      return <ImageIcon className="w-12 h-12 text-primary" />;
    if (file.type.startsWith("video/"))
      return <Video className="w-12 h-12 text-primary" />;
    return <Box className="w-12 h-12 text-primary" />;
  };

  if (mintSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">
                NFT Minted Successfully!
              </CardTitle>
              <CardDescription className="text-lg">
                Your artwork is now live on the AfriArtt marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {previewUrl && (
                <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden">
                  {file?.type.startsWith("image/") && (
                    <img
                      src={previewUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {file?.type.startsWith("video/") && (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-semibold text-xl">{title}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Token ID:</span>
                  <code className="px-2 py-1 bg-muted rounded">
                    {mintedTokenId}
                  </code>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => router.push(`/profile`)}>
                  View in Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://hashscan.io/testnet/token/${mintedTokenId}`,
                      "_blank"
                    )
                  }
                >
                  View on Hedera Explorer
                </Button>
              </div>

              <Button variant="ghost" onClick={() => window.location.reload()}>
                Mint Another NFT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient">
              Mint Your NFT
            </h1>
            <p className="text-muted-foreground">
              Share your African creativity with the world on the Hedera
              blockchain
            </p>
          </div>

          {/* Wallet Connection Alert */}
          {!walletConnected && (
            <Alert className="mb-6 border-primary/50 bg-primary/5 items-center">
              <Wallet className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Connect your Hasgraph Wallet to mint NFTs</span>
                <Button size="sm" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {walletConnected && (
            <Alert className="mb-6 border-primary bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Wallet connected: {walletAddress}</span>
              </div>
              <AlertDescription className="flex items-center ">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setWalletConnected(false)}
                >
                  Disconnect
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Artwork</CardTitle>
                <CardDescription>
                  Supported formats: JPG, PNG, GIF, WEBP, MP4, WEBM, GLB (Max
                  50MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,video/*,.glb"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFileChange(e.target.files[0])
                    }
                    disabled={isMinting}
                  />

                  {!file ? (
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      {getFileIcon()}
                      <p className="mt-4 text-sm font-medium">
                        Drag and drop or click to upload
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Upload your digital artwork to mint as an NFT
                      </p>
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden bg-muted">
                        {file.type.startsWith("image/") && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {file.type.startsWith("video/") && (
                          <video
                            src={previewUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                        {file.name.endsWith(".glb") && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Box className="w-24 h-24 text-primary" />
                          </div>
                        )}
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setFile(null);
                            setPreviewUrl("");
                          }}
                          disabled={isMinting}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* NFT Details */}
            <Card>
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
                <CardDescription>
                  Provide information about your artwork
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter artwork title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isMinting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your artwork, its inspiration, and cultural significance..."
                    value={description}
                    className="h-40"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={12}
                    disabled={isMinting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection">Collection (Optional)</Label>
                  <Select
                    value={collection}
                    onValueChange={setCollection}
                    disabled={isMinting}
                  >
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Select a collection or create new" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Collection</SelectItem>
                      <SelectItem value="create-new">
                        + Create New Collection
                      </SelectItem>
                      <SelectItem value="african-heritage">
                        African Heritage
                      </SelectItem>
                      <SelectItem value="modern-africa">
                        Modern Africa
                      </SelectItem>
                      <SelectItem value="traditional-art">
                        Traditional Art
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Tags */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Cultural Identity <span className="text-destructive">*</span>
                </CardTitle>
                <CardDescription>
                  Add tags to help collectors discover your work&apos;s cultural
                  context (max 5)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type or select a tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCulturalTag(currentTag);
                        }
                      }}
                      disabled={isMinting || culturalTags.length >= 5}
                    />
                    <Button
                      onClick={() => addCulturalTag(currentTag)}
                      disabled={
                        !currentTag || culturalTags.length >= 5 || isMinting
                      }
                    >
                      Add
                    </Button>
                  </div>

                  {culturalTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
                      {culturalTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            onClick={() => removeCulturalTag(tag)}
                            className="ml-1 hover:text-destructive"
                            disabled={isMinting}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Suggested tags:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {culturalTagSuggestions
                      .filter((tag) => !culturalTags.includes(tag))
                      .slice(0, 6)
                      .map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => addCulturalTag(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Royalty Settings */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Royalty Settings <span className="text-destructive">*</span>
                </CardTitle>
                <CardDescription>
                  Set your royalty percentage for future resales (0-50%)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      step="0.5"
                      value={royaltyPercentage}
                      onChange={(e) => setRoyaltyPercentage(e.target.value)}
                      className="max-w-[120px]"
                      disabled={isMinting}
                    />
                    <span className="text-sm font-medium">%</span>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      You&apos;ll receive {royaltyPercentage}% of the sale price
                      every time your NFT is resold. This is enforced by the
                      Hedera smart contract.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Minting Progress */}
            {isMinting && (
              <Card className="border-primary">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{mintingStep}</p>
                      <Progress value={mintingProgress} className="mt-2" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Please don&apos;t close this window while your NFT is being
                    minted...
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Review & Mint */}
            <Card className="border-primary/50 bg-card">
              <CardHeader>
                <CardTitle>Review & Mint</CardTitle>
                <CardDescription>
                  Double-check your information before minting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Title</p>
                    <p className="font-medium">{title || "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Royalty</p>
                    <p className="font-medium">{royaltyPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cultural Tags</p>
                    <p className="font-medium">{culturalTags.length} tags</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">File</p>
                    <p className="font-medium">
                      {file ? "✓ Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleMint}
                  disabled={!isFormValid() || !walletConnected || isMinting}
                  className="w-full"
                  size="lg"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Minting...
                    </>
                  ) : (
                    "Mint NFT on AfriArtt"
                  )}
                </Button>

                {!walletConnected && (
                  <p className="text-xs text-center text-muted-foreground">
                    Please connect your wallet to mint
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
