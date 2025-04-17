// Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded"); // Para debug

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  console.log("hamburger:", hamburger); // Para debug
  console.log("navLinks:", navLinks); // Para debug

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      console.log("hamburger clicked"); // Para debug
      navLinks.classList.toggle("nav-active");
      hamburger.classList.toggle("toggle");
    });

    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll(".nav-links li a");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        hamburger.classList.remove("toggle");
      });
    });
  }

  // Inicializar los botones de idioma de la carta
  initializeLanguageButtons();
});

document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie-consent-banner");
  const acceptButton = document.getElementById("cookie-accept");
  const rejectButton = document.getElementById("cookie-reject");

  // Check if user has already made a choice
  if (!localStorage.getItem("cookieConsent")) {
    cookieBanner.classList.remove("display-none");
  }

  acceptButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.classList.add("display-none");
    // Initialize Google Analytics
    initGoogleAnalytics();
  });

  rejectButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    cookieBanner.classList.add("display-none");
    // Don't initialize Google Analytics
  });

  // Only initialize Google Analytics if consent was previously given
  if (localStorage.getItem("cookieConsent") === "accepted") {
    initGoogleAnalytics();
  }
});

function initGoogleAnalytics() {
  // Your Google Analytics initialization code
}

// Instead of directly including the Google Analytics script
// Move it into this function that only runs after consent
function initGoogleAnalytics() {
  // Google Analytics code here
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "YOUR-GA-ID");
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Slideshow functionality
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 1;
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;
  let slideInterval;
  const autoplayDelay = 8000;

  function showSlide(n) {
    if (n > totalSlides) currentSlide = 1;
    else if (n < 1) currentSlide = totalSlides;
    else currentSlide = n;

    slides.forEach((slide) => (slide.style.display = "none"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    slides[currentSlide - 1].style.display = "block";
    indicators[currentSlide - 1].classList.add("active");
  }

  function navigateSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoplay();
  }

  function startAutoplay() {
    slideInterval = setInterval(() => {
      navigateSlide(1);
    }, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  // Event Listeners
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") navigateSlide(-1);
    if (e.key === "ArrowRight") navigateSlide(1);
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      showSlide(parseInt(indicator.getAttribute("data-index")));
      resetAutoplay();
    });
  });

  const slideshow = document.querySelector(".fullwidth-slideshow");
  if (slideshow) {
    slideshow.addEventListener("mouseenter", () =>
      clearInterval(slideInterval)
    );
    slideshow.addEventListener("mouseleave", startAutoplay);
  }

  // Initialize slideshow
  showSlide(1);
  startAutoplay();
});

// Language switcher functionality
document.addEventListener("DOMContentLoaded", function () {
  const phrases = {
    ca: document.querySelector(".phrase-ca"),
    en: document.querySelector(".phrase-en"),
    fr: document.querySelector(".phrase-fr")
  };

  // Función para actualizar la frase visible
  function updatePhrase(lang) {
    // Ocultar TODAS las frases primero
    Object.values(phrases).forEach(phrase => {
      if (phrase) {
        phrase.classList.remove("active");
      }
    });

    // Mostrar SOLO la frase del idioma seleccionado
    if (phrases[lang]) {
      phrases[lang].classList.add("active");
    }
  }

  // Inicializar con catalán
  updatePhrase("ca");

  // Event listeners para los botones de idioma
  const languageTabs = document.querySelectorAll(".language-tab");
  languageTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const selectedLang = this.getAttribute("data-lang");
      updatePhrase(selectedLang);
    });
  });
});

// Cargar el contenido de la carta
/*document.addEventListener('DOMContentLoaded', function() {
  const cartaContent = document.getElementById('carta-content');
  
  fetch('carta.html')
    .then(response => response.text())
    .then(data => {
      cartaContent.innerHTML = data;
      // Reinicializar los event listeners de los botones de idioma
      initializeLanguageButtons();
    })
    .catch(error => console.error('Error loading carta:', error));
});*/

// Función para manejar los cambios de idioma en la carta
function initializeLanguageButtons() {
  const languageTabs = document.querySelectorAll(".language-tab");
  const menuContainers = document.querySelectorAll(".menu-container");

  // Ocultar todos los menús excepto el catalán por defecto
  menuContainers.forEach((container) => {
    if (container.id === "menu-ca") {
      container.style.display = "block";
      container.classList.add("active");
    } else {
      container.style.display = "none";
      container.classList.remove("active");
    }
  });

  languageTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      languageTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedLang = tab.getAttribute("data-lang");

      menuContainers.forEach((container) => {
        if (container.id === `menu-${selectedLang}`) {
          container.style.display = "block";
          container.classList.add("active");
        } else {
          container.style.display = "none";
          container.classList.remove("active");
        }
      });
    });
  });
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  initializeLanguageButtons();
});

// Asegurarse de que el CSS para la navegación móvil esté correcto
const styles = `
@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-active {
  transform: translateX(0%) !important;
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.toggle .line2 {
  opacity: 0;
}

.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
`;

// Añadir los estilos al documento
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
