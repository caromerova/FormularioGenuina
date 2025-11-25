document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const successMsg = document.getElementById("success");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // --- DESACTIVAR BOTÓN PARA EVITAR DOBLES ENVÍOS ---
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    // --- OBTENER DATOS DEL FORMULARIO ---
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    const intereses = Array.from(
      document.querySelectorAll('input[name="interes"]:checked')
    ).map((c) => c.value);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxoutVUoJ9kMHzGbgISa1sps1Wx3HWbJIs5IgmibdtXOt6_biRVT9_toJQZJAjGCvBz/exec";

    try {
      // --- ENVÍO EN SEGUNDO PLANO (no-cors no permite saber si falló) ---
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          telefono,
          correo,
          intereses: intereses.join(", "),
        }),
      });

      // --- MOSTRAR MENSAJE DE ÉXITO INMEDIATO (sensación de velocidad) ---
      successMsg.style.display = "block";
      successMsg.style.opacity = "1";

      // Limpiar formulario visualmente
      form.reset();

      // Ocultar mensaje automáticamente
      setTimeout(() => {
        successMsg.style.opacity = "0";
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 600);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);

      // ⚠️ IMPORTANTE:
      // fetch() con no-cors NO permite detectar errores del servidor.
      // Esta sección solo se ejecuta por errores de red del navegador.
      showToast("Hubo un error al enviar. Revisa tu conexión.");
    }

    // --- REACTIVAR BOTÓN ---
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
  });

  // --- FUNCIÓN PARA MENSAJES LIGEROS SIN ALERT() ---
  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast-message";
    t.textContent = msg;
    document.body.appendChild(t);

    setTimeout(() => {
      t.classList.add("hide");
      setTimeout(() => t.remove(), 500);
    }, 3000);
  }
});
