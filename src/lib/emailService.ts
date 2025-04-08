// src/lib/emailService.ts

export const triggerOTP = async (email: string) => {
  const res = await fetch('http://localhost:5000/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

export const verifyOTP = async (email: string, otp: string) => {
  const res = await fetch('http://localhost:5000/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return await res.json();
};

export const notifyTopicAdmin = async (grievance: any) => {
  const res = await fetch('http://localhost:5000/api/notify-topic-admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Use import.meta.env for Vite environment variables
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ grievance }),
  });
  return await res.json();
};

export const notifyMainAdmin = async (grievance: any) => {
  const res = await fetch('http://localhost:5000/api/notify-main-admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ grievance }),
  });
  return await res.json();
};
