import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { Bell, LogOut, User, ChevronDown } from "lucide-react";
import { usePatientContext } from "../context/patientContext";
import Logo from "../assets/Logo4.png";
import Profile from "../assets/user.svg";

const Navbar = ({ scrollToSection }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for click outside detection
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Context and navigation
  const navigate = useNavigate();
  const { formData } = usePatientContext();

  // Navigation menu items
  const menuItems = [
    { name: "Home", ref: "hero", icon: "🏠" },
    { name: "Services", ref: "services", icon: "🩺" },
    { name: "Blogs", ref: "blogs", icon: "📰" },
    { name: "Contact", ref: "contact", icon: "📞" },
  ];

  // Sample notifications - replace with actual data fetching
  useEffect(() => {
    // Simulate fetching notifications
    const sampleNotifications = [
      {
        id: 1,
        title: "Appointment Confirmed",
        message:
          "Your appointment with Dr. Smith has been confirmed for tomorrow at 2:00 PM",
        time: "2 hours ago",
        isRead: false,
      },
      {
        id: 2,
        title: "New Message",
        message: "You have a new message from your doctor",
        time: "Yesterday",
        isRead: true,
      },
      {
        id: 3,
        title: "Lab Results",
        message: "Your lab results are now available",
        time: "2 days ago",
        isRead: false,
      },
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter((n) => !n.isRead).length);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Handle menu item click
  const handleMenuClick = (ref) => {
    scrollToSection(ref);
    setIsOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    // Add any logout logic here
    navigate("/patient/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-12 w-12 rounded-full overflow-hidden border-2 border-green-500 shadow-md transition-all ${
                isScrolled ? "scale-90" : "scale-100"
              }`}
            >
              <img
                src={Logo}
                alt="Health App Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-lg text-green-600 hidden md:block">
              HealthCare
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => handleMenuClick(item.ref)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="hidden lg:inline">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section - Notifications & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                  <div className="p-3 bg-green-50 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-green-800">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        className="text-xs text-green-600 hover:text-green-800"
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n) => ({ ...n, isRead: true }))
                          );
                          setUnreadCount(0);
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <ul className="divide-y">
                        {notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                              notification.isRead ? "bg-white" : "bg-blue-50"
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-800">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t bg-gray-50">
                    <button
                      className="w-full text-center text-sm text-gray-600 hover:text-green-600 p-1"
                      onClick={() => navigate("/patient/notifications")}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
                aria-label="User profile"
              >
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={Profile}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <ChevronDown size={16} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden border">
                        <img
                          src={Profile}
                          alt="User Profile"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {formData?.firstName && formData?.lastName
                            ? `${formData.firstName} ${formData.lastName}`
                            : "Guest User"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formData?.email || "Not logged in"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() =>
                            navigate("/patient/profile")
                          }
                          className="flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-100"
                        >
                          <User size={16} />
                          <span>My Profile</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            navigate("/patient/home/appintmentupdates")
                          }
                          className="flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-100"
                        >
                          <span className="pl-1">📅</span>
                          <span>My Appointments</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-100 text-red-500"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-2">
            <ul className="space-y-2">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleMenuClick(item.ref)}
                    className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}

              <li className="border-t pt-2 mt-2">
                <button
                  onClick={() => navigate("/patient/notifications")}
                  className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100"
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/patient/profile")}
                  className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100"
                >
                  <User size={18} className="mr-3" />
                  <span>My Profile</span>
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100 text-red-500"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
