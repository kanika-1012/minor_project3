import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, sendOTP, verifyOTP } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    yearOfStudy: '',
    stream: '',
    branch: '',
  });

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    try {
      const result = await sendOTP(email);
      if (result) {
        setOtpSent(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const result = await verifyOTP(email, otp);
      if (result) {
        setOtpVerified(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password, userData);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email (@kiit.ac.in)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* OTP Section */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOTP}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send OTP
            </button>
          )}

          {otpSent && !otpVerified && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Additional sign-up fields after OTP verification */}
          {otpVerified && isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year of Study
                </label>
                <select
                  value={userData.yearOfStudy}
                  onChange={(e) =>
                    setUserData({ ...userData, yearOfStudy: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stream
                </label>
                <input
                  type="text"
                  value={userData.stream}
                  onChange={(e) =>
                    setUserData({ ...userData, stream: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch
                </label>
                <input
                  type="text"
                  value={userData.branch}
                  onChange={(e) =>
                    setUserData({ ...userData, branch: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
            </>
          )}

          {otpVerified && (
            <button
              type="submit"
              className="w-full bg-[#17d059] text-white py-2 rounded hover:bg-[#13b04f]"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          )}
        </form>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

