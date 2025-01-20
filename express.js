const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root route to check if the server is running
app.get("/", (req, res) => {
    res.send("TCG Gacha Backend is live and running!");
});

// Other routes (e.g., /pull and /collection)
app.get("/pull", async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardPool = require("./card_pool.json");
    const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];

    // Logic to add card to Google Sheets (simplified for clarity)
    res.json({ success: true, card: randomCard });
});

app.get("/collection", async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    // Logic to fetch collection from Google Sheets
    res.json({ collection: [] });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
