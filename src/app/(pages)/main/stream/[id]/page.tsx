"use client";
import AppFooter from '@/components/main/AppFooter';
import AppNavbar from '@/components/main/AppNavbar';
import SideMenu from '@/components/main/SideMenu';
import Stream from '@/components/main/Stream';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const streamId = params.id;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <AppNavbar />
      
      {/* Main content container */}
      <div className="flex flex-1 overflow-hidden h-full">
        {/* SideMenu should take fixed width but stretch to full height */}
        <SideMenu />
        
        {/* Dynamic Component Render */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Stream id={parseInt(streamId, 10)} type='userView' />
        </main>
      </div>

      {/* Footer remains at the bottom */}
      <AppFooter />
    </div>
  );
}

export default Page;
