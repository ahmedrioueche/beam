import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Heart } from 'lucide-react';

interface User {
  name: string;
  avatarUrl: string;
}

interface VideoPlayerProps {
  streamer: User;
  title: string;
  isLive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamer, title, isLive }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const togglePlay = (): void => setIsPlaying(!isPlaying);
  const toggleMute = (): void => setIsMuted(!isMuted);
  const toggleFollow = (): void => setIsFollowing(!isFollowing);

  return (
    <div className="w-full max-w-8xl mx-auto bg-dark-surface text-dark-text-primary rounded-lg overflow-hidden shadow-lg">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        {/* Placeholder for actual video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/images/spiderman.webp" alt="Video placeholder" className="absolute inset-0 object-cover w-full h-full" />
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <button onClick={togglePlay} className="text-white hover:text-dark-primary">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-dark-primary">
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button className="text-white hover:text-dark-primary">
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default VideoPlayer;