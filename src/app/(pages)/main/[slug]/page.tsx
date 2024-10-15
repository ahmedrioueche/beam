"use client";
import AppFooter from '@/components/main/AppFooter';
import AppNavbar from '@/components/main/AppNavbar';
import SideMenu from '@/components/main/SideMenu';
import SkeletonHome from '@/components/main/SkeletonHome';
import React, { lazy, useEffect, useState, Suspense } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;  
  const [Component, setComponent] = useState<React.LazyExoticComponent<React.FC<any>> | null>(null);
  console.log("slug", slug)
  useEffect(() => {
    switch (slug) {
      case "home":
        setComponent(() => lazy(() => import('@/components/main/Home')));
        break;
      case "settings":
        setComponent(() => lazy(() => import('@/components/main/Settings')));
        break;
      default:
        setComponent(null); 
    }
  }, [slug]);

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
          {Component ? (
            <Suspense fallback={<SkeletonHome/>}>
              <Component/>
            </Suspense>
          ) : (
            <></>
          )}
        </main>
      </div>

      {/* Footer remains at the bottom */}
      <AppFooter />
    </div>
  );
}

export default Page;
