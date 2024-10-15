import Link from "next/link";
import { useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useTheme } from "@/app/context/ThemeContext";
import BeamLogo from "/public/icons/beam.svg";
import Image from "next/image";
import DropdownNotifs from "./DropdownNotifs";
import DropdownProfile from "./DropdownProfile";
import { dict } from "@/lib/dict";
import { useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

const AppNavbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const selectedLanguage = "english";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSettings = () => {
    toggleDropdown("settings");
    router.push("/main/settings");
  }

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  }
  
  return (
    <nav className="relative z-10 top-0 left-0 w-full py-4 px-6 shadow-md bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto flex items-center justify-between font-f1">
        <div className="flex justify-start">
          {!isSearchOpen && (
            <div onClick={openMobileSidebar} className="md:hidden text-light-primary dark:text-dark-primary cursor-pointer">
            <FaBars className="mt-2 mr-4" size={24}/>
            </div>
          )}
          {/* Left: Logo and Name */}
          {!isSearchOpen && (
            <div className="flex items-center space-x-3">
              <Link href="/main/home" className="relative cursor-pointer flex items-center">
                <Image
                  src={BeamLogo}
                  alt="Beam Logo"
                  className="h-10 w-10"
                  height={40}
                  width={40}
                />
                <span className="text-xl ml-2 mt-1 font-f2 text-light-text-primary dark:text-dark-text-primary">
                  {dict[selectedLanguage].logo}
                </span>
              </Link>
            </div>
          )}
        </div>
        {/* Middle: Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`${
            isSearchOpen
              ? "flex flex-1"
              : "hidden md:flex flex-1 mx-8"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-transparent focus:border-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary focus:outline-none transition-colors duration-300"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen} 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-muted dark:text-dark-muted" />
          </div>
        </form>

        {/* Right: Icons */}
        {!isSearchOpen && (
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              <FaSearch size={20} />
            </button>
             <button
              onClick={()=> toggleDropdown("notifications")}
              className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              <FaBell size={20}/>
            </button>

             <button
              onClick={()=> handleSettings()}
              className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              <FaCog size={20}/>
            </button> 
   
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              {isDarkMode ? (
                <FaSun size={20} title="Switch to Light Mode" />
              ) : (
                <FaMoon size={20} title="Switch to Dark Mode" />
              )}
            </button>
            <button
              onClick={()=>toggleDropdown("profile")}
              className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              <FaUserCircle size={20}/>
            </button>         
          </div>
        )}

        {/* Close Search on Small Screens */}
        {isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(false)}
            className="md:hidden p-2 ml-4 rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
          >
            <FaTimes size={20} />
          </button>
        )}
         <DropdownNotifs
          isOpen={activeDropdown === "notifications"}
          onClose={() => toggleDropdown("notifications")}
        />
        
        <DropdownProfile
          isOpen={activeDropdown === "profile"}
          onClose={() => toggleDropdown("profile")}
        />
      </div>
        <MobileSidebar 
          isOpen={isMobileSidebarOpen}
          onClose={()=> setIsMobileSidebarOpen(false)}  
        />
    </nav>
  );
};

export default AppNavbar;
