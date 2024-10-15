import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dict } from '@/lib/dict';
import { usePathname, useRouter } from 'next/navigation';
import { FaCog, FaKey, FaVideo } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { User } from '@/lib/types';

// Sample users data
const users: User[] = [
  {
    id: 1,
    name: 'User1',
    isLive: true,
    streams: [], // Add relevant Stream objects if necessary
    avatarUrl: '/images/cat.jpg',
    createdAt: new Date().toISOString(), // Example date, you can adjust as needed
    followersCount: 100, // Example value
    viewsPerStreamCount: 50, // Example value
  },
  {
    id: 2,
    name: 'User2',
    isLive: false,
    streams: [], // Add relevant Stream objects if necessary
    avatarUrl: '/images/puppy.jpeg',
    createdAt: new Date().toISOString(), // Example date, you can adjust as needed
    followersCount: 200, // Example value
    viewsPerStreamCount: 75, // Example value
  },
  // Add more user objects as needed
];

const recommendedUsers: User[] = [
  {
    id: 1,
    name: 'User1',
    isLive: true,
    streams: [], // Add relevant Stream objects if necessary
    avatarUrl: '/images/cat.jpg',
    createdAt: new Date().toISOString(), // Example date, you can adjust as needed
    followersCount: 100, // Example value
    viewsPerStreamCount: 50, // Example value
  },
  {
    id: 2,
    name: 'User2',
    isLive: false,
    streams: [], // Add relevant Stream objects if necessary
    avatarUrl: '/images/puppy.jpeg',
    createdAt: new Date().toISOString(), // Example date, you can adjust as needed
    followersCount: 200, // Example value
    viewsPerStreamCount: 75, // Example value
  },
  // Add more user objects as needed
];

const Sidemenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const selectedLanguage = "english";

  useEffect(()=> {
    const page = pathname.split('/dashboard/')[1];
    if(page){
      setCurrentPage(page);
    }
  }, [pathname])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = (id: number | undefined) => {
    router.push(`/main/profile/${id}`);
  };

  const handleLinkClick = (link: string) => {
    setCurrentPage(link);
    router.push(`/dashboard/${link}`);
  }

  return (
    <div
      className={`hidden md:block relative lg:relative z-1000 top-0 left-0 dark:bg-dark-surface bg-light-surface text-light-text-primary dark:text-dark-text-primary ${isExpanded ? 'w-60' : 'w-16'} p-4 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className={`absolute top-2 ${isExpanded ? 'right-2' : 'right-4'} text-dark-text-secondary hover:text-dark-primary`}
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {!pathname.includes("dashboard") ? (
        <>
          {/* Usual user UI */}
          <div className="mb-8 mt-3">
            <h2 className="text-lg font-f1 font-semibold mb-4 flex items-center text-light-text-secondary dark:text-dark-text-secondary">
              {isExpanded && dict[selectedLanguage].SideMenuUsual}
            </h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center space-x-2 ${isExpanded ? 'hover:bg-dark-primary hover:text-dark-text-primary' : 'hover:scale-110 transition duration-300'} py-2 px-1 cursor-pointer`}
                >
                  <div className="relative" onClick={() => handleClick(user.id)}>
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className={`w-8 h-8 rounded-full ring-2 ${user.isLive? 'ring-dark-secondary' : 'ring-dark-primary'}`}
                    />
                    {user.isLive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-dark-secondary rounded-full"></div>
                    )}
                  </div>
                  {isExpanded && (
                    <div onClick={() => handleClick(user.id)}>
                      <span className="font-f2 mr-8">{user.name}</span>
                      {user.isLive && (
                        <span className="bg-dark-secondary text-dark-text-primary text-xs px-1 rounded">LIVE</span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-f1 font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center">
              {isExpanded && dict[selectedLanguage].SideMenuRecommended}
            </h2>
            <ul className="space-y-2">
              {recommendedUsers.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center space-x-2 ${isExpanded ? 'hover:bg-dark-primary hover:text-dark-text-primary' : 'hover:scale-110 transition duration-300'} py-2 px-1 cursor-pointer`}
                >
                  <div className="relative" onClick={() => handleClick(user.id)}>
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className={`w-8 h-8 rounded-full ring-2  ${user.isLive? 'ring-dark-secondary' : 'ring-dark-primary'}`}
                    />
                    {user.isLive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-dark-secondary rounded-full"></div>
                    )}
                  </div>
                  {isExpanded && (
                    <div onClick={() => handleClick(user.id)}>
                      <span className="font-f2 mr-8">{user.name}</span>
                      {user.isLive && (
                        <span className="bg-dark-secondary text-dark-text-primary text-xs px-1 rounded">{dict[selectedLanguage].liveCapital}</span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <ul className="space-y-4 mt-6">
          <li onClick={() => handleLinkClick("stream")} 
              className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "stream" ? 'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaVideo className="w-6 h-6 mr-2" />
            {isExpanded && <span className="font-f2">{dict[selectedLanguage].stream}</span>}
          </li>
          <li onClick={() => handleLinkClick("keys")} 
              className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "keys" ?   'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaKey className="w-6 h-6 mr-2" />
            {isExpanded && <span className="font-f2">{dict[selectedLanguage].keys}</span>}
          </li>
          <li onClick={() => handleLinkClick("community")} 
              className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "community" ? 'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaPeopleGroup className="w-6 h-6 mr-2" />
            {isExpanded && <span className="font-f2">{dict[selectedLanguage].community}</span>}
          </li>
          <li onClick={() => handleLinkClick("settings")} 
              className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "settings" ?  'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaCog className="w-6 h-6 mr-2" />
            {isExpanded && <span className="font-f2">{dict[selectedLanguage].settings}</span>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidemenu;
