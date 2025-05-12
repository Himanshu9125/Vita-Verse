import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ServiceImg from "../assets/service.png";
import Blogs from "../components/Blog";
import ContactPage from "../components/contact";
import Vita from "../pages/vita";
import { usePatientContext } from "../context/patientContext";

const PatientHome = () => {
  // Refs for scrolling to sections
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);

  // Context and navigation
  const { formData } = usePatientContext();
  const navigate = useNavigate();

  // Scroll to section function
  const scrollToSection = (section) => {
    const refMap = {
      hero: heroRef,
      services: servicesRef,
      blogs: blogsRef,
      contact: contactRef,
    };

    refMap[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Service cards data
  const serviceCards = [
    {
      title: "Vita Prediction",
      description: "Heart health and wellness tracking and predictions.",
      link: "/doctor/Vita",
    },
    {
      title: "India Sucides Visualization",
      description: "Shows the sucide in Indian states",
      link: null,
    },
    {
      title: "Appointment",
      description: "Schedule and manage your healthcare appointments.",
      link: "/patient/home/appintmentupdates",
    },
    {
      title: "Doctor",
      description: "Find and connect with healthcare professionals.",
      link: "/patient/home/alldoctors",
    },
  ];

  // Hero section images with captions
  const heroImages = [
    {
      url: "https://as2.ftcdn.net/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.webp",
      alt: "Healthcare Professional",
      caption: "Professional Care",
    },
    {
      url: "https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg",
      alt: "Medical Consultation",
      caption: "Expert Consultation",
    },
    {
      url: "https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg",
      alt: "Medical Team",
      caption: "Dedicated Team",
    },
  ];

  // Hero section quotes
  const inspirationalQuotes = [
    "You are braver than you believe, stronger than you seem and smarter than you think.",
    "Your health is an investment, not an expense.",
    "Take care of your body. It's the only place you have to live.",
  ];

  // State for image carousel
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = React.useState(0);

  // Auto-advance carousel
  React.useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % inspirationalQuotes.length
      );
    }, 7000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  // Handle manual image navigation
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-green-100 to-blue-400">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar scrollToSection={scrollToSection} />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="min-h-screen flex items-center pt-20">
        <div className="w-full px-6 py-12">
          <div className="flex flex-col md:flex-row w-full p-6 border-4 rounded-3xl mx-4 md:mx-10 bg-white shadow-xl">
            {/* Left side: Quotes */}
            <div className="text-center md:text-left md:flex md:flex-col md:justify-center md:w-1/2 w-full p-6 md:p-12 space-y-6">
              <div className="relative overflow-hidden h-40">
                {inspirationalQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`absolute w-full transition-all duration-1000 transform ${
                      index === currentQuoteIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-16"
                    }`}
                  >
                    <p className="md:text-3xl text-xl font-bold text-black">
                      {quote}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center md:justify-start space-x-2 pt-6">
                {inspirationalQuotes.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentQuoteIndex
                        ? "bg-blue-600 w-6"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentQuoteIndex(index)}
                    aria-label={`Quote ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => scrollToSection("services")}
                >
                  Explore Services
                </button>
              </div>
            </div>

            {/* Right side: Image Carousel */}
            <div className="md:w-1/2 w-full p-6 md:p-8 relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-full h-full transition-all duration-700 transform ${
                      index === currentImageIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentImageIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                      <p className="font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation arrows */}
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-black transition-all"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prevIndex) =>
                        (prevIndex - 1 + heroImages.length) % heroImages.length
                    )
                  }
                >
                  ◀
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-black transition-all"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prevIndex) => (prevIndex + 1) % heroImages.length
                    )
                  }
                >
                  ▶
                </button>
              </div>

              {/* Image indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-blue-600 w-6"
                        : "bg-gray-300"
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="py-12 md:py-20">
        <h2 className="text-4xl font-bold text-center md:justify-center md:items-center md:text-end md:pr-100 text-black drop-shadow-md mb-8">
          Welcome to our Health Services
        </h2>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center px-6">
            <img
              src={ServiceImg}
              alt="Health Services"
              className="w-full md:w-4/5 -scale-x-100 p-4"
            />
          </div>

          {/* Service Cards */}
          <div className="w-full md:w-1/2 flex flex-col md:items-end items-center px-8 space-y-6 py-8">
            {serviceCards.map((service, index) =>
              service.link ? (
                <Link
                  key={index}
                  to={service.link}
                  className="bg-white shadow-md rounded-lg p-5 w-full md:w-2/3 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </Link>
              ) : (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-5 w-full md:w-2/3 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div ref={blogsRef} className="py-12">
        <h2 className="text-4xl text-center font-bold text-black drop-shadow-md mb-10">
          Welcome to our Blogs
        </h2>
        <div className="px-4">
          <Blogs />
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-8">
        <h2 className="text-4xl text-center font-bold text-black drop-shadow-md mb-6">
          Contact Us
        </h2>
        <ContactPage />
      </div>

      <Footer />
    </div>
  );
};

export default PatientHome;
