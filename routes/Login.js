const express = require("express");
const router = express.Router();
const db = require("../db"); // tu conexión MySQL

router.post("/", (req, res) => {
    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ? LIMIT 1";

    db.query(sql, [correo, password], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error del servidor" });
        if (rows.length === 0) return res.status(401).json({ error: "Usuario o contraseña incorrecta" });

        const usuario = rows[0];
        res.json({
            success: true,
            user: {
                id_usuario: usuario.id_usuario,
                nombre_usuario: usuario.nombre_usuario,
                correo: usuario.correo
            }
        });
    });
});

module.exports = router;
