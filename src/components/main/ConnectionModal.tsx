import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import CustomDropdown from './SelectDropDown';
import { dict } from '@/lib/dict';

interface GenerateConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateConnection: () => void;
}

const GenerateConnectionModal: React.FC<GenerateConnectionModalProps> = ({ isOpen, onClose, onGenerateConnection }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionType, setConnectionType] = useState('RTMP');
  const selectedLanguage = "english";

  const handleGenerate = () => {
    setIsLoading(true);
    onGenerateConnection();
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  const connectionOptions = [
    { value: 'RTMP', label: 'RTMP' },
    { value: 'WHIP', label: 'WHIP' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="dark:bg-dark-surface bg-light-surface rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{dict[selectedLanguage].generateConnection}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-light-background hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white transition-colors duration-300 text-gray-700"
          >
            <FaTimes size={12} />
          </button>
        </div>

        <div className="mb-6">
          <CustomDropdown
            options={connectionOptions}
            value={connectionType}
            onChange={setConnectionType}
          />
        </div>

        <div className="mb-6 flex items-start space-x-3 p-3 bg-yellow-900 bg-opacity-20 rounded-md">
          <AlertTriangle className="text-yellow-500 mt-1 flex-shrink-0" />
          <p className="text-sm dark:text-dark-text-secondary text-light-text-secondary">
            {dict[selectedLanguage].connectionGenerationWarning}
          </p>
        </div>

        <div className="flex justify-between space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-dark-text-primary bg-dark-background hover:bg-light-secondary dark:hover:bg-light-secondary rounded-md transition-colors duration-200"
          >
            {dict[selectedLanguage].cancel}
          </button>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary dark:hover:bg-light-secondary rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className='animate-spin'/> : dict[selectedLanguage].generate}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateConnectionModal;