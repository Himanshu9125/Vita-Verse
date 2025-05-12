import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDoctorContext } from "../context/doctorContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorformData] = useDoctorContext();

  const profileImage =
    doctorData?.profileImage ||
    "https://randomuser.me/api/portraits/men/75.jpg";

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Replace with actual backend logic or auth context
        const email = doctorformData.email;
        const id = doctorformData.id;

        const profileRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/doctors/${id}`
        );
        setDoctorData(profileRes.data);

        const apptRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/appointment/doctor/${email}`
        );
        setAppointments(apptRes.data);
      } catch (error) {
        console.error("Failed to fetch doctor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Doctor Dashboard
      </h1>
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6 mb-10">
        <img
          src={profileImage}
          alt="Doctor"
          className="w-24 h-24 rounded-full border-4 border-blue-300 object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Dr. {doctorData.name.firstName} {doctorData.name.lastName}
          </h2>
          <p className="text-gray-600">{doctorData.specialization}</p>
          <p className="text-gray-500">{doctorData.email}</p>
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-blue-800">Appointments</p>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-green-800">Patients</p>
          <p className="text-2xl font-bold">
            {[...new Set(appointments.map((a) => a.patientEmail))].length}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-yellow-800">Pending</p>
          <p className="text-2xl font-bold">
            {appointments.filter((a) => a.status === "pending").length}
          </p>
        </div>
      </div>
      {/* Recent Appointments */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Appointments
        </h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appt, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{appt.patientName}</td>
                    <td className="p-3">{appt.patientEmail}</td>
                    <td className="p-3 capitalize font-medium text-sm">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          appt.status === "confirmed"
                            ? "bg-green-200 text-green-800"
                            : appt.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
