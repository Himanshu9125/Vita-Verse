import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo .png"; // Adjust the path as necessary
import { usePatientContext } from "../context/patientContext";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";
// import { use } from "react";

const Signup_Patient = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [formData, setFormData] = usePatientContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // clear any old error
    setError("");

    const newPatient = {
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      age: age,
      gender: gender,
    };

    console.log("Submitting to server:", newPatient);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/patients/register`,
        newPatient
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/patient/home");
      }
    } catch (err) {
      console.error("Server rejected:", err.response?.data);
      setError(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data) ||
          "Signup failed. Please check your input."
      );
    }
  };

  useEffect(() => {
    let vantaEffect;
    if (window.VANTA && window.VANTA.WAVES) {
      vantaEffect = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3b82f6, // optional: Tailwind's blue-500
        shininess: 50,
        waveHeight: 15,
        waveSpeed: 0.5,
        zoom: 0.75,
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute top-5 left-5 h-20 w-20"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="Logo"
          className="rounded-full hover:shadow-[0_4px_20px_rgba(0,255,0,0.4)] h-full w-full object-contain"
        />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 bg-gradient-to-br hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] from-white/30 to-blue-200/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Patient Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-black mb-1 block">
                First Name
              </label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="John"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-sm text-black mb-1 block">Last Name</label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Doe"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-black mb-1 block">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-black mb-1 block">Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-black mb-1 block">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-black mb-1 block">Age</label>
            <div className="relative">
              <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                placeholder="18"
                required
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-black mb-1 block">Gender</label>
            <div className="relative">
              <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
              <select
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className=" mt-4 text-[12px] flex gap-20">
          <p className="  text-black mt-4">
            Already have an account?{" "}
            <Link to="/patient/login" className="text-blue-800 underline">
              Login
            </Link>
          </p>
          <p className="  text-black mt-4">
            <Link to="/doctor/signup" className="text-blue-800 underline">
              Signup as a doctor?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup_Patient;
