const { google } = require("googleapis");
const fs = require("fs");

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync("icrucialtcg/dynamic-art-448221-j9-10b2bca3959d.json"));

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet ID and range
const SPREADSHEET_ID = "10QhDmqimECd8sRPNMOTAvTXU_-lHG3to1mWx-qx9xNU";
const RANGE = "Sheet1";

// Function to add a card to Google Sheets
async function addCard(username, cardName) {
    const values = [[username, cardName, new Date().toISOString()]];
    const resource = { values };

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: "RAW",
        resource,
    });

    console.log(`${username} collected ${cardName}!`);
}

// Example usage
const username = "icrucialx";
const cardName = "Fire Dragon";

addCard(username, cardName).catch(console.error);
