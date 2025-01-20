app.get("/pull", async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).send("Error: Username is required");
    }

    // Import your card pool
    const cardPool = require("./card_pool.json");

    // Select a random rarity
    const rarities = Object.keys(cardPool);
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Select a random card from the chosen rarity
    const card = cardPool[rarity][Math.floor(Math.random() * cardPool[rarity].length)];

    // Return a preformatted plain text response
    res.send(`@${username}, you pulled a card: ${card} (${rarity})!`);
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
