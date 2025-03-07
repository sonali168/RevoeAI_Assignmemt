const express = require('express');
const { getSheetData, addSheetData } = require('../controllers/sheetController');

const router = express.Router();

router.get('/', getSheetData);
router.post('/add', addSheetData);

module.exports = router;

