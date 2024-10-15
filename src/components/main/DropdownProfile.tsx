import { dict } from '@/lib/dict';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FaTachometerAlt, FaSignOutAlt, FaCog, FaBell, FaExclamationCircle } from 'react-icons/fa';

const DropdownProfile = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = "english";
  const router = useRouter();
  const handleSettings = () => {
    router.push("/main/settings");
  }
  // Profile options (onClick actions can be replaced with real functionality)
  const profileOptions = [
    { id: 2, label: dict[selectedLanguage].settings, onClick: () => handleSettings() },
    { id: 3, label: dict[selectedLanguage].notifications, onClick: () => alert('Notifications') },
  ];

  const user : User = {
    id: 5,
    name: 'Gamer123',
    avatarUrl: '/images/cat.jpg',
    isLive: true,
    createdAt:"July 30th, 2024",
    followersCount: 1032,
    viewsPerStreamCount: 23000,
  }
  
  const { id, name, avatarUrl, isLive, streams } = user;

  const handleDashboardClick = () => {
    router.push("/dashboard/stream");
  }

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

  const handleProfileClick = () => {
    router.push(`/main/profile/${id}`);
    onClose();
  }

  return isOpen ? (
    <div className="relative mt-10">
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-[-35px] mt-3 w-72 h-[24rem] md:h-[17rem] bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-600 text-light-text-primary dark:text-dark-text-primary rounded-lg shadow-lg z-50 overflow-y-scroll scrollbar-hide"
        >
          {/* Profile Section */}
          <div  onClick={handleProfileClick} className='flex flex-row p-4 cursor-pointer hover:scale-105 transition duration-300  '>
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
                <h2 className="text-lg  font-f1 font-semibold ml-3">{name}</h2>
                {isLive? (
                  <h2 className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-f1 font-normal ml-3">{dict[selectedLanguage].youAreLive}</h2>
                ) : (
                  <h2 className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-f1 font-normal ml-3">{dict[selectedLanguage].offline}</h2>
                )}
            </div>
        </div>

          {/* Separation Line */}
          <hr className="border-gray-300 dark:border-gray-600 my-2" />

          {/* Dashboard Section */}
          <div onClick={handleDashboardClick} className="px-4 py-3 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer">
            <div className="flex items-center">
              <FaTachometerAlt className="mr-3 text-md " />
              <h3 className="text-md font-semibold ">
                {dict[selectedLanguage].dashboard}
              </h3>
            </div>
          </div>

          <div className='md:hidden'>
            {profileOptions.map((option) => (
              <div
                key={option.id}
                onClick={option.onClick}
                className="px-4 py-3 text-md font-semibold hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer"
              >
                <div className="flex items-center">
                  {option.id === 2 && <FaCog className="mr-3 text-md " />}
                  {option.id === 3 && <FaBell className="mr-3 text-md " />}
                  <span className="">{option.label}</span>
                </div>
              </div>
            ))}
          </div>

          
          {/* Separation Line */}
          <hr className="border-gray-300 dark:border-gray-600 my-2" />

          <div className="px-4 py-3 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer">
            <div className="flex items-center">
              <FaExclamationCircle className="mr-3 text-md  hover:text-dark-text-primary" />
              <h3 className="text-md font-semibold  hover:text-dark-text-primary">
                {dict[selectedLanguage].help}
              </h3>
            </div>
          </div>
          <div className="px-4 py-3 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer">
            <div className="flex items-center">
              <FaSignOutAlt className="mr-3 text-md " />
              <h3 className="text-md font-semibold ">
                {dict[selectedLanguage].logout}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default DropdownProfile;
