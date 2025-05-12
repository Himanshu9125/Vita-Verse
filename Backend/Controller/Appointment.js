const Appointment = require('../Model/model.appointment');

// Get all appointments
exports.getDoctorAppointment = async (req, res) => {
    const {doctorEmail}=req.params;

    try {
        if (!doctorEmail) {
            return res.status(400).json({ message: 'Doctor email is required' });
        }
        const appointment = await Appointment.find({doctorEmail});
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment', error });
    }
};

// Get appointment by ID
exports.getPatientAppointment = async (req, res) => {
    try {
        // Extract the patientEmail from route params
        const { patientEmail } = req.params;

        if (!patientEmail) {
            return res.status(400).json({ message: 'Patient email is required' });
        }

        // Find appointments where patientEmail matches
        const appointments = await Appointment.find({ patientEmail });

        // Return empty array if no appointments found (this is not an error case)
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        res.status(500).json({
            message: 'Error fetching appointments',
            error: error.message
        });
    }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { doctorEmail, patientEmail } = req.body;

        const existing = await Appointment.findOne({ doctorEmail, patientEmail });
        if (existing) {
            return res.status(409).json({
                message: "Appointment already exists between this doctor and patient.",
            });
        }

        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment', error });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
};