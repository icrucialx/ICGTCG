const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root folder
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example /pull endpoint for card data
app.get('/pull', (req, res) => {
  const cardPool = require('./card_pool.json'); // Load your card pool JSON
  const rarities = Object.keys(cardPool);

  const pullRandomCard = () => {
    const rarityWeights = {
      common: 50,
      uncommon: 30,
      rare: 15,
      ultrarare: 4,
      secretrare: 1,
    };
    const weights = Object.values(rarityWeights);
    const randomRarity = weightedRandom(rarities, weights);
    const card = cardPool[randomRarity][Math.floor(Math.random() * cardPool[randomRarity].length)];
    return { card, rarity: randomRarity };
  };

  const pulls = [pullRandomCard(), pullRandomCard(), pullRandomCard()];
  res.json({ success: true, pulls });
});

// Weighted random function
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
