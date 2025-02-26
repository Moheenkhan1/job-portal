import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";


const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  // const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = () => {
    axios
      .get(`${API_BASE_URL}/student/saved-jobs`, { withCredentials: true })
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
      });
  };

  const removeSavedJob = (jobId) => {
    axios
      .delete(`${API_BASE_URL}/student/saved-jobs/${jobId}`, { withCredentials: true })
      .then(() => {
        setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => console.error("Error removing saved job:", error));
  };

  // if (loading) return <p className="text-center text-gray-600">Loading jobs...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">Saved & Applied Jobs</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Saved Jobs</h3>
        {savedJobs.length === 0 ? (
          <p className="text-gray-600">No saved jobs.</p>
        ) : (
          savedJobs.map((job) => (
            <div key={job._id} className="border p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <button
                onClick={() => removeSavedJob(job._id)}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
            <footer className="w-full text-blue-600 py-4 mt-auto fixed bottom-0">
              <div className="flex justify-center space-x-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                  <FaTwitter size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                  <FaFacebook size={24} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                  <FaYoutube size={24} />
                </a>
              </div>
            </footer>
    </div>
  );
};

export default SavedJobs;
