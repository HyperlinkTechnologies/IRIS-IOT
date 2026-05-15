import React from "react";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    // Call the passed logout function
    onLogout();
    // Optionally, clear user session/localStorage
    localStorage.removeItem("userToken");
    console.log("User logged out!");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;