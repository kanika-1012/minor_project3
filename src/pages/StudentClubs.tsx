import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const clubs = [
  {
    name: 'KIIT Robotics Society',
    description: 'A platform for robotics enthusiasts to learn and build innovative projects.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  },
  {
    name: 'KIIT Music Society',
    description: 'For students passionate about music, performing arts, and cultural activities.',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=400&fit=crop',
  },
  {
    name: 'KIIT Photography Club',
    description: 'Capturing moments and telling stories through the lens.',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&h=400&fit=crop',
  },
];

function StudentClubs() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <nav className="bg-[#1a1a1a] p-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center space-x-2 text-[#17d059] hover:text-[#13b04f]">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">Student Clubs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
              <img src={club.image} alt={club.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#17d059]">{club.name}</h3>
                <p className="text-gray-300">{club.description}</p>
                <button className="mt-4 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]">
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentClubs;