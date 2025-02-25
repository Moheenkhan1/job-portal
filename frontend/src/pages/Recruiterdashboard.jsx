import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', description: '' });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recruiter/getjobs`, {withCredentials:true} );
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recruiter/applications`, {withCredentials:true});
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const addJob = async () => {
    try {
      await axios.post(`${API_BASE_URL}/recruiter/addjob`, newJob, {withCredentials:true});
      fetchJobs();
      setNewJob({ title: '', company: '', location: '', description: '' });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/recruiter/delete/${id}`, {withCredentials:true});
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/recruiter/applications/${id}`, { status }, {withCredentials:true});
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
        <textarea className="w-full p-2 mb-2 border rounded" placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}></textarea>
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Requirements (comma-separated)" value={newJob.requirements} onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })} />
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Salary Range" value={newJob.salaryRange} onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })} />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addJob}>Add Job</button>
      </div>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="flex justify-between items-center border-b p-2">
              {job.title} - {job.company} ({job.location})
              <button className="bg-red-500 text-white p-1 rounded" onClick={() => deleteJob(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>
        <ul>
          {applications.map((app) => (
            <li key={app._id} className="border-b p-2 flex justify-between items-center">
              <span>{app.student.name} applied for {app.job.title} - <span className="font-semibold">Status: {app.status}</span></span>
              {app.status === 'pending' && (
                <div>
                  <button className="bg-green-500 text-white p-1 rounded mr-2" onClick={() => updateApplicationStatus(app._id, 'Approved')}>Approve</button>
                  <button className="bg-red-500 text-white p-1 rounded" onClick={() => updateApplicationStatus(app._id, 'Rejected')}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
