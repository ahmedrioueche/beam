import { useEffect, useRef } from 'react';
import { FaCog } from 'react-icons/fa';

const DropdownSettings = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const settingsOptions = [
    { id: 1, label: 'General Settings', onClick: () => alert('General Settings') },
    { id: 2, label: 'Account Settings', onClick: () => alert('Account Settings') },
  ];

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

  return isOpen ? (
    <div className="relative mt-10">
      {isOpen && (
        <div  ref={dropdownRef} 
        className="absolute right-[-50px] mt-3 w-72 h-[32rem] bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-y-scroll scrollbar-hide">
        
        </div>
      )}
    </div>
  ) : null;
};

export default DropdownSettings;
