import React from "react";

const AppointmentCard = ({ appointment, onAccept, onReject }) => {
  // Determine the status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          Appointment Details
        </h3>

        <p className="text-gray-700 text-sm mb-1">
          <strong>Patient Name:</strong> {appointment.patientName}
        </p>

        <p className="text-gray-700 text-sm mb-1">
          <strong>Patient Email:</strong> {appointment.patientEmail}
        </p>

        {appointment.date && (
          <p className="text-gray-700 text-sm mb-1">
            <strong>Date:</strong>{" "}
            {new Date(appointment.date).toLocaleDateString()}
          </p>
        )}

        {appointment.time && (
          <p className="text-gray-700 text-sm mb-1">
            <strong>Time:</strong> {appointment.time}
          </p>
        )}

        <p
          className={`mt-2 text-sm inline-block px-3 py-1 rounded-full font-medium ${getStatusBadgeClass(
            appointment.status
          )}`}
        >
          Status: {appointment.status}
        </p>
      </div>

      {appointment.status === "pending" && onAccept && onReject && (
        <div className="mt-4 md:mt-0 md:ml-6 flex gap-3">
          <button
            onClick={() => onAccept(appointment._id)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(appointment._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
