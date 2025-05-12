const patientModel = require("../Model/model.patient");
const doctorModel = require("../Model/model.doctor");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { request } = require("express");
const Appointment = require("../Model/model.appointment");


module.exports.authPatient = async (req, res, next) => {
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            massage: 'Unauthorised'
        });

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patient = await userModel.findById(decoded._id);

        req.patient = patient;
        return next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            massage: 'Unauthorised'
        });
    }


}
module.exports.authRegister = async (req, res, next) => {
    const { email,password } = req.body;

    if (!email ||  !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

  
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    next();
};



module.exports.authDoctor = async (req, res, next) => {
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            massage: 'Unauthorised'
        });

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await userModel.findById(decoded._id);

        req.doctor = doctor;
        return next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            massage: 'Unauthorised'
        });
    }


}


