document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("players");
const search = document.getElementById("search");

if (!container) {
console.error('Nav atrasts elements ar id="players".');
return;
}

let players = [];

async function loadPlayers() {
try {
const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error("Neizdevās ielādēt data.json");
  }

  const data = await response.json();
  players = Array.isArray(data.players) ? data.players : [];
  renderPlayers();
} catch (error) {
  console.error(error);
  container.textContent =
    "Neizdevās ielādēt spēlētājus. Pārbaudi data.json failu.";
}

}

function renderPlayers() {
container.replaceChildren();

const query = search ? search.value.trim().toLowerCase() : "";

const filtered = players.filter(player =>
  String(player.username || "").toLowerCase().includes(query)
);

if (filtered.length === 0) {
  container.textContent = "Spēlētāji nav atrasti.";
  return;
}

filtered.forEach(player => {
  const card = document.createElement("div");
  card.className = "player-card";

  const name = document.createElement("h3");
  name.textContent = player.username || "Nezināms spēlētājs";

  const category = document.createElement("p");
  category.textContent = `Kategorija: ${player.category || "—"}`;

  const theory = document.createElement("p");
  theory.textContent =
    `Teorija: ${player.theory === "passed" ? "Nokārtota" : "Nav nokārtota"}`;

  const driving = document.createElement("p");
  driving.textContent =
    `Braukšana: ${player.driving === "passed" ? "Nokārtota" : "Nav nokārtota"}`;

  const license = document.createElement("p");
  license.textContent =
    `Apliecība: ${player.license === "issued" ? "Izsniegta" : "Nav izsniegta"}`;

  card.append(name, category, theory, driving, license);
  container.appendChild(card);
});

}

if (search) {
search.addEventListener("input", renderPlayers);
}

loadPlayers();
});