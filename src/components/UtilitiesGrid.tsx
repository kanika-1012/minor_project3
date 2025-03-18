import React from 'react';
import { Link } from 'react-router-dom';

const utilities = [
  {
    title: 'Student Clubs',
    description: 'Discover various clubs and organizations to enhance your campus life.',
    link: '/student-clubs',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
  },
  {
    title: 'Training and Placements',
    description: 'Access training programs and placement opportunities to kick-start your career.',
    link: '/training-placements',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop',
  },
  {
    title: 'Grievance Redressal',
    description: 'Submit your grievances and receive prompt assistance.',
    link: '/grievance-redressal',
    image: 'https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=800&h=400&fit=crop',
  },
  {
    title: 'Mental Health Concerns',
    description: 'Find support and resources for mental wellbeing.',
    link: '/mental-health-concerns',
    image: 'src/assets/136471897_e66931a1-8e60-4995-b35b-0208e75d8194.png',
  },
];

function UtilityCard({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
}) {
  return (
    <div className="card w-full h-64 perspective">
      <div className="card-inner relative w-full h-full rounded-lg shadow-lg">
        {/* Front Face with Background Image */}
        <div
          className="card-face card-front absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <Link
              to={link}
              className="bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
            >
              Know More
            </Link>
          </div>
        </div>
        {/* Back Face with Description */}
        <div className="card-face card-back absolute inset-0 bg-gray-900 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-white text-center">{description}</p>
          <Link
            to={link}
            className="mt-4 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
          >
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
      {/* Inline CSS for card flip effect */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .card-inner {
          transition: transform 0.8s;
          transform-style: preserve-3d;
          position: relative;
        }
        .card:hover .card-inner {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {utilities.map((util, index) => (
          <UtilityCard key={index} {...util} />
        ))}
      </div>
    </div>
  );
}
