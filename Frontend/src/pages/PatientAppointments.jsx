import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePatientContext } from "../context/patientContext";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData] = usePatientContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!formData?.email) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/appointment/patient/${
            formData.email
          }`
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [formData]);

  const running = appointments.filter((a) => a.status === "pending");
  const completed = appointments.filter((a) => a.status === "completed");

  const renderCard = (appt) => (
    <div
      key={appt._id}
      className="bg-white shadow-md rounded-md p-4 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-blue-700 mb-1">
        Appointment with Dr. {appt.doctorName || "Unknown"}
      </h3>

      <p className="text-sm text-gray-700 mb-0.5">
        <strong>Doctor Email:</strong> {appt.doctorEmail || "N/A"}
      </p>

      <p className="text-sm text-gray-700 mb-0.5">
        <strong>Patient:</strong> {appt.patientName || "N/A"}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Patient Email:</strong> {appt.patientEmail || "N/A"}
      </p>

      {appt.date ? (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}
          {appt.time && (
            <>
              {" "}
              | <strong>Time:</strong> {appt.time}
            </>
          )}
        </p>
      ) : (
        <p className="text-sm text-gray-600 mb-1">Date & Time: Not Scheduled</p>
      )}

      <p
        className={`text-xs font-medium text-white ${
          appt.status === "pending" ? "bg-blue-500" : "bg-green-600"
        } inline-block px-2 py-0.5 rounded`}
      >
        Status: {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-100">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        My Appointments
      </h2>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : (
        <>
          {/* Running Appointments */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Running
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {running.length > 0 ? (
                running.map(renderCard)
              ) : (
                <p className="text-gray-500">No running appointments.</p>
              )}
            </div>
          </div>

          {/* Completed Appointments */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Completed
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {completed.length > 0 ? (
                completed.map(renderCard)
              ) : (
                <p className="text-gray-500">No completed appointments.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientAppointments;
