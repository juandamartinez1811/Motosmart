const express = require("express");
const router = express.Router();
const db = require("../db"); // tu conexión MySQL

router.post("/", (req, res) => {
    const { nombre_usuario, fecha_nacimiento, cedula, placa, correo, password } = req.body;

    const sql = `
        INSERT INTO usuarios 
        (nombre_usuario, fecha_nacimiento, cedula, placa, correo, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nombre_usuario, fecha_nacimiento, cedula, placa, correo, password], // contraseña en texto plano
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar usuario");
            }

            res.redirect("/login.html"); // redirige al login después de registrar
        }
    );
});

module.exports = router;
