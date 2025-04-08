import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP, triggerOTP } from '../lib/emailService';

interface OTPVerificationProps {
  email: string;
  onClose?: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onClose }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = timer > 0 ? setInterval(() => setTimer(prev => prev - 1), 1000) : undefined;
    return () => interval && clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await verifyOTP(email, otp);
      if (res.error) {
        setError(res.error);
      } else {
        onClose ? onClose() : navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Error verifying OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setError('');
    try {
      const res = await triggerOTP(email);
      if (res.error) {
        setError(res.error);
      } else {
        setTimer(60);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
      <p className="text-gray-600 mb-6 text-center">
        We've sent a verification code to <span className="font-semibold">{email}</span>.<br />
        Please enter the code below.
      </p>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Didn’t receive the code?{' '}
          {timer > 0 ? (
            <span className="text-gray-500">Resend in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="text-blue-600 font-medium"
            >
              Resend OTP
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
