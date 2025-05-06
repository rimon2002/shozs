
const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET /api/bus/search
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;
  const buses = await Bus.find({ from, to, date });
  res.json(buses);
});

module.exports = router;
