const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Conexión a la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "prueba2",
    user: "root",
    password: "5485Roma"
});

app.use(bodyParser.json());
app.use(express.static("public")); // Carpeta donde están HTML, CSS y JS

// Ruta para validar login
app.post("/validar-login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, mensaje: "⚠️ Los campos no pueden estar vacíos" });
  }

  const sql = "SELECT * FROM Usuarios WHERE Email = ? AND Password = ?";
  conexion.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, mensaje: "⚠️ Error en la base de datos" });

    if (results.length > 0) {
      res.json({ success: true, mensaje: "✅ Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ success: false, mensaje: "⚠️ Usuario o contraseña incorrectos" });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));