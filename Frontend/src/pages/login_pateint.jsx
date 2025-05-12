import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo .png"; // Adjust the path as necessary
import axios from "axios";
import { usePatientContext } from "../context/patientContext";
import toast from "react-hot-toast";

const Login_Patient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [patient, setPatient] = useState({});
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = usePatientContext();
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && window.VANTA && window.VANTA.WAVES) {
      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundAlpha: 0.8,
        color1: 0x00bfff,
        color2: 0xff6f61,
        birdSize: 1.5,
        quantity: 3,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const patientData = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/patients/login`,
        patientData
      );

      const data = response.data;

      if (data?.Patient) {
        const normalizedData = {
          firstName: data.Patient.name.firstname,
          lastName: data.Patient.name.lastname,
          email: data.Patient.email,
          age: data.Patient.age,
          id: data.Patient.id,
          gender: data.Patient.gender,
        };
        setFormData(normalizedData);
        localStorage.setItem("patientData", JSON.stringify(normalizedData));
        localStorage.setItem("token", data.token);

        toast.success("Login successful!");
        navigate("/patient/home");
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div
      ref={vantaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
      {/* Login Box */}

      <div className="relative z-10 w-full max-w-md p-8 bg-gradient-to-br  from-white/30 to-blue-200/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
            Login as <span className="text-blue-200">Patient</span>
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Are you a doctor?{" "}
            <Link
              to="/doctor/login"
              className="text-blue-300 hover:text-white font-semibold underline transition duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
        <form onSubmit={submitHandler} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-black mt-4">
          Don't have an account?{" "}
          <Link to="/patient/signup" className="text-blue-800 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login_Patient;
