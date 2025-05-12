import React from "react";
// Optional: Add styles for the card component

const Card = ({ title, description }) => {
  return (
    <div className="card bg-green-300 shadow-md rounded-lg ">
      <div className="card-content">
        <h3 className="card-title text-lg font-bold text-gray-800">{title}</h3>
        <p className="card-description text-gray-600">{description}</p>
      </div>
    </div>
  );
};


export default { Card };
