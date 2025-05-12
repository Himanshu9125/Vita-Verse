// Get all patients
const Patient = require('../Model/model.patient'); // Import the Patient model
const express = require('express');
// Create a new patient
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const getAllPatients = async (req, res) => {
//     try {
//         const patients = await Patient.find();
//         res.status(200).json(patients);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching patients', error });
//     }
// };

// Get a single patient by ID
const getPatientByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const patient = await Patient.findById({ email }); // assuming Mongoose

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




const createPatient = async (req, res) => {
    try {
        const { password, email } = req.body;
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newPatient = new Patient({ ...req.body, password: hashedPassword });
        const savedPatient = await newPatient.save();

        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Error creating patient', error: error.message });
    }
};


const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            // token,
            Patient: {

                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                age: user.age,
                patientId: user.patientId,
                gender:user.gender

            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Update a patient by ID
const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Error updating patient', error });
    }
};


module.exports = {
    // getAllPatients,
    getPatientByEmail,
    createPatient,
    updatePatient,
    loginPatient,
    // deletePatient
};