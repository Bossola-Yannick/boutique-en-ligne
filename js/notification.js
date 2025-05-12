// notifications toast
function showToast(message, type = "success", duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  toast.offsetHeight;

  // ajouter la classe 'show' pour l'animation d'entrée
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // cache et supprime le toast après la durée spécifiée
  setTimeout(() => {
    toast.classList.remove("show");
    // attend la fin de la transition avant de supprimer l'élément
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
  }, duration);
}
