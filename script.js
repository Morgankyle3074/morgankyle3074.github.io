// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Project search + filter
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
    const desc = normalize(card.querySelector(".project-desc")?.textContent);

    const matchQuery = !q || title.includes(q) || tags.includes(q) || desc.includes(q);
    const matchTag = tag === "all" || tags.includes(tag);

    card.style.display = (matchQuery && matchTag) ? "block" : "none";
  });
}

if (searchEl) searchEl.addEventListener("input", applyFilters);
if (filterEl) filterEl.addEventListener("change", applyFilters);
applyFilters();

// Active nav link highlighting
const sections = ["featured", "projects", "education", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));

// Reveal animations (safe)
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => revealObserver.observe(el));
