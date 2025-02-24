import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("student"); // "student", "recruiter", "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else setEmailError("");

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else setPasswordError("");

    if (!isValid) return;

    // Define API endpoint based on user type
    let apiUrl = "";
    if (userType === "student") apiUrl = `${API_BASE_URL}/auth/student/login`;
    else if (userType === "recruiter") apiUrl = `${API_BASE_URL}/auth/recruiter/login`;
    else if (userType === "admin") apiUrl = `${API_BASE_URL}/auth/admin/login`;

    try {
      const response = await axios.post(apiUrl, { email, password });

      if (response.status === 200) {
        // alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Login Successful!`);
        if(userType==admin){
            navigate('/admindashboard')
        }else if(userType==student){
            navigate('/userdashboard')
        }else{
            navigate('/recruiterdashboard')
        }
        // Redirect or handle success (store token, navigate, etc.)
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="your@email.com"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="••••••"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* User Type Toggle */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Login as:</p>
          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={() => setUserType("student")}
              className={`px-4 py-2 rounded-lg ${
                userType === "student" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType("recruiter")}
              className={`px-4 py-2 rounded-lg ${
                userType === "recruiter" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Recruiter
            </button>
            <button
              onClick={() => setUserType("admin")}
              className={`px-4 py-2 rounded-lg ${
                userType === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
