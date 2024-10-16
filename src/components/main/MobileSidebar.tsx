import React, { useEffect, useRef, useState } from 'react';
import { dict } from '@/lib/dict';
import { User } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { FaTachometerAlt, FaSignOutAlt, FaCog, FaBell, FaExclamationCircle, FaKey, FaVideo } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { signOut } from 'next-auth/react';

const MobileSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState("stream")
  const selectedLanguage = "english"; // This can be passed as a prop if needed
  const router = useRouter();
  const pathname = usePathname();

  // User details
  const user: User = {
    id: 5,
    name: 'Gamer123',
    avatarUrl: '/images/cat.jpg',
    isLive: true,
    createdAt: "July 30th, 2024",
    followersCount: 1032,
    viewsPerStreamCount: 23000,
  };

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    router.push("/dashboard/stream");
    onClose(); // Close sidebar after navigation
  };

  // Handle settings navigation
  const handleSettings = () => {
    router.push("/main/settings");
    onClose(); 
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

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
  

  const handleClick = (userId: number | undefined) => {
    // Handle user click logic here
    console.log(`User clicked: ${userId}`);
  };

  const handleLinkClick = (link: string) => {
    setCurrentPage(link);
    console.log(`Navigating to: ${link}`);
  };

  const handleProfileClick = () => {
    router.push(`/main/profile/${user.id}`);
    onClose();
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/api/auth/signout" });
  }
  
  return (
    <div className={`fixed left-0 top-0 w-64 h-full bg-light-surface dark:bg-dark-surface shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 overflow-y-scroll scrollbar-hide`}>
      <div ref={dropdownRef} className="p-4 text-light-text-primary dark:text-dark-text-primary">
        {/* Top Section */}
        <div onClick={handleProfileClick} className='flex items-center mb-4 cursor-pointer'>
            <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className={`w-12 h-12 rounded-full border-2 ${
                      user.isLive ? 'border-red-500 dark:border-red-500' : 'border-light-primary dark:border-dark-primary'
                  }`}
                />
                {user.isLive && (
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full border-2 border-dark-surface text-[6px] font-bold text-white">
                    {dict[selectedLanguage].liveCapital}
                </div>
                )}
            </div>
          <div className="ml-3">
            <h2 className="text-lg font-normal">{user.name}</h2>
            <h2 className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {user.isLive ? dict[selectedLanguage].youAreLive : dict[selectedLanguage].offline}
            </h2>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-600 my-2" />

        {/* Dashboard Section */}
        <div onClick={handleDashboardClick} className="p-2 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer">
          <div className="flex items-center">
            <FaTachometerAlt className="w-6 h-6 mr-3" />
            <h3 className="text-md font-normal">{dict[selectedLanguage].dashboard}</h3>
          </div>
        </div>

        {/* Notifications and Settings */}
          <div onClick={handleSettings} className="p-2 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer">
            <div className="flex items-center">
              <FaCog className="w-6 h-6 mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].settings}</h3>
            </div>
          </div>

          <div onClick={() => alert('Notifications')} className="p-2 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer">
            <div className="flex items-center">
              <FaBell className="w-6 h-6 mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].notifications}</h3>
            </div>
          </div>

        <hr className="border-gray-300 dark:border-gray-600 my-2" />

        {!pathname.includes("dashboard") ? (
        <>
          {/* Usual user UI */}
          <div className="mb-3 mt-3">
            <h2 className="text-lg font-f1 font-normal mb-4 flex items-center text-light-text-secondary dark:text-dark-text-secondary">
              {dict[selectedLanguage].SideMenuUsual}
            </h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center space-x-2 hover:bg-dark-primary hover:text-dark-text-primary hover:scale-110 transition duration-300 py-2 px-1 cursor-pointer`}
                >
                  <div className="relative" onClick={() => handleClick(user.id)}>
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className={`w-8 h-8 rounded-full ring-2 ring-dark-secondary`}
                    />
                    {user.isLive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-dark-secondary rounded-full"></div>
                    )}
                  </div>
                    <div onClick={() => handleClick(user.id)}>
                      <span className="font-f2 mr-8">{user.name}</span>
                      {user.isLive && (
                        <span className="bg-dark-secondary text-dark-text-primary text-xs px-1 rounded">LIVE</span>
                      )}
                    </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-3'>
            <h2 className="text-lg font-f1 font-normal text-light-text-secondary dark:text-dark-text-secondary mb-4 flex items-center">
              {dict[selectedLanguage].SideMenuRecommended}
            </h2>
            <ul className="space-y-2">
              {recommendedUsers.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center space-x-2 hover:bg-dark-primary hover:text-dark-text-primary hover:scale-110 transition duration-300 py-2 px-1 cursor-pointer`}
                >
                  <div className="relative" onClick={() => handleClick(user.id)}>
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className={`w-8 h-8 rounded-full ring-2 ring-dark-secondary`}
                    />
                    {user.isLive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-dark-secondary rounded-full"></div>
                    )}
                  </div>
                    <div onClick={() => handleClick(user.id)}>
                      <span className="font-f2 mr-8">{user.name}</span>
                      {user.isLive && (
                        <span className="bg-dark-secondary text-dark-text-primary text-xs px-1 rounded">{dict[selectedLanguage].liveCapital}</span>
                      )}
                    </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <ul className="mt-3 mb-3">
          <li onClick={() => handleLinkClick("stream")} 
              className={`flex items-center space-x-2 p-2 py-3 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "stream" ? 'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaVideo className="w-6 h-6 mr-2" />
             <span className="font-f2">{dict[selectedLanguage].stream}</span>
          </li>
          <li onClick={() => handleLinkClick("keys")} 
              className={`flex items-center space-x-2 p-2 py-3 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "keys" ?   'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaKey className="w-6 h-6 mr-2" />
             <span className="font-f2">{dict[selectedLanguage].keys}</span>
          </li>
          <li onClick={() => handleLinkClick("community")} 
              className={`flex items-center space-x-2 p-2 py-3 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "community" ? 'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaPeopleGroup className="w-6 h-6 mr-2" />
            <span className="font-f2">{dict[selectedLanguage].community}</span>
          </li>
          <li onClick={() => handleLinkClick("settings")} 
              className={`flex items-center space-x-2 p-2 py-3 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary ${currentPage === "settings" ?  'dark:bg-dark-background bg-light-background' : ''}`}>
            <FaCog className="w-6 h-6 mr-2" />
             <span className="font-f2">{dict[selectedLanguage].dashboard} {dict[selectedLanguage].settings}</span>
          </li>
        </ul>
      )}

        <hr className="border-gray-300 dark:border-gray-600 my-2" />

        {/* Bottom Section: Help and Logout */}
        <div className="mt-3 mb-3">
          <div onClick={() => alert('Help')} className="p-2 py-3 hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer">
            <div className="flex items-center">
              <FaExclamationCircle className="w-6 h-6 mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].help}</h3>
            </div>
          </div>

          <div onClick={() => handleLogout()} className="p-2 py-3 hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer">
            <div className="flex items-center">
              <FaSignOutAlt className="w-6 h-6 mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].logout}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
