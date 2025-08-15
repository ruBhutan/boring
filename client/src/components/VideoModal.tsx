import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title, description }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-black border-0 shadow-2xl">
        <DialogHeader className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-brand-accent/80 rounded-full w-10 h-10 p-0 transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        
        <div className="relative aspect-video">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {description && (
          <div className="p-6 bg-brand-light-gradient border-t border-brand-border">
            <DialogTitle className="text-xl font-bold text-brand-text mb-2">
              {title}
            </DialogTitle>
            <p className="text-brand-text-muted">{description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Video Gallery Component for showcasing multiple videos
interface VideoGalleryProps {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration?: string;
  }>;
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoUrl: string;
    title: string;
    description: string;
  } | null>(null);

  const openVideo = (video: any) => {
    setSelectedVideo({
      videoUrl: video.videoUrl,
      title: video.title,
      description: video.description,
    });
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-black hover:shadow-2xl transition-all duration-300 border border-brand-primary/10 hover:border-brand-primary/30"
            onClick={() => openVideo(video)}
          >
            <div className="aspect-video relative">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-brand-primary/90 backdrop-blur-sm rounded-full p-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 border-2 border-white">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              
              {/* Duration Badge */}
              {video.duration && (
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-emerald-950/90 to-transparent p-4 text-white">
              <h3 className="font-bold text-lg mb-1">{video.title}</h3>
              <p className="text-sm text-gray-200 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideo}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
          description={selectedVideo.description}
        />
      )}
    </>
  );
}