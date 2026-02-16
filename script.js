const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const searchEl = document.getElementById("search");
const filterEl = document.getElementById("tagFilter");
const gridEl = document.getElementById("projectGrid");

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function applyFilters() {
  if (!searchEl || !filterEl || !gridEl) return;

  const q = normalize(searchEl.value);
  const tag = filterEl.value;

  const cards = gridEl.querySelectorAll(".project-card");
  cards.forEach((card) => {
    const title = normalize(card.dataset.title || card.querySelector("h3")?.textContent);
    const tags = normalize(card.dataset.tags || "");

    const matchQuery = !q || title.includes(q) || tags.includes(q);
    const matchTag = tag === "all" || tags.includes(tag);

    card.style.display = (matchQuery && matchTag) ? "block" : "none";
  });
}

if (searchEl) searchEl.addEventListener("input", applyFilters);
if (filterEl) filterEl.addEventListener("change", applyFilters);
applyFilters();
