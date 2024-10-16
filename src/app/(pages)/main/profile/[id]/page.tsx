"use client"
import Loading from '@/components/Loading';
import AppFooter from '@/components/main/AppFooter';
import AppNavbar from '@/components/main/AppNavbar';
import Profile from '@/components/main/profile/Profile';
import SideMenu from '@/components/main/SideMenu';
import SkeletonHome from '@/components/main/SkeletonHome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface PageProps {
  params: {
    id: string;
  };
}
  
const Page = ({ params }: PageProps) => {
  const { id } = params;  
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
 
  }, [status, router]);

  if (status === 'loading') return <SkeletonHome/>;
  if (!session) return <Loading />;

  return session? (
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
  ) : (
    <Loading/>
  );
}

export default Page