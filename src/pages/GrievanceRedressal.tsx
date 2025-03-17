import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function GrievanceRedressal() {
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
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">Grievance Redressal</h1>

        <div className="max-w-2xl mx-auto">
          <form className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700">
                <option>Academic</option>
                <option>Administrative</option>
                <option>Hostel</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700"
                placeholder="Brief subject of your grievance"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700 h-32"
                placeholder="Describe your grievance in detail"
              ></textarea>
            </div>

            <button className="w-full bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]">
              Submit Grievance
            </button>
          </form>

          <div className="mt-8 bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#17d059]">Track Your Grievances</h2>
            <div className="space-y-4">
              {['GR001', 'GR002'].map((id, index) => (
                <div key={index} className="border border-gray-800 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Grievance #{id}</h3>
                      <p className="text-sm text-gray-400">Submitted on March 1, 2024</p>
                    </div>
                    <span className="px-3 py-1 rounded bg-yellow-800 text-yellow-200">In Progress</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GrievanceRedressal;