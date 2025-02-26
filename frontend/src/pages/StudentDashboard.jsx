import React, { useState } from 'react';
import Profile from '../sections/Profile';
import JobListings from '../sections/JobListings';
import SavedJobs from '../sections/SavedJobs';
import Interviews from '../sections/InterviewScheduling';
import Notifications from '../sections/Notifications';
import Settings from '../sections/Settings';
import ManageApplications from '../sections/ManageApplications';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleLogout = async () => {
    try {
      console.log(API_BASE_URL)
      const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      
      if (response.status === 200) {
        // Clear user authentication data (e.g., token, session)
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex items-center justify-between fixed w-full">
        
        {/* Left Side: Logo + Hamburger + Home Button */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-wide">JOB-PORTAL</div>

          {/* Hamburger Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <IoMdClose className='cursor-pointer'/> : <IoMdMenu className='cursor-pointer' />}
          </button>

          {/* Home Button */}
          <button 
            onClick={() => setActiveTab('jobs')} 
            className="text-2xl hover:text-gray-300 transition cursor-pointer"
            title="Go to Home"
          >
            <FaHome />
          </button>
        </div>
      </nav>

      {/* Animated Sidebar Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-14 w-[30%] bg-blue-600 text-white shadow-lg p-4 h-full mt-4"
        >
          <ul className="space-y-3">
            {[
              { key: 'profile', label: 'Profile' },
              { key: 'saved', label: 'Saved Jobs' },
              { key: 'settings', label: 'Settings' },
              { key: 'ManageApplications', label: 'Manage Applications' },
            ].map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => { setActiveTab(key); setMenuOpen(false); }}
                  className={`block w-full text-left p-2 cursor-pointer rounded-lg transition-all duration-200 ${
                    activeTab === key ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-500'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
                <button
                  onClick={() => { handleLogout() }}
                  className={`block w-full text-left p-2 cursor-pointer rounded-lg transition-all duration-200  hover:bg-blue-500`}
                >
                  Logout
                </button>
              </li>
          </ul>
        </motion.div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {activeTab === 'jobs' && <JobListings />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'saved' && <SavedJobs />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'ManageApplications' && <ManageApplications />}
      </div>

    </div>
  );
};

export default StudentDashboard;
