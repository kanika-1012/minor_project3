import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface UserProfile {
  full_name: string;
  year_of_study: string;
  stream: string;
  branch: string;
}

function UserProfile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAppointments();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user?.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
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
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#17d059]">User Profile</h1>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>

            {profile && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400">Email</label>
                  <p className="text-xl">{user.email}</p>
                </div>
                <div>
                  <label className="text-gray-400">Full Name</label>
                  <p className="text-xl">{profile.full_name}</p>
                </div>
                <div>
                  <label className="text-gray-400">Year of Study</label>
                  <p className="text-xl">{profile.year_of_study}</p>
                </div>
                <div>
                  <label className="text-gray-400">Stream</label>
                  <p className="text-xl">{profile.stream}</p>
                </div>
                <div>
                  <label className="text-gray-400">Branch</label>
                  <p className="text-xl">{profile.branch}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#17d059]">
              Your Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((apt: any) => (
                <div
                  key={apt.id}
                  className="border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg">
                        Date: {new Date(apt.appointment_date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400">Time: {apt.appointment_time}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded ${
                        apt.status === 'confirmed'
                          ? 'bg-green-800 text-green-200'
                          : 'bg-yellow-800 text-yellow-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && (
                <p className="text-gray-400">No appointments scheduled</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;