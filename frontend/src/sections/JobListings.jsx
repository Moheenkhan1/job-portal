import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/student/jobs", { withCredentials: true })
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
      .get("http://localhost:8080/student/saved-jobs", { withCredentials: true })
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
        `http://localhost:8080/student/jobs/apply/${jobId}`,
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
        `http://localhost:8080/student/jobs/save/${jobId}`,
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded-lg mb-4 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-gray-600">{job.description}</p>
              <button
                onClick={() => applyForJob(job._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
            {/* Save Job Button */}
            <button
              onClick={() => handleSaveJob(job._id)}
              className="text-gray-500 hover:text-blue-600"
              disabled={savedJobs.includes(job._id)}
            >
              {savedJobs.includes(job._id) ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
