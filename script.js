// Year
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

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after click (mobile)
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

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
  { root: null, threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));

// Reveal animations
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

// Featured image fallback note (if image missing)
const demoImg = document.querySelector(".demo-img");
const demoFallback = document.querySelector(".demo-fallback");
if (demoImg && demoFallback) {
  demoImg.addEventListener("error", () => {
    demoFallback.hidden = false;
  });
}
