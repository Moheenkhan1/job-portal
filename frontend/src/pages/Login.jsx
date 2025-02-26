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
      const response = await axios.post(apiUrl, { email, password },{ withCredentials: true });
      const { token, user } = response.data;

      if (response.status === 200) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", user.role);


        if (userType === "student") navigate("/");
        else if (userType === "recruiter") navigate("/recruiterdashboard");
        else if (userType === "admin") navigate("/admindashboard");
        // Redirect or handle success (store token, navigate, etc.)
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials.");
    }
  };

  const getTextColor = () => {
    switch (userType) {
      case "student":
        return "text-blue-500";
      case "recruiter":
        return "text-green-500";
      case "admin":
        return "text-red-500";
      default:
        return "text-gray-100";
    }
  };


  const getButtonColor = () => {
    switch (userType) {
      case "student":
        return "bg-blue-500 hover:scale-102 shadow-lg";
      case "recruiter":
        return "bg-green-500 hover:scale-102 shadow-lg";
      case "admin":
        return "bg-red-500 hover:scale-102 shadow-lg";
      default:
        return "bg-gray-400";
    }
  };
  
  const getInputShadow = () => {
    switch (userType) {
      case "student":
        return "shadow-inner focus:ring-blue-400";
      case "recruiter":
        return "shadow-inner focus:ring-green-400";
      case "admin":
        return "shadow-inner focus:ring-red-400";
      default:
        return "shadow-inner focus:ring-gray-400";
    }
  };

  const getToggleAnimation = () => {
    switch (userType) {
      case "student":
        return "animate-bounce text-blue-500";
      case "recruiter":
        return "animate-bounce text-green-500";
      case "admin":
        return "animate-bounce text-red-500";
      default:
        return "";
    }
  };
  



  return (
    <div className={`min-h-screen flex items-center justify-center p-6 `}>
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <h2 className={`text-2xl font-bold text-center mb-4 transition-all ${getTextColor()} ${getToggleAnimation()}`}>
        {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`}
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${getInputShadow()}`}
            placeholder="••••••"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded-lg transition ${getButtonColor()}`}
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
              userType === "recruiter" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Recruiter
          </button>
          <button
            onClick={() => setUserType("admin")}
            className={`px-4 py-2 rounded-lg ${
              userType === "admin" ? "bg-red-500 text-white" : "bg-gray-200"
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
