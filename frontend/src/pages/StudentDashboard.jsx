import React, { useState } from 'react';
import Profile from '../sections/Profile';
import JobListings from '../sections/JobListings';
import SavedJobs from '../sections/SavedJobs';
import Interviews from '../sections/InterviewScheduling';
import Notifications from '../sections/Notifications';
import Settings from '../sections/Settings';
import ManageApplications from '../sections/ManageApplications';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-around">
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button onClick={() => setActiveTab('jobs')}>Jobs</button>
        <button onClick={() => setActiveTab('saved')}>Saved Jobs</button>
        {/* <button onClick={() => setActiveTab('interviews')}>Interviews</button> */}
        {/* <button onClick={() => setActiveTab('notifications')}>Notifications</button> */}
        <button onClick={() => setActiveTab('settings')}>Settings</button>
        <button onClick={() => setActiveTab('ManageApplications')}>ManageApplications</button>
      </nav>

      <div className="p-6">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'jobs' && <JobListings />}
        {activeTab === 'saved' && <SavedJobs />}
        {/* {activeTab === 'interviews' && <Interviews />} */}
        {/* {activeTab === 'notifications' && <Notifications />} */}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'ManageApplications' && <ManageApplications/>}
      </div>
    </div>
  );
};

export default StudentDashboard;
