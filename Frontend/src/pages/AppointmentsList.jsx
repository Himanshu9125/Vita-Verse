import React, { useState, useEffect } from "react";
import AppointmentCard from "../components/appointment_card";
import { useDoctorContext } from "../context/doctorContext";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorFormData] = useDoctorContext();

  const fetchAppointments = async () => {
    try {
      if (!doctorFormData?.email) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/doctor/${
          doctorFormData.email
        }`
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorFormData]);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/${id}`,
        { status: "accepted" }
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "accepted" } : appt
        )
      );

      // Show success message
      alert("Appointment accepted successfully!");
    } catch (error) {
      console.error("Error accepting appointment:", error);
      alert("Failed to accept appointment. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/${id}`,
        { status: "rejected" }
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "rejected" } : appt
        )
      );

      // Show success message
      alert("Appointment rejected successfully!");
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      alert("Failed to reject appointment. Please try again.");
    }
  };

  // Filter appointments by status
  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "pending"
  );
  const completedAppointments = appointments.filter(
    (appt) => appt.status === "accepted"
  );
  const rejectedAppointments = appointments.filter(
    (appt) => appt.status === "rejected"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Appointment Management
      </h1>

      {/* Pending Appointments */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Pending Appointments
        </h2>
        {pendingAppointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingAppointments.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appointment={appt}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No pending appointments.</p>
        )}
      </div>

      {/* Completed Appointments */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Accepted Appointments
        </h2>
        {completedAppointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No completed appointments.</p>
        )}
      </div>

      {/* Rejected Appointments */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Rejected Appointments
        </h2>
        {rejectedAppointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rejectedAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No rejected appointments.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
