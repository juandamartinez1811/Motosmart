const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { nombre_usuario, fecha_nacimiento, cedula } = req.body;

    const sql = `
        INSERT INTO usuarios (nombre_usuario, fecha_nacimiento, cedula)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nombre_usuario, fecha_nacimiento, cedula], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: "Usuario registrado correctamente" });
    });
});

module.exports = router;
