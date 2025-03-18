import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AppointmentFormProps {
  onSuccess: () => void;
}

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [concern, setConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !name || !email || !concern) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('appointments')
        .insert([
          {
            appointment_date: date.toISOString(),
            name,
            email,
            concern,
            status: 'pending',
          },
        ]);

      if (supabaseError) throw supabaseError;

      onSuccess();
      setName('');
      setEmail('');
      setConcern('');
      setDate(null);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Appointment booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Appointment Date &amp; Time
        </label>
        <div className="relative mt-1">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            {date ? <Clock size={20} /> : <Calendar size={20} />}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Your Concern</label>
        <textarea
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Describe your concern"
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}
