// =====================
// LOGIN
// =====================
document.getElementById("loginForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const resultado = document.getElementById("resultado");

  // Validación local
  const validacion = validarEmail(usuario);
  if (!validacion.valido) {
    resultado.style.color = "red";
    resultado.innerText = validacion.mensaje;
    return;
  }

  const validarPass = validarContrasena(contrasena);
  if (!validarPass.valido) {
    resultado.style.color = "red";
    resultado.innerText = validarPass.mensaje;
    return;
  }

  // Validación en la DB
  try {
    const response = await fetch("/validar-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usuario, password: contrasena })
    });

    const data = await response.json();
    resultado.style.color = data.success ? "green" : "red";
    resultado.innerText = data.mensaje;
  } catch (error) {
    resultado.style.color = "red";
    resultado.innerText = "Error de conexión con el servidor";
  }
});

// =====================
// REGISTRO
// =====================
document.getElementById("registroForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const verificar = document.getElementById("verificar").value;
  const resultado = document.getElementById("resultado");

  if (contrasena !== verificar) {
    resultado.style.color = "red";
    resultado.innerText = "⚠️ Las contraseñas no coinciden.";
    return;
  }

  const validacionEmail = validarEmail(correo);
  if (!validacionEmail.valido) {
    resultado.style.color = "red";
    resultado.innerText = validacionEmail.mensaje;
    return;
  }

  const validarPass = validarContrasena(contrasena);
  if (!validarPass.valido) {
    resultado.style.color = "red";
    resultado.innerText = validarPass.mensaje;
    return;
  }

  // Registrar en DB
  try {
    const response = await fetch("/registrar-usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombres, apellidos, email: correo, password: contrasena })
    });

    const data = await response.json();
    resultado.style.color = data.success ? "green" : "red";
    resultado.innerText = data.mensaje;
  } catch (error) {
    resultado.style.color = "red";
    resultado.innerText = "Error de conexión con el servidor";
  }
});

// =====================
// Funciones de validación
// =====================
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return { valido: false, mensaje: "⚠️ El formato del correo no es válido." };
  return { valido: true, mensaje: "✅ Correo válido." };
}

function validarContrasena(password) {
  if (/\s/.test(password)) return { valido: false, mensaje: "⚠️ La contraseña no puede contener espacios." };
  if (password.length < 8) return { valido: false, mensaje: "⚠️ La contraseña debe tener al menos 8 caracteres." };
  if (!/[A-Z]/.test(password)) return { valido: false, mensaje: "⚠️ La contraseña debe contener al menos una letra mayúscula." };
  if (!/[^A-Za-z0-9]/.test(password)) return { valido: false, mensaje: "⚠️ La contraseña debe contener al menos un carácter especial." };
  return { valido: true, mensaje: "✅ Contraseña válida." };
}
