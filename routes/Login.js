const express = require("express");
const router = express.Router();
const db = require("../db"); // nuestro pool MySQL

router.post("/", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Debe enviar correo y contraseña" });
  }

  try {
    // Consulta el usuario en la base de datos
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ? LIMIT 1",
      [correo]
    );

    if (rows.length === 0)
      return res.status(401).json({ error: "Usuario no existe" });

    const usuario = rows[0];

    if (usuario.password !== password)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Login exitoso
    res.json({
      success: true,
      user: {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
