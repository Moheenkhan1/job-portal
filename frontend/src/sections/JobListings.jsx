import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaBookmark, FaRegBookmark, FaBuilding, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/student/jobs`, { withCredentials: true })
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });

    // Fetch saved jobs for the logged-in user
    axios
      .get(`${API_BASE_URL}/student/saved-jobs`, { withCredentials: true })
      .then((response) => {
        setSavedJobs(response.data.map((job) => job._id)); // Store saved job IDs
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
      });
  }, []);

  const applyForJob = async (jobId) => {
    const resumeLink = prompt("Enter your resume link:");

    if (!resumeLink) {
      alert("Application failed: Resume link is required!");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/student/jobs/apply/${jobId}`,
        { resumeLink },
        { withCredentials: true, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Application Submitted Successfully!");
    } catch (error) {
      console.error("Failed to Apply:", error.response?.data || error.message);
      alert(`Failed to Apply: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/student/jobs/save/${jobId}`,
        {},
        { withCredentials: true, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSavedJobs((prev) => [...prev, jobId]); // Update state
      alert("Job Saved Successfully!");
    } catch (error) {
      console.error("Failed to Save Job:", error.response?.data || error.message);
      alert(`Failed to Save: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading jobs...</p>;

  return (
    <div className="mt-20 flex flex-col items-center bg-gray-100 min-h-screen px-4">
      <h2 className="text-3xl font-bold text-blue-600 my-6">Job Listings</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 w-full max-w-2xl border border-gray-200"
          >
            {/* Job Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-blue-500" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
              </div>

              {/* Save Job Button */}
              <button
                onClick={() => handleSaveJob(job._id)}
                className="text-gray-500 hover:text-blue-600 transition-all"
                disabled={savedJobs.includes(job._id)}
              >
                {savedJobs.includes(job._id) ? <FaBookmark size={22} /> : <FaRegBookmark size={22} />}
              </button>
            </div>

            {/* Job Details */}
            <h2 className="text-xl font-bold text-gray-900 mt-2">{job.title}</h2>
            <div className="flex items-center text-gray-600 gap-2 mt-1">
              <FaMapMarkerAlt size={14} />
              <p className="text-sm">{job.location}</p>
            </div>
            <div className="flex items-center text-gray-600 gap-2">
              <FaBriefcase size={14} />
              <p className="text-sm">{job.description}</p>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => applyForJob(job._id)}
              className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Apply Now
            </button>
          </div>
        ))
      )}
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

export default JobListings;
