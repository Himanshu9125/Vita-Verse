const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./DB/db');
const patient_router = require('./Routes/route.petient');
const doctor_router = require('./Routes/route.doctor');
const history_router = require('./Routes/route.history');
const PatientModel = require('./Model/model.patient');
const Appointmentrouter=require('./Routes/route.appointment');
const routerBlog =require('./Routes/route.blog');
const dotenv = require('dotenv');

// index.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
connectDB();
// Routes/

app.use(cors());
app.use('/api/patients/', patient_router);
app.use('/api/doctors/', doctor_router);
app.use('/api/', history_router);
app.use('/api/appointment/', Appointmentrouter);
app.use('/api/doctor/', routerBlog);

// for ml priction values



// await PatientModel.syncIndexes();
// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
});