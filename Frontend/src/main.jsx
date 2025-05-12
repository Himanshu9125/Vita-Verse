import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PatientContextProvider } from "./context/patientContext.jsx";
import { PredictionProvider } from "./context/predictionContext.jsx";
import { DoctorContextProvider } from "./context/doctorContext.jsx";
import { AppointmentContextProvider } from "./context/appointmentContext.jsx";
createRoot(document.getElementById("root")).render(
  <PredictionProvider>
    <AppointmentContextProvider>
    <DoctorContextProvider>
      <PatientContextProvider>
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      </PatientContextProvider>
    </DoctorContextProvider>
    </AppointmentContextProvider>
  </PredictionProvider>
);
