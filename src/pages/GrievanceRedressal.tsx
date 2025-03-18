import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function GrievanceRedressal() {
  const { user } = useAuth();
  const [category, setCategory] = useState('Academic');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch grievances for the current user
  const fetchGrievances = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('grievances')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching grievances:', error);
    } else {
      setGrievances(data || []);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGrievances();

      // Setup realtime subscription using supabase.channel()
      const channel = supabase
        .channel(`grievances_${user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'grievances',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Grievance change received:', payload);
            fetchGrievances();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a grievance.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await supabase
      .from('grievances')
      .insert([
        {
          user_id: user.id,
          category,
          subject,
          description,
          status: 'Submitted',
        },
      ]);
    if (error) {
      setError('Failed to submit grievance. Please try again.');
      console.error('Insert grievance error:', error);
    } else {
      // Clear form fields
      setCategory('Academic');
      setSubject('');
      setDescription('');
      fetchGrievances();
    }
    setLoading(false);
  };

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
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]">Grievance Redressal</h1>

        <div className="max-w-2xl mx-auto">
          {/* Grievance Submission Form */}
          <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700"
              >
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
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700"
                placeholder="Brief subject of your grievance"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded p-2 border border-gray-700 h-32"
                placeholder="Describe your grievance in detail"
              ></textarea>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
            >
              {loading ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </form>

          {/* Grievance Tracking */}
          <div className="mt-8 bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#17d059]">Track Your Grievances</h2>
            <div className="space-y-4">
              {grievances.length === 0 ? (
                <p className="text-gray-400">No grievances submitted yet.</p>
              ) : (
                grievances.map((grievance) => (
                  <div key={grievance.id} className="border border-gray-800 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Grievance #{grievance.id}</h3>
                        <p className="text-sm text-gray-400">
                          Submitted on {new Date(grievance.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">{grievance.subject}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded ${
                          grievance.status === 'In Progress'
                            ? 'bg-yellow-800 text-yellow-200'
                            : 'bg-green-800 text-green-200'
                        }`}
                      >
                        {grievance.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GrievanceRedressal;

