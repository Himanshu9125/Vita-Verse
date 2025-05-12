import React, { useState, useEffect } from "react";
import AppointmentCard from "../components/appointment_card";
import AcceptedAppointmentCard from "../components/AcceptedAppointmentCard";
import axios from "axios";
import { useDoctorContext } from "../context/doctorContext";
import CompleteCard from "../components/CompleteCard";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorFormData] = useDoctorContext();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
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
      setError("Failed to load appointments. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorFormData]);

   const handleComplete = async (id) => {
     try {
       await axios.put(
         `${import.meta.env.VITE_BASE_URL}/api/appointment/${id}`,
         { status: "completed" }
       );

       // Update local state
       setAppointments((prev) =>
         prev.map((appt) =>
           appt._id === id ? { ...appt, status: "completed" } : appt
         )
       );

       // Show success message
       alert("Appointment completed successfully!");
     } catch (error) {
       console.error("Error accepting appointment:", error);
       alert("Failed to accept appointment. Please try again.");
     }
   };

  

      
  // Filter appointments by status
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "accepted"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const rejectedAppointments = appointments.filter(
    (appointment) => appointment.status === "rejected"
  );

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-100 flex justify-center items-center">
        <p className="text-xl text-blue-800">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-100 flex justify-center items-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-100">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Manage Appointments
      </h2>

      {/* Pending Appointments */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Running</h3>
        <div className="space-y-4">
          {pendingAppointments.length === 0 ? (
            <p className="text-gray-500">No pending appointments.</p>
          ) : (
            pendingAppointments.map((appointment) => (
              <CompleteCard
                key={appointment._id}
                appointment={appointment}
                onComplete={() => handleComplete(appointment._id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Completed Appointments */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Completed</h3>
        <div className="space-y-4">
          {completedAppointments.length === 0 ? (
            <p className="text-gray-500">No completed appointments.</p>
          ) : (
            completedAppointments.map((appointment) => (
              <AcceptedAppointmentCard
                key={appointment._id}
                appointment={appointment}
              />
            ))
          )}
        </div>
      </div>

      {/* Rejected Appointments */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Rejected</h3>
        <div className="space-y-4">
          {rejectedAppointments.length === 0 ? (
            <p className="text-gray-500">No rejected appointments.</p>
          ) : (
            rejectedAppointments.map((appointment) => (
              <CompleteCard key={appointment._id} appointment={appointment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
