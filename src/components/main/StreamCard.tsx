import React, { useEffect, useRef, useState } from 'react';
import { Stream } from '@/lib/types';
import { Clock, Users, MoreVertical } from 'lucide-react';
import { dict } from '@/lib/dict';

interface StreamCardProps {
  stream: Stream;
  type: 'owner' | 'visitor'; // owner of the profile or just a visitor
}

const StreamCard: React.FC<StreamCardProps> = ({ type, stream }) => {
  const { thumbnail, streamer, title, info, isLive } = stream;
  const selectedLanguage = "english";
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = (): void => {
    setIsMenuOpen(prev => !prev);
  };

  const handleEdit = (): void => {
    // Logic for editing the stream
    console.log('Edit stream');
  };

  const handleDelete = (): void => {
    // Logic for deleting the stream
    console.log('Delete stream');
  };

   // Close dropdown on outside click
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  return (
    <div className="relative flex flex-col p-4 hover:cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg bg-light-surface dark:bg-dark-surface transition-all duration-300">
      {/* Thumbnail */}
      <img src={thumbnail} alt={title} className="w-full h-48 rounded-lg object-cover mb-2" />

      {/* Title and Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{title}</h3>
        {info && <p className="text-gray-600 text-sm dark:text-gray-300 mb-2">{info}</p>}
      </div>

      {/* Streamer info and Live Badge */}
      <div className="flex items-start space-x-3">
        <div className="relative">
          <img
            src={streamer.avatarUrl}
            alt={streamer.name}
            className={`w-12 h-12 rounded-full border-2 ${isLive ? 'border-red-500 dark:border-red-500' : 'border-light-primary dark:border-dark-primary'}`}
          />
          {isLive && (
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full border-2 border-dark-surface text-[6px] font-bold text-white">
              {dict[selectedLanguage].liveCapital}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-f1 font-semibold text-light-text-primary dark:text-dark-text-primary">{streamer.name}</h2>
          <div className="flex items-center space-x-4 mt-1 text-sm text-dark-text-secondary">
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <div>
                <span>{stream.viewerCount}</span> <span>{dict[selectedLanguage].viewers}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{stream.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show 3 dots icon for 'owner' type */}
      {type === 'owner' && (
        <div className="absolute top-2 right-2">
          <button onClick={toggleMenu} className="p-1 text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary transition duration-300 rounded-full">
            <MoreVertical size={20} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div ref={dropdownRef} className="absolute right-0 w-32 bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white"
              >
                {dict[selectedLanguage].edit}
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary  hover:text-white"
              >
                {dict[selectedLanguage].delete}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamCard;
