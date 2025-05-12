const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    category: {
        type: Number,
        require: true
    },
    people: {
        type: Number,
        require: true
    },
    timestamp: { type: Date, default: Date.now },
});

const History = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = History;
