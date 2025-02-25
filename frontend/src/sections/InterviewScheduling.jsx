import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewScheduling = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = () => {
    axios
      .get("http://localhost:8080/student/interviews", { withCredentials: true })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching interviews:", error);
      })
      .finally(() => setLoading(false));
  };

  const scheduleInterview = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8080/student/interviews",
        { jobId: selectedJob, date: interviewDate },
        { withCredentials: true }
      )
      .then((response) => {
        setInterviews([...interviews, response.data]);
        setSelectedJob("");
        setInterviewDate("");
        alert("Interview Scheduled Successfully!");
      })
      .catch((error) => {
        console.error("Error scheduling interview:", error);
        alert("Failed to schedule interview.");
      });
  };

  if (loading) return <p className="text-center text-gray-600">Loading interviews...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Interview Scheduling</h2>

      <form onSubmit={scheduleInterview} className="mb-6">
        <label className="block mb-2">Select Job</label>
        <input
          type="text"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Enter Job ID"
          required
        />

        <label className="block mb-2">Select Date & Time</label>
        <input
          type="datetime-local"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Schedule Interview
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-3">Upcoming Interviews</h3>
      {interviews.length === 0 ? (
        <p className="text-gray-600">No scheduled interviews.</p>
      ) : (
        interviews.map((interview) => (
          <div key={interview._id} className="border p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold">{interview.jobTitle}</h3>
            <p className="text-gray-700">{interview.company}</p>
            <p className="text-sm text-gray-500">{new Date(interview.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default InterviewScheduling;
