const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {

    const { nombre_usuario, fecha_nacimiento, cedula, placa, correo, password } = req.body;

    try {

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios 
            (nombre_usuario, fecha_nacimiento, cedula, placa, correo, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [nombre_usuario, fecha_nacimiento, cedula, placa, correo, hashedPassword],
            (err, result) => {

                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al registrar usuario");
                }

                res.redirect("/login.html"); // redirige después de registrar
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }

});

module.exports = router;
