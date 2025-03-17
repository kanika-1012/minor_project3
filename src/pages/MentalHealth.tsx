import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Calendar, MessageCircle, ExternalLink } from 'lucide-react';
import ReactCalendar from 'react-calendar';
import Chatbot from 'react-chatbot-kit';
import { createClient } from '@supabase/supabase-js';
import { format, isWeekend, isWithinInterval, setHours, setMinutes } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const resources = [
  {
    title: 'Stress Management Techniques',
    url: 'https://www.healthline.com/health/stress-management-techniques',
    description: 'Evidence-based strategies for managing stress'
  },
  {
    title: 'Anxiety Coping Strategies',
    url: 'https://www.verywellmind.com/manage-your-anxiety-2584184',
    description: 'Practical ways to cope with anxiety'
  },
  {
    title: 'Depression Awareness',
    url: 'https://www.nimh.nih.gov/health/topics/depression',
    description: 'Understanding and managing depression'
  },
  {
    title: 'Mindfulness Practices',
    url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
    description: 'Introduction to mindfulness meditation'
  }
];

// Chatbot configuration
const config = {
  initialMessages: [
    {
      id: 'welcome',
      message: "Hello! I'm here to help. How are you feeling today?",
      trigger: 'response'
    }
  ],
  widgets: []
};

function MentalHealth() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showChat, setShowChat] = useState(false);

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = async (time: string) => {
    if (!selectedDate) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            appointment_date: format(selectedDate, 'yyyy-MM-dd'),
            appointment_time: time,
          }
        ]);

      if (error) throw error;

      alert('Appointment booked successfully!');
      setShowCalendar(false);
      setSelectedDate(null);
      setSelectedTime('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return isWeekend(date) || !isWithinInterval(date, {
      start: new Date(),
      end: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });
  };

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
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">Mental Health Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#17d059]">Get Help Now</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-[#17d059]" size={24} />
                <div>
                  <h3 className="font-semibold">24/7 Helpline</h3>
                  <p className="text-gray-400">1800-123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Calendar className="text-[#17d059]" size={24} />
                <div>
                  <h3 className="font-semibold">Book an Appointment</h3>
                  <button 
                    onClick={() => setShowCalendar(true)}
                    className="mt-2 bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>

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

            {showCalendar && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
                  <ReactCalendar
                    onChange={handleDateSelect}
                    value={selectedDate}
                    tileDisabled={tileDisabled}
                    className="mb-4"
                  />
                  {selectedDate && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Select Time:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map(time => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className="bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="mt-4 text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#17d059]">Resources</h2>
            
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
                      <h3 className="font-semibold text-[#17d059]">{resource.title}</h3>
                      <p className="text-sm text-gray-400">{resource.description}</p>
                    </div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

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
              <Chatbot
                config={config}
                messageParser={() => ({})}
                actionProvider={() => ({})}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MentalHealth;