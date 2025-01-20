const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Import card pool JSON
const cardPool = require("./card_pool.json");

app.get("/pull", async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardPool = require("./card_pool.json");
    const rarities = Object.keys(cardPool);
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const card = cardPool[rarity][Math.floor(Math.random() * cardPool[rarity].length)];

    res.json({
        data: {
            success: true,
            username: username,
            card: card,
            rarity: rarity
        }
    });
});

app.get("/collection", async (req, res) => {
    const username = req.query.username;

    // Check if username is provided
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    // Fetch user's collection from your database or Google Sheets
    const collection = await fetchUserCollection(username); // Replace with your actual logic

    // Respond with the user's collection
    res.json({
        success: true,
        username: username,
        collection: collection
    });
});
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
