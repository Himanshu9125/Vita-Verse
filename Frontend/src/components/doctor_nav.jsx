import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo4.png";
import Profile from "../assets/user.svg";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, FileText } from "lucide-react";
import { useDoctorContext } from "../context/doctorContext";

const DoctorNavbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState([]);
  const [notification, setNotification] = useState(false);
  const [doctorformData] = useDoctorContext();
  const [flag, setFlag] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef();
  const notificationRef = useRef();
  const menuRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menu = [
    {
      name: "Dashboard",
      route: "/doctor/dashboard",
      icon: "🏠",
    },
    {
      name: "My Blogs",
      route: "/doctor/my-blogs",
      icon: <FileText size={16} />,
    },
    {
      name: "Create Blog",
      route: "/doctor/BlogForm",
      icon: "✏️",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setFlag(false); // Hide profile info
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotification(false); // Hide notification panel
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Hide menu panel
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
    setIsOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Add any logout logic here (clear localStorage, context, etc.)
    navigate("/doctor/login");
    setFlag(false);
  };

  return (
    <div className="shadow-md sticky top-0 z-50 bg-white">
      <nav className="bg-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="h-14 w-14 cursor-pointer"
              onClick={() => navigate("/doctor/dashboard")}
            >
              <img
                src={Logo}
                alt="Logo"
                className="rounded-full h-full w-full object-contain border-2 border-white shadow-md"
              />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-800 hidden md:block">
              Doctor Portal
            </h1>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 text-3xl focus:outline-none"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-1 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <span>Menu</span>
                <span className="text-xs">▼</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
                  {menu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigation(item.route)}
                      className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        isActive(item.route)
                          ? "bg-gray-100 text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center ml-4">
              <button
                onClick={() => {
                  setNotification((prev) => !prev);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <div ref={notificationRef}>
                  <Bell size={24} color="black" />
                  {newAppointment.length > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-green-500"></span>
                  )}
                </div>
              </button>

              <div ref={profileRef} className="relative ml-2">
                <div
                  className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer"
                  onClick={() => setFlag(!flag)}
                >
                  <img
                    src={Profile}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {flag && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 text-sm w-64 z-50">
                    <div className="mb-4 border-b pb-2">
                      {doctorformData?.firstName &&
                        doctorformData?.lastName && (
                          <h3 className="font-bold text-lg">
                            Dr. {doctorformData.firstName}{" "}
                            {doctorformData.lastName}
                          </h3>
                        )}
                      {doctorformData?.email && (
                        <h4 className="text-gray-600 mt-1">
                          {doctorformData.email}
                        </h4>
                      )}
                      {doctorformData?.specialization && (
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">
                          {doctorformData.specialization}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate("/doctor/profile");
                          setFlag(false);
                        }}
                        className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                      >
                        Profile Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-red-600 hover:bg-red-50 p-2 rounded font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 border-t pt-4">
            <div className="flex items-center px-4 pb-4 border-b">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={Profile}
                  alt="User Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {doctorformData.firstName} {doctorformData.lastName}
                </p>
                <p className="text-sm text-gray-600">{doctorformData.email}</p>
              </div>
            </div>

            <ul className="mt-2">
              {menu.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavigation(item.route)}
                    className={`flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 ${
                      isActive(item.route)
                        ? "bg-gray-100 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <span className="mr-3">🚪</span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {notification && (
        <div className="absolute top-20 right-10 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
          <h2 className="font-semibold mb-2 text-gray-800">Notifications</h2>
          <ul className="space-y-2">
            {newAppointment.length > 0 ? (
              newAppointment.map((item, i) => (
                <li key={i} className="border-b pb-2">
                  <div className="text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2 text-center">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorNavbar;
