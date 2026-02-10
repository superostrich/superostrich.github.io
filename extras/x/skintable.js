function populateDropdown(id, datasetKey) {
  const select = document.getElementById(id);
  const values = new Set();

  document.querySelectorAll("#card-grid-csv .card").forEach(card => {
    values.add(card.dataset[datasetKey]);
  });

  [...values]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
}

function applyFilters() {
  const aircraft = document.getElementById("filter-aircraft").value;
  const faction  = document.getElementById("filter-faction").value;
  const gryphus  = document.getElementById("filter-gryphus").checked;

  document.querySelectorAll("#card-grid-csv .card").forEach(card => {
    let show = true;

    if (aircraft !== "all" && card.dataset.aircraft !== aircraft) {
      show = false;
    }

    if (faction !== "all" && card.dataset.faction !== faction) {
      show = false;
    }

    if (gryphus && card.dataset.gryphus !== "1") {
      show = false;
    }

    card.hidden = !show;
  });
}

function resetFilters() {
  const aircraftSelect = document.getElementById("filter-aircraft");
  const factionSelect  = document.getElementById("filter-faction");
  const gryphusCheck   = document.getElementById("filter-gryphus");

  aircraftSelect.value = "all";
  factionSelect.value  = "all";
  factionSelect.disabled = false;
  gryphusCheck.checked = false;

  applyFilters();
}

async function loadCards(csvUrl) {
  const res = await fetch(csvUrl);
  const text = await res.text();

  const lines = text.trim().split("\n");
  const headers = lines.shift().split(",");

  const grid = document.getElementById("card-grid-csv");

  lines.forEach(line => {
    const values = line.split(",");
    const row = Object.fromEntries(
      headers.map((h, i) => [h.trim(), values[i]?.trim()])
    );

    const title = `${row.aircraft} ${row.name}`;

    const card = document.createElement("article");
    card.className = "card";

    // hidden filter data
    card.dataset.faction = row.faction;
    card.dataset.origin = row.game_origin;
    card.dataset.gryphus = row.gryphus;
    card.dataset.aircraft = row.aircraft;

    card.innerHTML = `
      <h3>${title}</h3>

      <img
        class="thumb"
        src="${row.image}"
        alt="${title}"
      >

      <a
        class="download"
        href="${row.download_url}"
      >
        ${row.download_label}
      </a>
    `;

    grid.appendChild(card);
  });
  populateDropdown("filter-aircraft", "aircraft");
  populateDropdown("filter-faction", "faction");
}

loadCards("extras/x/table.csv");

document.getElementById("filter-aircraft")
  .addEventListener("change", applyFilters);

document.getElementById("filter-faction")
  .addEventListener("change", applyFilters);

document.getElementById("filter-gryphus")
  .addEventListener("change", () => {
    const gryphus = document.getElementById("filter-gryphus").checked;
    const factionSelect = document.getElementById("filter-faction");

    if (gryphus) {
      factionSelect.value = "all";
      factionSelect.disabled = true;
    } else {
      factionSelect.disabled = false;
    }

    applyFilters();
  });
  
document.getElementById("filter-reset")
  .addEventListener("click", resetFilters);