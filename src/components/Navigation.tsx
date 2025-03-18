import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal'; // Adjust path if needed
import { User, Search, ChevronDown } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dropdown states for center menu items
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [studentLifeOpen, setStudentLifeOpen] = useState(false);

  // Auth modal handlers
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <nav className="sticky top-0 bg-[#1a1a1a] text-white px-6 py-2 flex items-center justify-between border-b border-[#17d059]/10 z-50">
      {/* Left Section: KIIT Logo */}
      <div className="flex items-center">
        <Link to="/">
          <div className="bg-[#1a1a1a] inline-block p-1">
            <img
              src="src/assets/KIIT-Logo-Icon-1.png"
              alt="KIIT Logo"
              className="h-12 w-auto object-contain"  // increased size here
            />
          </div>
        </Link>
      </div>

      {/* Center Section: Menu Items */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/about-kiit" className="hover:text-[#17d059]">
          About KIIT
        </Link>

        {/* Academics Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setAcademicsOpen(true)}
          onMouseLeave={() => setAcademicsOpen(false)}
        >
          <button className="flex items-center space-x-1 hover:text-[#17d059]">
            <span>Academics</span>
            <ChevronDown size={16} />
          </button>
          {academicsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded shadow-lg">
              <Link
                to="/study-material"
                className="block px-4 py-2 hover:bg-[#17d059]"
              >
                Study Material
              </Link>
              <Link
                to="/faculty-details"
                className="block px-4 py-2 hover:bg-[#17d059]"
              >
                Faculty Details
              </Link>
            </div>
          )}
        </div>

        {/* Student Life Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setStudentLifeOpen(true)}
          onMouseLeave={() => setStudentLifeOpen(false)}
        >
          <button className="flex items-center space-x-1 hover:text-[#17d059]">
            <span>Student Life</span>
            <ChevronDown size={16} />
          </button>
          {studentLifeOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded shadow-lg">
              <Link
                to="/hostel-life"
                className="block px-4 py-2 hover:bg-[#17d059]"
              >
                Hostel Life
              </Link>
              <Link
                to="/campus-life"
                className="block px-4 py-2 hover:bg-[#17d059]"
              >
                Campus Life
              </Link>
              <Link
                to="/student-clubs"
                className="block px-4 py-2 hover:bg-[#17d059]"
              >
                Student Clubs
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Search + User Icon */}
      <div className="flex items-center space-x-4">
        <Search className="text-gray-400 hover:text-[#17d059] transition-colors cursor-pointer" />
        {user ? (
          <Link to="/profile">
            <User className="text-gray-400 hover:text-[#17d059] transition-colors cursor-pointer" />
          </Link>
        ) : (
          <button
            onClick={openAuthModal}
            className="text-gray-400 hover:text-[#17d059] transition-colors"
          >
            <User />
          </button>
        )}
      </div>

      {/* Auth Modal for Login/Sign-up */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

export default Navigation;


