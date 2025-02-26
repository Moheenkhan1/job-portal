import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdCreate } from "react-icons/io"; // Edit icon
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/student/profile`, { withCredentials: true })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("resume", profile.resume);

    axios
      .put(`${API_BASE_URL}/student/profile/update`, formData, { withCredentials: true })
      .then((response) => alert("Profile updated successfully!"))
      .catch((error) => alert("Failed to update profile"));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg mb-6 fixed">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Profile Management
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field with Edit Button */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${
                  !isEditingName ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                disabled={!isEditingName}
              />
              <button
                type="button"
                onClick={() => setIsEditingName(!isEditingName)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
              >
                <IoMdCreate size={20} />
              </button>
            </div>
          </div>

          {/* Email Field (Disabled) */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-white transition-all duration-200"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-white transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Update Profile
          </button>
        </form>
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

export default Profile;
