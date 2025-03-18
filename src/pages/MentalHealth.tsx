import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Calendar, MessageCircle, ExternalLink } from 'lucide-react';
import { AppointmentForm } from '../components/AppointmentForm'; // Ensure this path is correct
import { CustomChatbot } from '../components/CustomChatbot';
import 'react-calendar/dist/Calendar.css';

// Resources / articles list
const resources = [
  {
    title: 'Stress Management Techniques',
    url: 'https://www.verywellmind.com/tips-to-reduce-stress-3145195',
    description: 'Evidence-based strategies for managing stress',
  },
  {
    title: 'Anxiety Coping Strategies',
    url: 'https://www.verywellmind.com/manage-your-anxiety-2584184',
    description: 'Practical ways to cope with anxiety',
  },
  {
    title: 'Depression Awareness',
    url: 'https://www.nimh.nih.gov/health/topics/depression',
    description: 'Understanding and managing depression',
  },
  {
    title: 'Mindfulness Practices',
    url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
    description: 'Introduction to mindfulness meditation',
  },
];

function MentalHealth() {
  // State to control modals
  const [showAppointment, setShowAppointment] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#1a1a1a] p-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#17d059] hover:text-[#13b04f]"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">
          Mental Health Support
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: "Get Help Now" */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#17d059]">
              Get Help Now
            </h2>

            <div className="space-y-6">
              {/* 24/7 Helpline */}
              <div className="flex items-center space-x-4">
                <Phone className="text-[#17d059]" size={24} />
                <div>
                  <h3 className="font-semibold">24/7 Helpline</h3>
                  <p className="text-gray-400">1800-123-4567</p>
                </div>
              </div>

              {/* Book an Appointment */}
              <div className="flex items-center space-x-4">
                <Calendar className="text-[#17d059]" size={24} />
                <div>
                  <h3 className="font-semibold">Book an Appointment</h3>
                  <button
                    onClick={() => setShowAppointment(true)}
                    className="mt-2 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>

              {/* Chat Support */}
              <div className="flex items-center space-x-4">
                <MessageCircle className="text-[#17d059]" size={24} />
                <div>
                  <h3 className="font-semibold">Online Chat Support</h3>
                  <button
                    onClick={() => setShowChat(true)}
                    className="mt-2 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Appointment Modal */}
            {showAppointment && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Book Appointment
                  </h3>
                  <AppointmentForm
                    onSuccess={() => {
                      alert('Appointment booked successfully!');
                      setShowAppointment(false);
                    }}
                  />
                  <button
                    onClick={() => setShowAppointment(false)}
                    className="mt-4 text-gray-400 hover:text-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Chat Support Modal */}
            {showChat && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Chat Support</h3>
                    <button
                      onClick={() => setShowChat(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                  <CustomChatbot />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Resources Section */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#17d059]">
              Resources
            </h2>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-800 rounded hover:border-[#17d059] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#17d059]">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MentalHealth;


