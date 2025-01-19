const backendURL = "https://tcg-gacha-backend-xyz.a.run.app"; // Replace with your Cloud Run Backend URL

// Fetch all cards and display them
function fetchAllCards() {
  fetch(`${backendURL}/cards`)
    .then(response => response.json())
    .then(cards => {
      console.log("Fetched cards:", cards);

      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = ""; // Clear previous content

      cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card glow-${card.rarity}`; // Add rarity-specific styles

        const img = document.createElement("img");
        img.src = `./images/${card.name.toLowerCase()}.png`; // Assuming image files are named after card names
        img.alt = card.name;

        const rarityDiv = document.createElement("div");
        rarityDiv.className = `rarity rarity-${card.rarity}`;
        rarityDiv.innerText = card.rarity.toUpperCase();

        const nameDiv = document.createElement("div");
        nameDiv.className = `name name-${card.rarity}`;
        nameDiv.innerText = card.name;

        cardDiv.appendChild(img);
        cardDiv.appendChild(rarityDiv);
        cardDiv.appendChild(nameDiv);
        resultDiv.appendChild(cardDiv);
      });
    })
    .catch(error => console.error("Error fetching cards:", error));
}

// Perform a gacha pull and display the pulled card
function performGachaPull(userId) {
  fetch(`${backendURL}/pull`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  })
    .then(response => response.json())
    .then(card => {
      console.log("Pulled Card:", card);

      // Create and display the pulled card
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = ""; // Clear previous content

      const cardDiv = document.createElement("div");
      cardDiv.className = `card glow-${card.rarity}`; // Add rarity-specific styles

      const img = document.createElement("img");
      img.src = `./images/${card.name.toLowerCase()}.png`; // Assuming image files are named after card names
      img.alt = card.name;

      const rarityDiv = document.createElement("div");
      rarityDiv.className = `rarity rarity-${card.rarity}`;
      rarityDiv.innerText = card.rarity.toUpperCase();

      const nameDiv = document.createElement("div");
      nameDiv.className = `name name-${card.rarity}`;
      nameDiv.innerText = card.name;

      cardDiv.appendChild(img);
      cardDiv.appendChild(rarityDiv);
      cardDiv.appendChild(nameDiv);
      resultDiv.appendChild(cardDiv);
    })
    .catch(error => console.error("Error performing gacha pull:", error));
}

// Add event listeners for actions
document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display all cards on page load
  fetchAllCards();

  // Add functionality to the gacha pull button
  const pullButton = document.getElementById("pull-button");
  pullButton.addEventListener("click", () => {
    performGachaPull(1); // Replace with dynamic user ID if needed
  });
});
