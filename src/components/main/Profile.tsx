// Profile.tsx
import React from 'react';
import StreamCard from './StreamCard';
import { Stream, User } from '@/lib/types';
import { dict } from '@/lib/dict';
import { FaEye, FaHeart, FaVideo } from 'react-icons/fa';
import { History } from 'lucide-react';

interface ProfileProps {
  id: number;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  // Placeholder user data
  const user : User = {
    id: 5,
    name: 'Gamer123',
    avatarUrl: '/images/cat.jpg',
    isLive: true,
    createdAt:"July 30th, 2024",
    followersCount: 1032,
    viewsPerStreamCount: 23000,
    streams: [
      {
        id: 1,
        thumbnail: '/images/spiderman.webp',
        streamer: { id: 1, name: 'Gamer123', avatarUrl: '/images/cat.jpg' },
        title: 'Gaming Live Stream',
        info: 'Join us for an exciting gaming session!',
        viewerCount: 33,
        duration: '1 hour',
        isLive: true,
        topic: 'gaming',
      },
      {
        id: 2,
        thumbnail: '/images/stream2.jpg',
        streamer: { id: 2, name: 'ChefAlice', avatarUrl: '/images/logo2.png' },
        title: 'Cooking with Chef Alice',
        info: 'Learn to cook delicious meals with Chef Alice.',
        viewerCount: 56,
        duration: '1.5 hours',
        isLive: false,
        topic: 'cooking',
      },
      {
        id: 3,
        thumbnail: '/images/stream3.jpg',
        streamer: { id: 3, name: 'MusicianMike', avatarUrl: '/images/logo3.png' },
        title: 'Music Jam Session',
        info: 'Enjoy a live music jam session with our talented musicians.',
        viewerCount: 103,
        duration: '4 hours',
        isLive: true,
        topic: 'music',
      },
      {
        id: 4,
        thumbnail: '/images/stream4.jpg',
        streamer: { id: 4, name: 'TechGuy', avatarUrl: '/images/logo4.png' },
        title: 'Tech Talk Live',
        info: 'Discussing the latest in tech trends and news.',
        viewerCount: 65,
        duration: '1 hour',
        isLive: false,
        topic: 'technology',
      },
      // Add more streams as needed
    ],
  };

  const { name, avatarUrl, isLive, streams } = user;
  const isCurrentUserProfile = user.id === id;
  const liveStream = streams?.find((stream) => stream.isLive);
  const oldStreams = streams?.filter((stream) => !stream.isLive);
  const selectedLanguage = "english";

  return (
    <div className="flex flex-col p-4 bg-light-background dark:bg-dark-background">
      {/* Header Section */}
      <div className='flex flex-row justify-between items-center mt-1'>
        <div className='flex flex-row'>
            <div className="relative">
                <img
                  src={avatarUrl}
                  alt={name}
                  className={`w-12 h-12 rounded-full border-2 ${
                      isLive ? 'border-red-500 dark:border-red-500' : 'border-light-primary dark:border-dark-primary'
                  }`}
                />
                {isLive && (
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full border-2 border-dark-surface text-[6px] font-bold text-white">
                    {dict[selectedLanguage].liveCapital}
                </div>
                )}
            </div>
            <div>
                <h2 className="text-xl text-light-text-primary dark:text-dark-text-primary font-f1 font-semibold ml-3">{name}</h2>
                <h2 className="text-sm md:text-base text-light-text-secondary dark:text-dark-text-secondary font-f1 font-normal ml-3">{dict[selectedLanguage].joinedOn} {user.createdAt}</h2>
            </div>
        </div>
        <div className='text-basetext-light-text-secondary dark:text-dark-text-secondary font-f1 font-normal'>
          <div className='flex flex-row'>
            <h2 className="text-base ml-3">{user.followersCount}</h2>
            <FaHeart className='ml-2 mt-1 dark:text-dark-primary text-light-primary'/> 
          </div>
          <div className='flex flex-row'>
            <h2 className="">{user.viewsPerStreamCount} </h2>
            <FaEye className='ml-2 mt-1 dark:text-dark-primary text-light-primary'/>
          </div>
        </div>
      </div>
      
      {/* Live Stream Section */}
      {liveStream && (
        <div className="mb-4 mt-6">
          <div className='flex flex-row mb-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
            <FaVideo className='mt-1 mr-2 text-red-500 '/>
            <h3 className="">
              {dict[selectedLanguage].currentLiveStream}
            </h3>
          </div>  
          <StreamCard type={isCurrentUserProfile? "owner" : "visitor"} stream={liveStream} />
        </div>
      )}

      {/* Old Streams Section */}
      <div className='mt-2 flex flex-row mb-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          <History className='mt-1 mr-2 text-red-500 '/>
          <h3 className="">
          {dict[selectedLanguage].previousStreams}
          </h3>
        </div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {oldStreams && oldStreams.length > 0 && oldStreams.map((stream) => (
          <div key={stream.id}>
            <StreamCard type={isCurrentUserProfile? "owner" : "visitor"} stream={stream} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
