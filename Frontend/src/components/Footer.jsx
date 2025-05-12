import React from "react";
import FacebookIcon from "../assets/FacebookIcon.png";
import TwitterIcon from "../assets/TwitterIcon.png";
import LinkedInIcon from "../assets/LinkedInIcon.png";

function Footer() {
  return (
    <footer className="bg-gray-700 border-t py-8">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-400">
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">
            Vita Verse
          </h4>
          <p className="text-sm">
            [Your Address Line 1]
            <br />
            [Your Address Line 2]
            <br />
            Ghaziabad, Uttar Pradesh, India
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Quick Links
          </h4>
          <ul className="list-none p-0 m-0 space-y-2 text-sm">
            <li>
              <a href="/appointments" className="hover:text-blue-500">
                Appointments
              </a>
            </li>
            <li>
              <a href="/medications" className="hover:text-blue-500">
                Medications
              </a>
            </li>
            <li>
              <a href="/messages" className="hover:text-blue-500">
                Secure Messaging
              </a>
            </li>
            <li>
              <a href="/health-records" className="hover:text-blue-500">
                Health Records
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Contact Us
          </h4>
          <p className="text-sm">
            Phone: +91 [9536XXXXXXX]
            <br />
            Email:{" "}
            <a
              href="mailto:info@yourhospital.com"
              className="text-blue-500 hover:underline"
            >
              info@yourhospital.com
            </a>
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Follow Us
          </h4>
          <ul className="list-none p-0 m-0 flex space-x-4">
            <li>
              <a href="#" className="hover:opacity-75">
                <img src={FacebookIcon} className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-75">
                <img src={TwitterIcon} className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-75">
                <img src={LinkedInIcon} className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-6 border-t border-gray-300 text-center text-sm text-gray-400">
        <p>&copy; 2025 Vita Verse. All rights reserved.</p>
        <p className="mt-1">
          <a
            href="/privacy-policy"
            className="text-blue-500 hover:underline mr-4"
          >
            Privacy Policy
          </a>{" "}
          |
          <a
            href="/terms-of-service"
            className="text-blue-500 hover:underline ml-4"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
