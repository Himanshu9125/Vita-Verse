import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePatientContext } from "../context/patientContext";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [formData] = usePatientContext();
  const navigate = useNavigate();

  const profileImage =
    formData?.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (formData?.id) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/appointment/patient/${
              formData.email
            }`
          );
          setAppointments(response.data);
        }
      } catch (err) {
        setError("Failed to load appointment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [formData]);

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  if (!formData) {
    return (
      <div className="text-center text-gray-500 py-4">
        No patient data found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Patient Profile
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-300 shadow-md"
        />
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-8">
        <p>
          <span className="font-semibold text-gray-600">Name:</span>{" "}
          {formData.firstName}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Age:</span>{" "}
          {formData.age}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Gender:</span>{" "}
          {formData.gender}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Email:</span>{" "}
          {formData.email}
        </p>
      </div>

      {/* Appointment History */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Appointment History
        </h3>

        {loading ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500">No past appointments found.</p>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appt, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800">
                  <span className="font-medium">Doctor:</span>{" "}
                  <span className="text-blue-600 font-semibold">
                    Dr. {appt.doctorName}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {appt.doctorEmail}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      appt.status === "confirmed"
                        ? "text-green-600"
                        : appt.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
