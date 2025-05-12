const express = require('express');
const Appointmentrouter = express.Router();

// Import controller functions
const {
    getDoctorAppointment,
    getPatientAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../Controller/Appointment');

// Routes with distinct paths to avoid conflicts
Appointmentrouter.get('/doctor/:doctorEmail', getDoctorAppointment); // Get doctor appointments
Appointmentrouter.get('/patient/:patientEmail', getPatientAppointment); // Get patient appointments
Appointmentrouter.post('/makeAppointment', createAppointment); // Create a new appointment
Appointmentrouter.put('/:id', updateAppointment); // Update an appointment by ID
Appointmentrouter.delete('/:id', deleteAppointment); // Delete an appointment by ID

module.exports = Appointmentrouter;