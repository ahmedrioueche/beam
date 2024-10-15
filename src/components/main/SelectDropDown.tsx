import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className="w-full px-4 py-2 rounded cursor-pointer bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-dark-text-secondary focus:outline-none focus:border-dark-primary flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)} 
      >
        <span>{options.find(option => option.value === value)?.label || 'Select'}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16}/>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-light-background dark:bg-dark-background border border-dark-text-secondary rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-dark-primary text-light-text-primary dark:text-dark-text-primary hover:text-white transition-colors duration-150"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;