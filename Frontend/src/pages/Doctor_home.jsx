// Doctorhome.js

import React, { useState, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import DoctorNavbar from "../components/doctor_nav";
import Blogs from "../components/Blog";
import ContactPage from "../components/contact";
import { useDoctorContext } from "../context/doctorContext";
import { href, Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Doctorhome = () => {
  const [rating, setRating] = useState(4);
  const [doctorformData] = useDoctorContext();
  const blogsRef = useRef(null);
  const contactRef = useRef(null);
  const servicesRef = useRef(null);

  const services = [
    {
      title: "Vita Prediction",
      description: "Heart health and wellness.",
      href: "Vita",
    },
    {
      title: "India Sucides Visualization",
      description: "Shows the sucide in Indian states",
      href: "",
    },
    {
      title: "Create Blogs",
      description: "Write blogs and share your experiences",
      href: "BlogForm",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-200">
      <div className="fixed top-0 left-0 w-full z-50">
        <DoctorNavbar />
      </div>

      <div className="pt-24 px-4 sm:px-6">
        {/* Hero Section */}
        <section className="text-center py-10">
          <div className="border-2 hover:border-gray-400 inline-block rounded-3xl px-6 py-2 bg-white hover:shadow-md hover:text-[#4682B6] transition-all duration-300">
            <h1 className="text-2xl font-bold text-gray-800 drop-shadow-md">
              Dr. {doctorformData.firstName + " " + doctorformData.lastName}
            </h1>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">
            Welcome to Vita Verse!
          </h1>
          <div className="flex justify-center items-center space-x-1 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-500" : "text-gray-300"}
              >
                &#9733;
              </span>
            ))}
            <span className="text-gray-600">({rating}/5.0)</span>
          </div>
          <p className="text-base text-gray-600 mt-4 mx-auto max-w-lg">
            Manage your appointments, view patient details, and collaborate with
            the health team.
          </p>
        </section>

        {/* Services Section */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/doctor/home/appointments"
            className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Appointments
            </h2>
            <p className="text-gray-600 mt-2">
              View and manage upcoming appointments.
            </p>
          </Link>
          <Link
            to={"/doctor/home/patientRecords"}
            className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Patient Records
            </h2>
            <p className="text-gray-600 mt-2">
              Access medical history and prescriptions.
            </p>
          </Link>
        </section>

        {/* Health Services */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-center text-black drop-shadow-md mb-8">
            Welcome to our Health Services
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 flex justify-center ">
              <img
                src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-half-body-doctor-man-cartoon-character-transparent-background-png-image_15979182.png"
                alt="doctor"
                className="w-full h-auto max-w-md object-contain md:-scale-x-100"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col space-y-4 px-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-2xl hover:p-5"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {service.href ? (
                      <a
                        href={service.href}
                        target={
                          service.href.endsWith(".html") ? "_blank" : "_self"
                        }
                        rel={
                          service.href.endsWith(".html")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {service.title}
                      </a>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                  {/* <FontAwesomeIcon
                    icon="fa-solid fa-chevron-right"
                    className="mr-0"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <div ref={blogsRef} className="mt-16">
          <h2 className="text-3xl text-center font-bold text-black drop-shadow-md mb-6">
            Welcome to our Blogs
          </h2>
          <Blogs />
        </div>

        {/* Contact Section */}
        <div ref={contactRef} className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-black drop-shadow-md mb-6">
            Contact Us
          </h2>
          <ContactPage />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Doctorhome;
