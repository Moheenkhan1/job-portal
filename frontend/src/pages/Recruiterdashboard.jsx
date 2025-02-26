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
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Recruiter Dashboard</h1>

      {/* Post a New Job */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Post a New Job</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-3 border rounded-lg" type="text" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
          <input className="w-full p-3 border rounded-lg" type="text" placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
          <input className="w-full p-3 border rounded-lg" type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
          <input className="w-full p-3 border rounded-lg" type="text" placeholder="Salary Range" value={newJob.salaryRange} onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })} />
        </div>
        <textarea className="w-full p-3 mt-4 border rounded-lg" placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}></textarea>
        <input className="w-full p-3 mt-4 border rounded-lg" type="text" placeholder="Requirements (comma-separated)" value={newJob.requirements} onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })} />
        <button className="w-full bg-blue-500 text-white py-3 mt-4 rounded-lg hover:bg-blue-600 transition" onClick={addJob}>
          Add Job
        </button>
      </div>

      {/* Posted Jobs */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <ul className="divide-y">
            {jobs.map((job) => (
              <li key={job._id} className="flex justify-between items-center py-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company} - {job.location}</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => deleteJob(job._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Applications */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications received.</p>
        ) : (
          <ul className="divide-y">
            {applications.map((app) => (
              <li key={app._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-gray-700">{app.student.name} applied for <span className="font-semibold">{app.job.title}</span></p>
                  <span className={`text-sm px-2 py-1 rounded-md ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : app.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {app.status}
                  </span>
                </div>
                {app.status === 'pending' && (
                  <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition" onClick={() => updateApplicationStatus(app._id, 'Approved')}>
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => updateApplicationStatus(app._id, 'Rejected')}>
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
