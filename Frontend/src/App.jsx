import React from "react";
import Login_Patient from "./pages/login_pateint";
import Signup_Patient from "./pages/signup_pateint";
import PatientHome from "./pages/patient_home";
import Doctor_Login from "./pages/doctor_login";
import Doctor_Signup from "./pages/doctor_signup";
import Vita from "./pages/vita";
// import Footer from "./components/Footer";
import Doctorhome from "./pages/Doctor_home";
import Home from "./pages/home";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppointmentsList from "./pages/AppointmentsList";
import DoctorAppointments from "./pages/DoctorAppointments";
import PatientAppointments from "./pages/PatientAppointments";
import "./App.css";
import Alldoctors from "./pages/Alldoctors";
import BlogForm from "./pages/BlogForm";
import ViewBlog from "./components/viewBlog";
import MyBlogs from "./pages/MyBlogs";
import PatientProfile from "./pages/PatientProfile";
import DoctorDashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/login" element={<Login_Patient />} />
        <Route path="/patient/signup" element={<Signup_Patient />} />
        <Route path="/doctor/login" element={<Doctor_Login />} />
        <Route path="/doctor/signup" element={<Doctor_Signup />} />
        {/* <Route path="/login" element={<Footer />} /> */}
        <Route path="/patient/home" element={<PatientHome />} />
        <Route path="/doctor/home" element={<Doctorhome />} />
        <Route path="/doctor/Vita" element={<Vita />} />
        <Route path="/patient/Vita" element={<Vita />} />
        <Route
          path="/doctor/home/appointments"
          element={<AppointmentsList />}
        />
        <Route
          path="/doctor/home/patientRecords"
          element={<DoctorAppointments />}
        />
        <Route
          path="/patient/home/appintmentupdates"
          element={<PatientAppointments />}
        />
        <Route path="/patient/home/alldoctors" element={<Alldoctors />} />
        <Route path="/patient/home/alldoctors" element={<Alldoctors />} />
        <Route path="/doctor/BlogForm" element={<BlogForm />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/doctor/my-blogs" element={<MyBlogs />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </>
  );
}

export default App;
