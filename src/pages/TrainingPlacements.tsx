import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Users, Trophy } from 'lucide-react';

function TrainingPlacements() {
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
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">Training & Placements</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1a1a1a] p-6 rounded-lg text-center">
            <Briefcase size={48} className="mx-auto mb-4 text-[#17d059]" />
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-gray-300">Companies Visited</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg text-center">
            <Users size={48} className="mx-auto mb-4 text-[#17d059]" />
            <h3 className="text-2xl font-bold mb-2">95%</h3>
            <p className="text-gray-300">Placement Rate</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg text-center">
            <Trophy size={48} className="mx-auto mb-4 text-[#17d059]" />
            <h3 className="text-2xl font-bold mb-2">42 LPA</h3>
            <p className="text-gray-300">Highest Package</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#17d059]">Upcoming Placement Drives</h2>
          <div className="space-y-4">
            {['Microsoft', 'Amazon', 'Google'].map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-800 rounded">
                <div>
                  <h3 className="font-semibold">{company}</h3>
                  <p className="text-sm text-gray-400">Date: March {15 + index}, 2024</p>
                </div>
                <button className="bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TrainingPlacements;