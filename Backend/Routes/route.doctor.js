const express = require('express');

const routerDoctor = express.Router();


// Controller functions (import your actual controller functions here)
const {

    createDoctor,
    loginDoctor,
    getDoctorById,
    getAllDoctors
} = require('../Controller/Doctor');

// Routes
// Get all doctors
routerDoctor.get('/all', getAllDoctors);

// Get a doctor by ID
routerDoctor.get('/:id', getDoctorById);
// Create a new doctor
routerDoctor.post('/register', createDoctor);
routerDoctor.post('/login', loginDoctor);
// Update a doctor by ID
// router.put('/:id', updateDoctor);

// Delete a doctor by ID
// router.delete('/:id', deleteDoctor);

module.exports = routerDoctor;