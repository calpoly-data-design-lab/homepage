// Site runtime. Everything visual comes from the stylesheet; this script adds
// what CSS cannot: the live Game of Life field, dithered portraits, the mobile
// menu, and the hero's fit to the first screen. Without it the page is complete
// (full navigation, photographs as plain images, no motif).
//
// theme-tokens.js, effects.js, and rng.js are generated from the design system
// (tmp/site-draft/export-site.mjs); this file is hand-written.

import { light, dark } from "./theme-tokens.js";
import { renderImage, setupMotifs } from "./effects.js";

const root = document.documentElement;
const scheme = matchMedia("(prefers-color-scheme: dark)");
// The stylesheet switches ground with the OS setting; the effects follow it.
const tokens = () => (scheme.matches ? dark : light);

for (const node of document.querySelectorAll("[data-current-year]")) node.textContent = new Date().getFullYear();

// The hero fills the screen below the header (see --header-h in the stylesheet).
const header = document.querySelector(".site-header");
if (header) {
  const measure = () => root.style.setProperty("--header-h", `${header.getBoundingClientRect().height}px`);
  measure();
  new ResizeObserver(measure).observe(header);
}

// Mobile menu: the links collapse behind a button on narrow screens.
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
if (toggle && nav) {
  const set = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  };
  toggle.addEventListener("click", () => set(!nav.classList.contains("open")));
  nav.addEventListener("click", (event) => event.target.closest("a") && set(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      set(false);
      toggle.focus();
    }
  });
}

// Portraits: each photograph becomes a canvas drawn through the image treatment.
const pending = new Set();
function renderEffects() {
  for (const canvas of document.querySelectorAll("canvas.ds-image")) {
    if (canvas.offsetParent !== null && !pending.has(canvas)) renderImage(canvas, tokens());
  }
  setupMotifs(document, tokens());
}

for (const img of document.querySelectorAll("img.portrait")) {
  const canvas = document.createElement("canvas");
  canvas.className = "ds-image portrait";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", img.alt);
  pending.add(canvas);
  img.after(canvas);
  img
    .decode()
    .then(() => {
      canvas.dsSource = img;
      img.hidden = true;
      pending.delete(canvas);
      if (canvas.offsetParent !== null) renderImage(canvas, tokens());
    })
    .catch(() => {
      // Keep the plain photograph if it cannot be decoded.
      canvas.remove();
      pending.delete(canvas);
      img.style.visibility = "visible";
    });
}

renderEffects();
document.fonts?.ready.then(() => requestAnimationFrame(renderEffects));
scheme.addEventListener("change", renderEffects);
let lastWidth = innerWidth;
let resizeTimer = 0;
addEventListener("resize", () => {
  if (innerWidth === lastWidth) return;
  lastWidth = innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderEffects, 150);
});
