const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password })
    });

    const result = await response.json();

    if (response.ok) {
      message.style.color = "green";
      message.textContent = `Bienvenido ${result.user.nombre_usuario} 😎`;
      window.location.href = "/dashboard.html"; // redirige si quieres
    } else {
      message.style.color = "red";
      message.textContent = result.error || "Credenciales incorrectas";
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error de conexión 😕";
    console.error(error);
  }
});
