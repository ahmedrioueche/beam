import React, { useState, useEffect } from 'react';
import { Clipboard, Check, Link } from 'lucide-react';
import { dict } from '@/lib/dict';
import ConnectionModal from './ConnectionModal';

function Keys() {
  const [serverUrl, setServerUrl] = useState('null');
  const [streamKey, setStreamKey] = useState('null');
  const [serverUrlCopied, setServerUrlCopied] = useState(false);
  const [streamKeyCopied, setStreamKeyCopied] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const selectedLanguage = "english";

  const copyToClipboard = (text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
  };

  useEffect(() => {
    if (serverUrlCopied) {
      const timer = setTimeout(() => setServerUrlCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [serverUrlCopied]);

  useEffect(() => {
    if (streamKeyCopied) {
      const timer = setTimeout(() => setStreamKeyCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [streamKeyCopied]);

  return (
    <div className="p-4 bg-light-background dark:bg-dark-background rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center">
          <Link className="mr-2 text-light-primary dark:text-dark-primary" size={24} />
          {dict[selectedLanguage].streamConnection}
        </h2>
        <button onClick={()=> setIsConnectionModalOpen(true)} className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300 text-white py-2 px-4 rounded">
          {dict[selectedLanguage].generateConnection}
        </button>
      </div>

      <div className="mb-4 bg-light-surface dark:bg-dark-surface p-4 rounded-md">
        <h3 className="mb-2 text-md font-semibold text-light-text-primary dark:text-dark-text-primary">
          {dict[selectedLanguage].serverUrl}
        </h3>
        <div className="relative">
          <input
            type="text"
            value={serverUrl !== 'null' ? serverUrl : dict[selectedLanguage].serverUrlPlaceholder}
            onChange={(e) => setServerUrl(e.target.value)}
            className={`${serverUrl !== 'null' ? '' : 'text-light-text-secondary dark:text-dark-text-secondary'} mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary`}
            readOnly
          />
          {serverUrl !== "null" && (
            <button onClick={() => copyToClipboard(serverUrl, setServerUrlCopied)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {serverUrlCopied ? (
                <Check size={24} className="text-light-secondary dark:text-dark-secondary transition duration-300 cursor-pointer" />
                ) : (
                <Clipboard size={24} className="text-light-primary dark:text-dark-primary hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300 cursor-pointer" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-md">
        <h3 className="mb-2 text-md font-semibold text-light-text-primary dark:text-dark-text-primary">
          {dict[selectedLanguage].streamKey}
        </h3>
        <div className="relative">
          <input
            type="text"
            value={streamKey !== 'null' ? streamKey : dict[selectedLanguage].streamKeyPlaceholder}
            onChange={(e) => setStreamKey(e.target.value)}
            className={`${streamKey !== 'null' ? '' : 'text-light-text-secondary dark:text-dark-text-secondary'} mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary`}
            readOnly
          />
          {streamKey !== "null" && (
            <button onClick={() => copyToClipboard(streamKey, setStreamKeyCopied)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {streamKeyCopied ? (
                <Check size={24} className="text-light-secondary dark:text-dark-secondary transition duration-300 cursor-pointer" />
              ) : (
                <Clipboard size={24} className="text-light-primary dark:text-dark-primary hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300 cursor-pointer" />
              )}
            </button>
          )}
       
        </div>
      </div>
      <ConnectionModal 
        isOpen={isConnectionModalOpen} 
        onClose={() => setIsConnectionModalOpen(false)} 
        onGenerateConnection={()=> null}/>
    </div>
  );
}

export default Keys;