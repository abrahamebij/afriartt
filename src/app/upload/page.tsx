'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase/client';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  { value: 'music', label: 'Music' },
  { value: 'visual-art', label: 'Visual Art' },
  { value: 'sculptures', label: 'Sculptures' },
  { value: 'dance', label: 'Dance' },
  { value: 'folk-tales', label: 'Folk Tales' },
];


export default function UploadArtworkPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [artistName, setArtistName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedArtwork, setUploadedArtwork] = useState<{
    id: string;
    title: string;
    description: string | null;
    category: string;
    file_url: string;
    file_type: string;
    price: number | null;
    artist_name: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !file || !artistName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `artworks/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          toast.error('Storage bucket not configured. Please set up the artworks bucket in Supabase.');
        } else {
          toast.error(`Upload failed: ${uploadError.message}`);
        }
        setIsUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      const artworkData = {
        title,
        description: description || null,
        category,
        file_url: urlData.publicUrl,
        file_type: file.type,
        price: price ? parseFloat(price) : null,
        artist_name: artistName,
        status: 'active',
      };

      const { data: artwork, error: dbError } = await supabase
        .from('artworks')
        .insert([artworkData])
        .select()
        .maybeSingle();

      if (dbError) {
        toast.error(`Database error: ${dbError.message}`);
        setIsUploading(false);
        return;
      }

      setUploadedArtwork(artwork);
      setUploadSuccess(true);
      toast.success('Artwork uploaded successfully!');

      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setArtistName('');
      setFile(null);
      setFilePreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadSuccess && uploadedArtwork) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Successful!</h1>
            <p className="text-gray-600 mb-8">Your artwork has been submitted to AfriArtt</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Artwork Preview</h2>
              {uploadedArtwork.file_type.startsWith('image/') && (
                <div className="mb-4">
                  <img
                    src={uploadedArtwork.file_url}
                    alt={uploadedArtwork.title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    width={400}
                    height={400}
                  />
                </div>
              )}
              <div className="text-left max-w-md mx-auto space-y-2">
                <p><strong>Title:</strong> {uploadedArtwork.title}</p>
                {uploadedArtwork.description && (
                  <p><strong>Description:</strong> {uploadedArtwork.description}</p>
                )}
                <p><strong>Category:</strong> {uploadedArtwork.category}</p>
                <p><strong>Artist:</strong> {uploadedArtwork.artist_name}</p>
                {uploadedArtwork.price && (
                  <p><strong>Price:</strong> ${uploadedArtwork.price}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setUploadSuccess(false);
                  setUploadedArtwork(null);
                }}
                variant="outline"
              >
                Upload Another
              </Button>
              <Button onClick={() => window.location.href = '/explore'}>
                View All Artworks
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Artwork</h1>
            <p className="text-gray-600">Share your African art with the AfriArtt community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="file" className="text-base font-semibold">
                Artwork File <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {filePreview ? (
                      <div className="relative w-full h-full p-4">
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                          width={600}
                          height={400}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Images, Videos, Audio, or 3D Models
                        </p>
                      </div>
                    )}
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,video/*,audio/*,.glb,.gltf,.obj"
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-base font-semibold">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter artwork title"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="artistName" className="text-base font-semibold">
                Artist Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="artistName"
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Enter artist name"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your artwork, its inspiration, and cultural significance..."
                className="mt-2 w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-base font-semibold">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className="text-base font-semibold">
                Price (USD) <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="mt-2"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty if not for sale
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isUploading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Artwork
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
