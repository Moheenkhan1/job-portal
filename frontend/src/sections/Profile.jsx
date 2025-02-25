import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/student/profile", { withCredentials: true })
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
      .put("http://localhost:8080/student/profile/update", formData, { withCredentials: true })
      .then((response) => alert("Profile updated successfully!"))
      .catch((error) => alert("Failed to update profile"));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
