const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "34.45.122.137", // Replace with your Cloud SQL Public IP
    user: "root",
    password: "Saukaras12!",
    database: "tcg_gacha"
});

// Test the connection
db.connect(err => {
    if (err) {
        console.error("Database connection error:", err);
        return;
    }
    console.log("Connected to Cloud SQL!");
});

// API: Fetch all cards
app.get("/cards", (req, res) => {
    db.query("SELECT * FROM Cards", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching cards.");
        } else {
            res.json(results);
        }
    });
});

// API: Fetch cards by rarity
app.get("/cards/:rarity", (req, res) => {
    const { rarity } = req.params;
    db.query("SELECT * FROM Cards WHERE rarity = ?", [rarity], (err, results) => {
        if (err) {
            res.status(500).send("Error fetching cards by rarity.");
        } else {
            res.json(results);
        }
    });
});

// API: Fetch all users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching users.");
        } else {
            res.json(results);
        }
    });
});

// API: Add a new user
app.post("/users", (req, res) => {
    const { username, twitch_id } = req.body;
    db.query(
        "INSERT INTO Users (username, twitch_id) VALUES (?, ?)",
        [username, twitch_id],
        (err, results) => {
            if (err) {
                res.status(500).send("Error adding user.");
            } else {
                res.json({ id: results.insertId, username, twitch_id });
            }
        }
    );
});

// API: Fetch pull history for a user
app.get("/pulls/:userId", (req, res) => {
    const { userId } = req.params;
    db.query(
        `SELECT Pulls.id, Pulls.pull_time, Cards.name AS card_name, Cards.rarity
         FROM Pulls
         JOIN Cards ON Pulls.card_id = Cards.id
         WHERE Pulls.user_id = ?`,
        [userId],
        (err, results) => {
            if (err) {
                res.status(500).send("Error fetching pull history.");
            } else {
                res.json(results);
            }
        }
    );
});

// API: Perform a gacha pull
app.post("/pull", (req, res) => {
    const userId = req.body.userId;
    const rarity = determineRarity();

    db.query(
        "SELECT * FROM Cards WHERE rarity = ? ORDER BY RAND() LIMIT 1",
        [rarity],
        (err, results) => {
            if (err || results.length === 0) {
                res.status(500).send("Error performing pull.");
            } else {
                const card = results[0];
                db.query(
                    "INSERT INTO Pulls (user_id, card_id) VALUES (?, ?)",
                    [userId, card.id],
                    err => {
                        if (err) {
                            res.status(500).send("Error saving pull.");
                        } else {
                            res.json(card);
                        }
                    }
                );
            }
        }
    );
});

// Helper function for rarity
function determineRarity() {
    const rand = Math.random() * 100;
    if (rand < 50) return "common";
    if (rand < 80) return "uncommon";
    if (rand < 95) return "rare";
    if (rand < 99) return "ultrarare";
    return "secretrare";
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));