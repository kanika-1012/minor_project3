import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import StudentClubs from './pages/StudentClubs';
import TrainingPlacements from './pages/TrainingPlacements';
import GrievanceRedressal from './pages/GrievanceRedressal';
import MentalHealth from './pages/MentalHealth';
import UserProfile from './pages/UserProfile';
import Navigation from './components/Navigation'; // Import Navigation

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#121212]">
        <Navigation /> {/* Display navigation at the top */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student-clubs" element={<StudentClubs />} />
          <Route path="/training-placements" element={<TrainingPlacements />} />
          <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
          <Route path="/mental-health-concerns" element={<MentalHealth />} />
          <Route path="/profile" element={<UserProfile />} />
           {/* <Route path="/study-material" element={<StudyMaterial />} />
  <Route path="/faculty-details" element={<FacultyDetails />} />
  <Route path="/hostel-life" element={<HostelLife />} />
  <Route path="/campus-life" element={<CampusLife />} />
  <Route path="/student-clubs" element={<StudentClubs />} /> */}
        </Routes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;

