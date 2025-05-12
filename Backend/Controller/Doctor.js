const Doctor = require('../Model/model.doctor');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Controller to create a new doctor
const createDoctor = async (req, res) => {
    try {
        const {
            password,
            email,
            specialization,
            experience,
            name,
            age,
            gender,
            availability,
        } = req.body;

        // Check required fields
        if (!email || !name || !password || !specialization || !experience) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the doctor
        const newDoctor = new Doctor({
            email,
            specialization,
            experience,
            name,
            age,
            gender,
            availability,
            password: hashedPassword,
        });

        const savedDoctor = await newDoctor.save();

        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating doctor',
            error: error.message,
        });
    }
};


const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Doctor.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            Doctor: {
                id: user._id,
                name: {
                    firstName: user.name.firstName,
                    lastName: user.name.lastName,
                },
                email: user.email,
                age: user.age,
                gender: user.gender,
                specialization: user.specialization,
                experience: user.experience,
                availability: user.availability,
            },
        });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}





module.exports = {
    createDoctor,
    loginDoctor,
    getDoctorById,
    getAllDoctors
};