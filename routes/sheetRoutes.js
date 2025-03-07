const express = require('express');
const { getSheetData } = require('../controllers/sheetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/google-sheets', authMiddleware, getSheetData);

module.exports = router;
