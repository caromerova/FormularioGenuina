document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    const intereses = Array.from(
      document.querySelectorAll('input[name="interes"]:checked')
    ).map((c) => c.value);

    // Enviar a Google Apps Script (TU URL)
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbx58WzpUSCEYr2lM76H7t7b7xV5DALwvtAxYSXbZEUM0uXYeAQexyEHxuA180Oh3cYs/exec";

    try {
      await fetch(scriptURL, {
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

      const successMsg = document.getElementById("success");
      successMsg.style.display = "block";
      successMsg.style.opacity = "1";

      // Limpiar formulario
      form.reset();

      // Ocultar mensaje y recargar página
      setTimeout(() => {
        successMsg.style.opacity = "0";

        setTimeout(() => {
          successMsg.style.display = "none";
          location.reload();
        }, 600);
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar. Intenta nuevamente.");
    }
  });
});
