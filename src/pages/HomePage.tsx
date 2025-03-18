import React, { useEffect, useState } from 'react';
import { Menu, Search, User, ChevronDown, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import { UtilitiesGrid } from '../components/UtilitiesGrid';

function NavItem({ text }: { text: string }) {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-300 hover:text-[#17d059] transition-colors">
        <span>{text}</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

function NewsSection() {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-xl border border-[#17d059]/10">
      <h2 className="text-2xl font-bold mb-4 text-[#17d059]">Latest News</h2>
      <div className="space-y-4">
        <NewsItem title="New Student Orientation 2024" date="March 1, 2024" />
        <NewsItem title="Academic Excellence Awards" date="February 28, 2024" />
        <NewsItem title="Campus Safety Updates" date="February 25, 2024" />
      </div>
    </div>
  );
}

function NewsItem({ title, date }: { title: string; date: string }) {
  return (
    <div className="border-b border-gray-800 pb-4">
      <h3 className="font-semibold text-gray-200 hover:text-[#17d059] transition-colors cursor-pointer">
        {title}
      </h3>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-xl border border-[#17d059]/10">
      <h2 className="text-2xl font-bold mb-4 text-[#17d059]">Upcoming Events</h2>
      <div className="space-y-4">
        <EventItem title="Student Leadership Summit" date="March 15, 2024" time="10:00 AM" />
        <EventItem title="Career Fair Spring 2024" date="March 20, 2024" time="9:00 AM" />
        <EventItem title="Cultural Festival" date="April 1, 2024" time="5:00 PM" />
      </div>
    </div>
  );
}

function EventItem({ title, date, time }: { title: string; date: string; time: string }) {
  return (
    <div className="border-b border-gray-800 pb-4">
      <h3 className="font-semibold text-gray-200 hover:text-[#17d059] transition-colors cursor-pointer">
        {title}
      </h3>
      <p className="text-sm text-gray-400">
        {date} at {time}
      </p>
    </div>
  );
}

function ResourcesSection() {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-xl border border-[#17d059]/10">
      <h2 className="text-2xl font-bold mb-4 text-[#17d059]">Student Resources</h2>
      <div className="space-y-4">
        <ResourceItem title="Academic Calendar" description="Important dates and deadlines" />
        <ResourceItem title="Student Handbook" description="Policies and procedures" />
        <ResourceItem title="Health Services" description="Medical and wellness support" />
      </div>
    </div>
  );
}

function ResourceItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-gray-800 pb-4">
      <h3 className="font-semibold text-gray-200 hover:text-[#17d059] cursor-pointer">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function HomePage() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Innovate', 'Inspire', 'Ignite'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
     {/* /* <nav className="sticky top-0 bg-[#1a1a1a] shadow-xl z-50 border-b border-[#17d059]/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://kiit.ac.in/wp-content/uploads/2019/11/KIIT-LOGO-ANIMATION-256x256-1.png"
                alt="KIIT Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <NavItem text="About KIIT" />
              <NavItem text="Academics" />
              <NavItem text="Student Life" />
            </div>
            <div className="flex items-center space-x-4">
              <Search className="text-gray-400 hover:text-[#17d059] transition-colors" />
              <User className="text-gray-400 hover:text-[#17d059] transition-colors" />
              <button className="md:hidden">
                <Menu className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      */ }

      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop"
          alt="Campus"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60">
          <div className="container mx-auto h-full flex items-center">
            <div className="text-left px-6 md:px-12 max-w-3xl">
              <h1 className="text-7xl font-bold mb-6 text-gradient leading-tight text-white">
                Student Affairs
              </h1>
              <div className="mt-6">
                <h2 className="text-6xl font-bold text-shadow-glow text-white">
                  We{' '}
                  <span className="inline-block min-w-[300px]">
                    <span key={currentWord} className="animate-fade-in-out inline-block text-[#17d059]">
                      {words[currentWord]}
                    </span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsSection />
          <EventsSection />
          <ResourcesSection />
        </div>
      </div>

      <UtilitiesGrid />

      <footer className="bg-[#1a1a1a] text-gray-300 py-8 border-t border-[#17d059]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
              <p>KIIT University</p>
              <p>Bhubaneswar, Odisha</p>
              <p>India - 751024</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Academic Calendar</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Student Portal</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Library Resources</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Important Information</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Terms of Use</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#17d059] transition-colors">Student Handbook</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#17d059] transition-colors">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-[#17d059] transition-colors">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-[#17d059] transition-colors">
                  <Instagram />
                </a>
                <a href="#" className="hover:text-[#17d059] transition-colors">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} KIIT University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;