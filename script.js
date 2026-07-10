// 1. Cacher le loader une fois la page chargée
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

// 2. Révéler les sections au scroll
const sections = document.querySelectorAll(".section-inner");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => revealObserver.observe(section));

// 3. Mettre à jour le point actif dans la nav (et le logo) selon la section visible
const navDots = document.querySelectorAll(".nav-dot");
const brandLogo = document.querySelector(".brand-logo");
const allSections = document.querySelectorAll(".section");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navDots.forEach((dot) => {
          dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
        });

        // Le logo se comporte comme le point "Start" de Yasio : actif uniquement sur la section d'accueil
        if (brandLogo) {
          brandLogo.classList.toggle("active", id === "start");
        }
      }
    });
  },
  { threshold: 0.5 }
);

allSections.forEach((section) => navObserver.observe(section));

// 4. Défilement fluide au clic sur la nav (comportement Yasio)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});