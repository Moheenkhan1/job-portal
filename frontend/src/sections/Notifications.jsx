import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios
      .get("http://localhost:8080/student/notifications", { withCredentials: true })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => setLoading(false));
  };

  const markAsRead = (id) => {
    axios
      .put(`http://localhost:8080/student/notifications/${id}/read`, {}, { withCredentials: true })
      .then(() => {
        setNotifications(notifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        ));
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  if (loading) return <p className="text-center text-gray-600">Loading notifications...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Notifications & Alerts</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No new notifications.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className={`p-4 border rounded-lg mb-4 ${notification.read ? "bg-gray-200" : "bg-yellow-100"}`}
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-gray-700">{notification.message}</p>
            <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</p>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
