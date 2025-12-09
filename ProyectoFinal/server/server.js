const express = require("express");
const cors = require("cors");
const path = require("path");
const auth = require("./authController");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // Archivos estáticos desde public

// Rutas API
app.post("/api/login", auth.login);
app.post("/api/register", auth.registrar);
app.post("/api/reset", auth.resetPassword);
app.post("/api/delete", auth.eliminarUsuario);
app.get("/api/usuarios", auth.listarUsuarios);

// Servir index.html para cualquier otra ruta
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Index.html"));
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));