const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Servir carpeta public (frontend)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Conexión base de datos
const db = require("./db");

// 🔹 Rutas
const usuariosRoutes = require("./routes/usuarios");
const motosRoutes = require("./routes/motos");
const loginRoutes = require("./routes/Login");


app.use("/usuarios", usuariosRoutes);
app.use("/motos", motosRoutes);
app.use("/Login", loginRoutes);


// 🔹 Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Puerto
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
