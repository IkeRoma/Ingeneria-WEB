const express = require("express");
const bodyParser = require("body-parser");
const conexion = require("./conexion"); // tu archivo de conexión MySQL

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// =====================
// LOGIN
// =====================
app.post("/validar-login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM Usuarios WHERE Email = ? AND Password = ?";
  conexion.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, mensaje: "Error en la base de datos" });

    if (results.length > 0) {
      res.json({ success: true, mensaje: "✅ Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ success: false, mensaje: "⚠️ Usuario o contraseña incorrectos" });
    }
  });
});

// =====================
// REGISTRO
// =====================
app.post("/registrar-usuario", (req, res) => {
  const { nombres, apellidos, email, password } = req.body;

  if (!nombres || !apellidos || !email || !password) {
    return res.status(400).json({ success: false, mensaje: "Todos los campos son obligatorios" });
  }

  // Verificar si el correo ya existe
  const sqlCheck = "SELECT * FROM Usuarios WHERE Email = ?";
  conexion.query(sqlCheck, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, mensaje: "Error en la base de datos" });

    if (results.length > 0) {
      return res.status(400).json({ success: false, mensaje: "El correo ya está registrado" });
    }

    // Insertar usuario
    const sqlInsert = "INSERT INTO Usuarios (Nombre, Apellido, Email, Password) VALUES (?, ?, ?, ?)";
    conexion.query(sqlInsert, [nombres, apellidos, email, password], (err) => {
      if (err) return res.status(500).json({ success: false, mensaje: "Error al registrar el usuario" });
      res.json({ success: true, mensaje: "✅ Registro exitoso" });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
