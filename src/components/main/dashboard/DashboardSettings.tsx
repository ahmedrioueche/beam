import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const DashboardSettings = () => {
  const [enableChat, setEnableChat] = useState(true);
  const [delayChat, setDelayChat] = useState(false);
  const [mustFollow, setMustFollow] = useState(false);

  return (
    <div className="dark:bg-dark-background bg-light-background text-light-text-primary dark:text-dark-text-primary p-6 rounded-lg w-96">
      <div className='flex flex-row'>
        <FaCog className='mt-1 mr-3' size={20}/>
        <h1 className="text-xl font-bold mb-4">Chat settings</h1>
      </div>

      <div className="space-y-4">
        {/* Enable chat */}
        <div className="flex items-center justify-between bg-light-surface dark:bg-dark-surface p-4 rounded-md">
          <span>Enable chat</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={enableChat}
              onChange={() => setEnableChat(!enableChat)}
            />
            <div className={`w-11 h-6 rounded-full p-1 ${enableChat ? 'dark:bg-dark-primary bg-light-primary' : 'dark:bg-gray-600 bg-gray-400'}`}>
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${enableChat ? 'transform translate-x-6' : ''}`}
              />
            </div>
          </label>
        </div>

        {/* Delay chat */}
        <div className="flex items-center justify-between bg-light-surface dark:bg-dark-surface p-4 rounded-md">
          <span>Delay chat</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={delayChat}
              onChange={() => setDelayChat(!delayChat)}
            />
            <div className={`w-11 h-6 rounded-full p-1 ${delayChat ? 'dark:bg-dark-primary bg-light-primary' : 'dark:bg-gray-600 bg-gray-400'}`}>
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${delayChat ? 'transform translate-x-6' : ''}`}
              />
            </div>
          </label>
        </div>

        {/* Must follow to chat */}
        <div className="flex items-center justify-between bg-light-surface dark:bg-dark-surface p-4 rounded-md">
          <span>Must be following to chat</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={mustFollow}
              onChange={() => setMustFollow(!mustFollow)}
            />
            <div className={`w-11 h-6 rounded-full p-1 ${mustFollow ? 'dark:bg-dark-primary bg-light-primary' : 'dark:bg-gray-600 bg-gray-400'}`}>
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${mustFollow ? 'transform translate-x-6' : ''}`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
