import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PatientDataContext = createContext();

// Provider component
export const PatientContextProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem("patientData");
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
        };
  });



  useEffect(() => {
    if (formData?.email) {
      localStorage.setItem("patientData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <PatientDataContext.Provider value={[formData, setFormData]}>
      {children}
    </PatientDataContext.Provider>
  );
};

// Custom hook for consuming context
export const usePatientContext = () => {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error(
      "usePatientContext must be used within a PatientContextProvider"
    );
  }
  return context;
};
