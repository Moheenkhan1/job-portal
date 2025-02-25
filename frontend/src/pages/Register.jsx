import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isRecruiter, setIsRecruiter] = useState(false);

  // Student Fields
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  // Recruiter Fields
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPassword, setRecruiterPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const handleSubmit = async (event) => {
  event.preventDefault();

  // Define the API endpoints
  const studentApiUrl = `${API_BASE_URL}/auth/student/register`;
  const recruiterApiUrl = `${API_BASE_URL}/auth/recruiter/register`;

  // Prepare the data
  const userData = isRecruiter
    ? {
        name: recruiterName,
        email: recruiterEmail,
        password: recruiterPassword,
        companyName,
        companyWebsite,
      }
    : {
        name: studentName,
        email: studentEmail,
        password: studentPassword,
      };

  try {
    const response = await axios.post(isRecruiter ? recruiterApiUrl : studentApiUrl, userData,{ withCredentials: true, });

    if (response.status === 201) {
      navigate('/login')
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    alert(error.response?.data?.message || "Something went wrong. Please try again.");
  }
};
const getToggleAnimation = () => {
  switch (isRecruiter ? "recruiter" : "student") {
    case "student":
      return "animate-bounce text-blue-600";
    case "recruiter":
      return "animate-bounce text-green-600";
    default:
      return "";
  }
};

const getInputShadow = () => {
  switch (isRecruiter ? "recruiter" : "student") {
    case "student":
      return "shadow-inner focus:ring-blue-400";
    case "recruiter":
      return "shadow-inner focus:ring-green-400";
    default:
      return "shadow-inner focus:ring-gray-400";
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className={`text-2xl font-bold text-center mb-4 ${isRecruiter ? "text-green-600" : "text-blue-600"} ${getToggleAnimation()}`}>
          {isRecruiter ? "Recruiter Register" : "Student Register"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRecruiter ? (
            <>
              <input type="text" placeholder="Full Name" value={recruiterName} onChange={(e) => setRecruiterName(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="email" placeholder="Email" value={recruiterEmail} onChange={(e) => setRecruiterEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="password" placeholder="Password" value={recruiterPassword} onChange={(e) => setRecruiterPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="text" placeholder="Company Website" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
            </>
          ) : (
            <>
              <input type="text" placeholder="Full Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="email" placeholder="Email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
              <input type="password" placeholder="Password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`} />
            </>
          )}
          
          <button type="submit" className={`w-full text-white py-2 rounded-lg transition ${isRecruiter ? "bg-green-600" : "bg-blue-600"}`}>
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => setIsRecruiter(!isRecruiter)} className={`${isRecruiter ? "text-green-600" : "text-blue-600"}`}>
            {isRecruiter ? "Register as Student" : "Register as Recruiter"}
          </button>
          <p className="mt-4 text-gray-600">
            Already have an account? <a href="/login" className={`${isRecruiter ? "text-green-600" : "text-blue-600"}`}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
