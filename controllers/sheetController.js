const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  keyFile: 'google-credentials.json', 
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

exports.getSheetData = async (req, res) => {
  try {
    const spreadsheetId = process.env.SHEET_ID;
    const range = 'Sheet1!A1:Z100';

    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const data = response.data.values || [];

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Google Sheets data' });
  }
};
