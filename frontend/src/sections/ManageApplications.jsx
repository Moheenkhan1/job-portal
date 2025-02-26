import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = () => {
    axios
      .get(`${API_BASE_URL}/student/applied-jobs`, { withCredentials: true })
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Error fetching applied jobs:", error));
  };

  const withdrawApplication = (jobId) => {
    axios
      .delete(`${API_BASE_URL}/student/withdraw/${jobId}`, { withCredentials: true })
      .then(() => fetchAppliedJobs())
      .catch((error) => console.error("Error withdrawing application:", error));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <ul>
        {applications.length > 0 ? (
          applications.map((application) => (
            <li key={application._id} className="p-4 border-b">
              <h3 className="text-lg font-bold">{application.job.title}</h3>
              <p className="text-gray-600">{application.job.company}</p>
              <p>Recruiter: {application.recruiter.name} ({application.recruiter.email})</p>
              <p>Status: <span className={`font-bold ${application.status === "accepted" ? "text-green-600" : application.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span></p>
              <p>Applied At: {new Date(application.appliedAt).toLocaleDateString()}</p>
              <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Resume
              </a>
              <button
                onClick={() => withdrawApplication(application.job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2"
              >
                Withdraw
              </button>
            </li>
          ))
        ) : (
          <p>No applications yet.</p>
        )}
      </ul>
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

export default ManageApplications;
