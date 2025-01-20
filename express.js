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

    // Check if username is provided
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const cardPool = require("./card_pool.json");

    // Randomly select a rarity
    const rarities = Object.keys(cardPool); // ["common", "uncommon", "rare", "ultrarare", "secretrare"]
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Randomly select a card from the chosen rarity
    const card = cardPool[rarity][Math.floor(Math.random() * cardPool[rarity].length)];

    // Example logic to save the pull (integrate this with your database or Google Sheets)
    // await savePullToDatabase(username, card, rarity);

    // Respond with the card and rarity
    res.json({
        success: true,
        username: username,
        card: card,
        rarity: rarity
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
