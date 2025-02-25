import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get("http://localhost:8080/student/profile", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/student/profile", user, { withCredentials: true })
      .then((response) => setMessage("Profile updated successfully!"))
      .catch((error) => setMessage("Error updating profile."));
  };

  const changePassword = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/student/change-password", passwords, { withCredentials: true })
      .then(() => setMessage("Password updated successfully!"))
      .catch(() => setMessage("Error changing password."));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Settings & Security</h2>

      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={updateProfile} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleProfileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleProfileChange}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleProfileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Update Profile
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-4">Change Password</h3>
      <form onSubmit={changePassword} className="space-y-4">
        <div>
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
