import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const DoctorDataContext = createContext();

// Provider component
export const DoctorContextProvider = ({ children }) => {
  const [doctorformData, setDoctorFormData] = useState(() => {
    const stored = localStorage.getItem("doctorData");
    return stored
      ? JSON.parse(stored)
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          age: "",
          gender: "",
          phone: "",
          specialization: "",
          experience: "",
          availability: [],
        };
  });

  const [Total,setTotal]=useState([]);

  useEffect(() => {
    if (doctorformData?.email) {
      localStorage.setItem("doctorData", JSON.stringify(doctorformData));
    }
  }, [doctorformData]);

  return (
    <DoctorDataContext.Provider
      value={[doctorformData, setDoctorFormData, Total, setTotal]}
    >
      {children}
    </DoctorDataContext.Provider>
  );
};

// Custom hook for consuming context
export const useDoctorContext = () => {
  const context = useContext(DoctorDataContext);
  if (!context) {
    throw new Error(
      "useDoctorContext must be used within a DoctorContextProvider"
    );
  }
  return context;
};
