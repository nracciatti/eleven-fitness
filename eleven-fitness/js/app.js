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
