document.addEventListener("DOMContentLoaded", function () {
  // Elementos del menú
  const botonMenu = document.getElementById("boton-menu");
  const menu = document.getElementById("menu");
  const body = document.body;

  // Crear overlay para cerrar el menú al hacer clic fuera
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  body.appendChild(overlay);

  // Función para alternar el menú
  function toggleMenu() {
    botonMenu.classList.toggle("activo");
    menu.classList.toggle("activo");
    overlay.classList.toggle("activo");

    // Bloquear scroll cuando el menú está abierto
    if (menu.classList.contains("activo")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Event listener para el botón del menú
  botonMenu.addEventListener("click", toggleMenu);

  // Event listener para el overlay
  overlay.addEventListener("click", toggleMenu);

  // Event listener para los enlaces del menú
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menu.classList.contains("activo")) {
        toggleMenu();
      }
    });
  });

  // Cerrar menú al redimensionar la ventana a un tamaño grande
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992 && menu.classList.contains("activo")) {
      toggleMenu();
    }
  });
});

// Configuracion AOS
document.addEventListener("DOMContentLoaded", function () {
  // Excluir elementos con posición fija antes de inicializar AOS
  const fixedElements = document.querySelectorAll(".header, .whatsapp-float");
  fixedElements.forEach((el) => {
    if (el.hasAttribute("data-aos")) {
      el.removeAttribute("data-aos");
    }
    if (el.hasAttribute("data-aos-duration")) {
      el.removeAttribute("data-aos-duration");
    }
    if (el.hasAttribute("data-aos-delay")) {
      el.removeAttribute("data-aos-delay");
    }
  });

  // Inicializar AOS con configuración optimizada
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
    // Desactivar en móviles si causa problemas
    // disable: 'mobile'
  });
});

// Seleccionar elementos
const botonesAbrir = document.querySelectorAll(".abrir-modal");
const botonesCerrar = document.querySelectorAll(".cerrar-modal");
const overlay = document.getElementById("overlay-modal");
const modales = document.querySelectorAll(".modal");

// Función para abrir modal
function abrirModal(id) {
  // Ocultar todos los modales primero
  modales.forEach((modal) => {
    modal.classList.remove("activo");
  });

  // Mostrar el modal seleccionado
  const modal = document.getElementById(id);
  modal.classList.add("activo");
  overlay.classList.add("activo");

  // Evitar scroll en el body
  document.body.style.overflow = "hidden";
}

// Función para cerrar modales
function cerrarModales() {
  modales.forEach((modal) => {
    modal.classList.remove("activo");
  });
  overlay.classList.remove("activo");

  // Restaurar scroll
  document.body.style.overflow = "auto";
}

// Event listeners para abrir modales
botonesAbrir.forEach((boton) => {
  boton.addEventListener("click", function (e) {
    e.preventDefault();
    const modalId = this.getAttribute("data-modal");
    abrirModal(modalId);
  });
});

// Event listeners para cerrar modales
botonesCerrar.forEach((boton) => {
  boton.addEventListener("click", cerrarModales);
});

// Cerrar al hacer clic en el overlay
overlay.addEventListener("click", cerrarModales);

// Cerrar al presionar ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cerrarModales();
  }
});

// Función para animar contadores
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16); // 16ms es aproximadamente 60fps

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Detectar y animar contadores
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute("data-target"));
        animateCounter(element, target, 2000); // 2000ms = 2 segundos
        counterObserver.unobserve(element);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});
