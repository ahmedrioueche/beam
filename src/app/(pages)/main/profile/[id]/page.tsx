"use client"
import AppFooter from '@/components/main/AppFooter';
import AppNavbar from '@/components/main/AppNavbar';
import Profile from '@/components/main/Profile';
import SideMenu from '@/components/main/SideMenu';
import React from 'react'

interface PageProps {
    params: {
      id: string;
    };
}
  
const Page = ({ params }: PageProps) => {
  const { id } = params;  
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
            <Profile id={parseInt(id, 10)}/>
        </main>
      </div>

      {/* Footer remains at the bottom */}
      <AppFooter />
    </div>
  );
}

export default Page