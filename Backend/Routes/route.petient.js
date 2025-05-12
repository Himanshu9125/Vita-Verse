const express = require('express');
const patient_router = express.Router();
const Patient = require('../Model/model.patient'); // Import the Patient model
const { authRegister, authPatient } = require('../Middleware/auth.middleware');
const { body } = require('express-validator');

// const validatePatient = require('../Middleware/validatePatient'); // Import the validation middleware
// const { check, validationResult } = require('express-validator'); // Import express-validator for validation
const { getAllPatients, getPatientByEmail, createPatient, updatePatient, deletePatient, loginPatient } = require('../Controller/Petiant'); // Import the controller functions

// Define routes
// router.get('/patients', getAllPatients);
patient_router.post('/register', authRegister, createPatient);
patient_router.post('/login', authRegister, loginPatient);
patient_router.get('/:email',getPatientByEmail);
// patient_router.put('/:id', updatePatient);
// router.delete('/patients/:id', deletePatient);

module.exports = patient_router;