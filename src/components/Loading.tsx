'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { dict } from '@/lib/dict';
import React from 'react';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from 'react-icons/ai';

const Loading: React.FC = () => {
    const { isDarkMode } = useTheme();
    const selectedLanguage = "english";
    
    return (
        <section
            className={`py-20 flex items-center justify-center min-h-screen ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            } transition-colors duration-300`}
        >
            <div className="container mx-auto flex flex-col items-center">
                <div
                    className={`relative w-full max-w-lg flex flex-col items-center rounded-xl shadow-2xl p-10 ${
                        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
                    } transition-all duration-500`}
                >
                    <div className="flex items-center justify-center mb-8">
                        <AiOutlineLoading3Quarters
                            className={`text-7xl animate-spin ${
                                isDarkMode ? 'text-dark-secondary' : 'text-light-primary'

                            }`}
                        />
                    </div>
                    <h2
                        className={`text-3xl font-extrabold mb-6 ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-dark-primary to-dark-secondary text-transparent bg-clip-text' 
                                : 'bg-gradient-to-r from-light-primary to-light-secondary text-transparent bg-clip-text'
                        }`}
                    >
                        {dict[selectedLanguage].loading}
                    </h2>
                    <p className="text-lg text-center">
                        {dict[selectedLanguage].loadingText}
                    </p>
                </div>
                <div className="mt-10 flex items-center space-x-2 text-sm text-gray-500">
                    <AiOutlineCheckCircle
                        className={`${
                            isDarkMode ? 'text-dark-secondary' : 'text-light-primary'
                        } transition-colors duration-300`}
                    />
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {dict[selectedLanguage].thanks}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Loading;
