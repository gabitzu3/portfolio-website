"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ZoomIn, ZoomOut, Maximize2, RotateCw } from "lucide-react";

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onAvatarChange: (file: File | null) => void;
}

export function AvatarUpload({ currentAvatarUrl, onAvatarChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onAvatarChange(file);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemove() {
    setPreview(null);
    onAvatarChange(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleZoomIn() {
    setScale((prev) => Math.min(prev + 0.1, 3));
  }

  function handleZoomOut() {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  }

  function handleFit() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }

  function handleRotate() {
    setRotation((prev) => (prev + 90) % 360);
  }

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    function handleMouseMove(moveEvent: MouseEvent) {
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <div className="space-y-4">
      <Label>Profile Picture</Label>
      
      <div className="flex items-start gap-6">
        {/* Preview Container */}
        <div className="relative">
          <div
            className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 cursor-move"
            onMouseDown={handleMouseDown}
          >
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Upload className="h-12 w-12" />
              </div>
            )}
          </div>
          
          {/* Controls */}
          {preview && (
            <div className="flex gap-1 mt-2">
              <Button type="button" variant="outline" size="icon" onClick={handleZoomOut} title="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={handleZoomIn} title="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={handleFit} title="Fit">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={handleRotate} title="Rotate">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-3">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            
            {preview && (
              <Button type="button" variant="destructive" onClick={handleRemove}>
                Remove
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Upload a square or rectangular image. You can zoom, pan, rotate, and fit the image to position it correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
