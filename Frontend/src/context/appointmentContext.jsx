import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppointmentDataContext = createContext();

// Provider component
export const AppointmentContextProvider = ({ children }) => {
    const [appointmentData, setAppointmentData] = useState(() => {
        const stored = localStorage.getItem("appointmentData");
        return stored
            ? JSON.parse(stored)
            : {
                    patientName: "",
                    doctorName: "",
                    PatientEmail:"",
                    DoctorEmail:"",
                    reason: "",
                };
    });

    useEffect(() => {
        if (appointmentData?.date && appointmentData?.time) {
            localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
        }
    }, [appointmentData]);

    return (
        <AppointmentDataContext.Provider value={[appointmentData, setAppointmentData]}>
            {children}
        </AppointmentDataContext.Provider>
    );
};

// Custom hook for consuming context
export const useAppointmentContext = () => {
    const context = useContext(AppointmentDataContext);
    if (!context) {
        throw new Error(
            "useAppointmentContext must be used within an AppointmentContextProvider"
        );
    }
    return context;
};
