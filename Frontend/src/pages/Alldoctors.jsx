import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePatientContext } from "../context/patientContext";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData] = usePatientContext();

  const bookHandler = async (doctor) => {
    const appointmentData = {
      doctorId: doctor._id,
      doctorName: `${doctor.name?.firstName || ""} ${
        doctor.name?.lastName || ""
      }`,
      doctorEmail: doctor.email || "",

      patientId: formData?.id || "",
      patientName: `${formData?.firstName || ""} ${formData?.lastName || ""}`,
      patientEmail: formData?.email || "",
      status: "pending",
    };

    console.log(appointmentData);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/makeAppointment`,
        appointmentData
      );
      alert("Appointment booked successfully!");
      // Update booking status for this specific doctor
      setBookingStatus((prev) => ({
        ...prev,
        [doctor._id]: "Booking Pending",
      }));
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book appointment. Please try again.");
    }
  };

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/doctors/all`
        );
        // Axios already returns JSON data, no need for response.json()
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-gray-100">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
          Available Doctors
        </span>
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Our highly qualified healthcare professionals are ready to provide you
        with exceptional care. Book an appointment with one of our specialists
        today.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-blue-100"
            >
              {/* Doctor Avatar/Image Placeholder */}
              <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold">
                  {doctor.name && doctor.name.firstName
                    ? doctor.name.firstName.charAt(0)
                    : "D"}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Dr.{" "}
                  {doctor.name && doctor.name.firstName
                    ? doctor.name.firstName
                    : ""}{" "}
                  {doctor.name && doctor.name.lastName
                    ? doctor.name.lastName
                    : ""}
                </h3>
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {doctor.specialization || "General Medicine"}
                  </span>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>{doctor.experience || "N/A"} Years Experience</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>{doctor.availability || "Available on request"}</span>
                  </div>
                </div>
                <button
                  className={`mt-6 w-full ${
                    bookingStatus[doctor._id]
                      ? "bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300`}
                  onClick={() => bookHandler(doctor)}
                >
                  {bookingStatus[doctor._id] || "Book Appointment"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No doctors available</p>
      )}
    </div>
  );
};

export default AllDoctors;
