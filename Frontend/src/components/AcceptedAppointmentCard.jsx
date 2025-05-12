import React from "react";

const AcceptedAppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-shadow">
      <div>
        <h3 className="text-xl font-bold text-green-700">
          Appointment with {appointment.patientName}
        </h3>
        <p className="text-gray-600">
          <strong>Patient Email:</strong> {appointment.patientEmail}
        </p>
        {appointment.date && (
          <p className="text-gray-600">
            <strong>Date:</strong>{" "}
            {new Date(appointment.date).toLocaleDateString()}
          </p>
        )}
        {appointment.time && (
          <p className="text-gray-600">
            <strong>Time:</strong> {appointment.time}
          </p>
        )}
        {appointment.notes && (
          <p className="text-gray-600">
            <strong>Notes:</strong> {appointment.notes}
          </p>
        )}
      </div>
      <span className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full mt-3 md:mt-0">
        Completed
      </span>
    </div>
  );
};

export default AcceptedAppointmentCard;
