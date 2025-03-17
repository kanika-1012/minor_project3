import React from 'react';
import { Link } from 'react-router-dom';

const utilities = [
  {
    title: 'Student Clubs',
    description: 'Discover various clubs and organizations to enhance your campus life.',
    link: '/student-clubs',
    backgroundClass: 'bg-gradient-to-r from-green-800 to-green-600',
  },
  {
    title: 'Training and Placements',
    description: 'Access training programs and placement opportunities to kick-start your career.',
    link: '/training-placements',
    backgroundClass: 'bg-gradient-to-r from-blue-800 to-blue-600',
  },
  {
    title: 'Grievance Redressal',
    description: 'Submit your grievances and receive prompt assistance.',
    link: '/grievance-redressal',
    backgroundClass: 'bg-gradient-to-r from-red-800 to-red-600',
  },
  {
    title: 'Mental Health Concerns',
    description: 'Find support and resources for mental wellbeing.',
    link: '/mental-health-concerns',
    backgroundClass: 'bg-gradient-to-r from-purple-800 to-purple-600',
  },
];

function UtilityCard({
  title,
  description,
  link,
  backgroundClass,
}: {
  title: string;
  description: string;
  link: string;
  backgroundClass: string;
}) {
  return (
    <div className="card w-full h-64 perspective">
      <div className="card-inner relative w-full h-full rounded-lg shadow-lg">
        <div
          className={`card-face absolute inset-0 ${backgroundClass} flex flex-col justify-center items-center rounded-lg p-4`}
        >
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <Link to={link} className="bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]">
            Know More
          </Link>
        </div>
        <div className="card-face card-back absolute inset-0 bg-gray-900 flex flex-col justify-center items-center rounded-lg p-4">
          <p className="text-white text-center">{description}</p>
          <Link to={link} className="mt-4 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]">
            Know More
          </Link>
        </div>
      </div>
    </div>
  );
}

export function UtilitiesGrid() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {utilities.map((util, index) => (
          <UtilityCard key={index} {...util} />
        ))}
      </div>
    </div>
  );
}