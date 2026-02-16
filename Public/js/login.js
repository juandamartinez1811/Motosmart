// login.js
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!correo || !password) {
        message.style.color = "red";
        message.textContent = "Por favor ingresa correo y contraseña";
        return;
    }

    // 🔹 Mostrar spinner
    message.style.color = "black";
    message.textContent = "Iniciando sesión... ⏳";

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        });

        let result;
        try {
            result = await response.json();
        } catch {
            result = {};
        }

        if (response.ok) {
            message.style.color = "green";
            message.textContent = `Bienvenido ${result.user?.nombre_usuario || ""} 😎`;

            setTimeout(() => {
                window.location.href = "../html/main.html";
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = result.error || "Credenciales incorrectas";
        }
    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Error de conexión 😕";
    }
});
