const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    patientId:{
        type: String,
        required: true,
        trim: true
    },
    doctorName: {
        type: String,
        required: true,
        trim: true
    },
    doctorId:{
        type: String,
        required: true,
        trim: true
    },
    patientEmail: {
        type: String,
        rerequired: true,
    },
    doctorEmail: {
        type: String,
        rerequired: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'accepted','rejected'],
        default: 'pending'
    },

}, {
    timestamps: true
});
appointmentSchema.index({ doctorEmail: 1, patientEmail: 1 }, { unique: true });
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;