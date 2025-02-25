import React, { useState, useEffect } from "react";
import axios from "axios";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = () => {
    axios
      .get("http://localhost:8080/student/saved-jobs", { withCredentials: true })
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
      });
  };

  const removeSavedJob = (jobId) => {
    axios
      .delete(`http://localhost:8080/student/saved-jobs/${jobId}`, { withCredentials: true })
      .then(() => {
        setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => console.error("Error removing saved job:", error));
  };

  // if (loading) return <p className="text-center text-gray-600">Loading jobs...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
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
    </div>
  );
};

export default SavedJobs;
