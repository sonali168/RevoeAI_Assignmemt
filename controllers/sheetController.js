const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// Google Sheets API Setup
const auth = new google.auth.GoogleAuth({
  keyFile: 'google-credentials.json', // Path to your service account key
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SHEET_ID = process.env.SHEET_ID; // Your Google Sheets ID

//  Fetch Data from Google Sheet
exports.getSheetData = async (req, res) => {
  try {
    const range = 'Sheet1!A1:Z100'; // Adjust range based on your sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: range,
    });

    res.json(response.data.values || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sheet data', error });
  }
};

// Add Data to Google Sheet
exports.addSheetData = async (req, res) => {
  try {
    const { values } = req.body; // Example: [["John Doe", "john@example.com"]]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1', 
      valueInputOption: 'RAW',
      resource: { values },
    });

    res.json({ message: 'Data added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data', error });
  }
};

