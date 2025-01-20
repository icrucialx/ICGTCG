const express = require("express");
const app = express();
const PORT = 3000;

app.get("/pull", async (req, res) => {
    const username = req.query.username;
    const cardName = pullRandomCard();
    await addCard(username, cardName);
    res.send(`${username} pulled ${cardName}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
