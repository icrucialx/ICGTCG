const express = require('express');
const app = express();
const path = require('path');

const cardPool = require('./card_pool.json'); // Load card data from JSON

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pull', (req, res) => {
    const pulls = [];

    for (let i = 0; i < 3; i++) {
        const rarity = weightedRandom(Object.keys(cardPool), [50, 30, 15, 4, 1]); // Adjust weights accordingly
        const cardList = cardPool[rarity];
        const card = cardList[Math.floor(Math.random() * cardList.length)];
        pulls.push({ card, rarity });
    }

    res.json({ success: true, pulls });
});

function weightedRandom(items, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (random < cumulativeWeight) {
            return items[i];
        }
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
