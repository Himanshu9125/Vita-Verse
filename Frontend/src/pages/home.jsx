import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo .png";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const vantaRef = React.useRef(null);
  //   const [vanta, setVanta] = useState(null);
  useEffect(() => {
    let vantaEffect;
    if (window && window.VANTA && window.VANTA.DOTS) {
      vantaEffect = window.VANTA.DOTS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center  relative overflow-hidden"
    >
      <div
        className="absolute top-5 left-5 h-20 w-20"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="Logo"
          className="rounded-full  h-full w-full object-contain"
        />
      </div>

      <p className="text-4xl md:text-5xl text-center font-extrabold text-white z-10 drop-shadow-lg tracking-wide font-['Chakra Petch']">
        Welcome to <span className="text-green-300">Vita Verse</span>
      </p>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-200-600 opacity-50"></div>
      <Link
        to="/patient/login"
        className="group absolute inline-flex  bottom-10 right-1/5 transform -translate-x-1/2 px-6 py-2 font-semibold rounded-full overflow-hidden border-2  border-white text-white transition-all duration-50 shadow-lg"
      >
        <span className="absolute inset-0 w-0 bg-white transition-all duration-300  ease-out group-hover:w-full"></span>
        <span className="relative z-10 text-lg font-semibold group-hover:text-green-600 transition-colors duration-300">
          Get Started As Patient
        </span>

        <span className=" z-10 text-2xl font-extrabold m-0.5 group-hover:text-green-600 transition-colors duration-300 transform group-hover:translate-x-1">
          <GoArrowRight className="hidden group-hover:block" />
        </span>
      </Link>
      <Link
        to="/doctor/login"
        className="group absolute  md:inline-flex bottom-10 left-[38%] transform -translate-x-1/2 px-6 py-2 font-semibold rounded-full overflow-hidden border-2 border-white  text-white transition-all duration-50 shadow-lg"
      >
        <span className="absolute inset-0 w-0 bg-white transition-all duration-300  ease-out group-hover:w-full"></span>
        <span className="relative z-10 text-lg font-semibold group-hover:text-green-600 transition-colors duration-300">
          Get Started As Doctor
        </span>

        <span className=" z-10 text-2xl font-extrabold m-0.5 group-hover:text-green-600 transition-colors duration-300 transform group-hover:translate-x-1">
          <GoArrowRight className="hidden group-hover:block" />
        </span>
      </Link>
    </div>
  );
};

export default Home;
