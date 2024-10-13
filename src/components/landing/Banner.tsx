"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import BeamLogo from "/public/icons/beam.svg"; 
import { FaSpinner } from 'react-icons/fa';
import { dict } from '@/lib/dict';
import { useRouter } from 'next/navigation';

const Banner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const selectedLanguage = "english";

  const handleClick = () => {
    setIsLoading(true);
    router.push('/auth/signup');
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-start h-screen px-8 bg-light-background dark:bg-dark-background">
      <div className='flex flex-row'>
        {/* Left Section - Text */}
        <div className="flex flex-col max-w-md mb-8 items-center -mt-12">
          <Image src={BeamLogo} alt="Beam Logo" className="h-100 w-100" height={300} width={300} />
          <h1 className="md:text-4xl text-3xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            {dict[selectedLanguage].welcome}
          </h1>
          <p className="md:text-lg text-base text-center mb-6 text-light-muted dark:text-dark-muted">
            {dict[selectedLanguage].subtitle}
          </p>
          <button
            onClick={handleClick}
            className="bg-light-primary hover:bg-light-secondary dark:bg-light-primary dark:hover:bg-dark-secondary text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].getStarted}
          </button>
        </div>

            {/* Right Section - Image */}
            <div className="hidden md:block ml-20">
              <Image
                src="/images/ss_1.png"
                alt="App showcase"
                className="w-600 h-auto"
                height={800}
                width={600}
              />
            </div>
      </div>
    </div>
  );
};

export default Banner;
