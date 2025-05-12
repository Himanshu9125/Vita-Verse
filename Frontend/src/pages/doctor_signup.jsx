import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/bg-login.mp4";
import Logo from "../assets/Logo .png";
import axios from "axios";

const Doctor_Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [availability, setAvailability] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const newDoctor = {
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      specialization: specialization,
      email: email,
      password: password,
      experience: experience,
      age: age,
      gender: gender,
      availability: availability,
    };
    

    console.log("Submitting to server:", newDoctor);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/register`,
        newDoctor
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/doctor/home");
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
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

      <div className="relative z-10 w-full max-w-md p-8 bg-gradient-to-br from-blue-400/20 to-blue-100/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4 drop-shadow-md">
          Signup as <span className="text-blue-200">Doctor</span>
        </h2>

        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
            />
          </div>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />

          <input
            type="text"
            required
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Specialization"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />

          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Experience (in years)"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />
          <select
            id="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div className="relative">
            <label className="block text-sm text-white font-medium mb-1">
              Availability
            </label>
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="bg-white bg-opacity-90 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            >
              {availability.length > 0
                ? availability.join(", ")
                : "Select available days"}
            </div>

            {showDropdown && (
              <div className="absolute z-10 bg-white w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-300">
                {days.map((day) => (
                  <label
                    key={day}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={availability.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="mr-2"
                    />
                    {day}
                  </label>
                ))}
              </div>
            )}
          </div>

          <input
            type="password"
            minLength="6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />

          <input
            type="password"
            minLength="6"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 border"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Signup
          </button>
        </form>

        <div className="mt-4 text-[12px] flex flex-col gap-1 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/doctor/login" className="underline hover:text-blue-200">
              Login
            </Link>
          </p>
          <p className="text-white">
            <Link
              to="/patient/signup"
              className="underline hover:text-blue-200"
            >
              Signup as a patient?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Doctor_Signup;
