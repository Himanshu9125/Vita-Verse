// controller/history.js
const History = require('../Model/model.history');

const addHistory = async (req, res) => {
    try {
        const { category, people } = req.body;

        if (!category || !people) {
            return res.status(400).json({ error: "Category and people are required." });
        }

        const newEntry = new History({ category, people });
        await newEntry.save();

        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await History.find().sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addHistory, getHistory };
