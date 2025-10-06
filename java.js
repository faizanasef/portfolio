// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
  }, 1000);
});

// Progress Bar
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = mobileToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// Particles Animation
const particlesContainer = document.getElementById("particles");
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.width = Math.random() * 5 + 2 + "px";
  particle.style.height = particle.style.width;
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";
  particlesContainer.appendChild(particle);
}

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});

// Skill Bar Animation
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute("data-progress");
        entry.target.style.width = progress + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Download Resume
document.getElementById("downloadResume").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Resume download will start shortly!");
});

// Language Switcher
const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = localStorage.getItem("language") || "en";

// Apply saved language
applyLanguage(currentLang);

langButtons.forEach((btn) => {
  if (btn.getAttribute("data-lang") === currentLang) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");

    langButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentLang = lang;
    localStorage.setItem("language", lang);
    applyLanguage(lang);
  });
});

function applyLanguage(lang) {
  // Set document direction
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);

  // Update all translatable elements
  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    const text = element.getAttribute("data-" + lang);
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      element.placeholder = text;
    } else if (element.querySelector("span")) {
      element.querySelector("span").textContent = text;
    } else {
      element.textContent = text;
    }
  });
}

// Active Nav Link on Scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
