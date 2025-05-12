// route.history.js
const express = require('express');
const { addHistory, getHistory } = require('../Controller/history');

const history_router = express.Router();

history_router.get('/search-history', getHistory);
history_router.post('/search-history', addHistory); // Add this line

module.exports = history_router;
