document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const resultado = document.getElementById("resultado");

  const validacion = validarEmail(usuario);
  if (!validacion.valido) {
    resultado.innerText = validacion.mensaje;
    return;
  }

  const validarPass = validarContrasena(contrasena);
  if (!validarPass.valido) {
    resultado.innerText = validarPass.mensaje;
    return;
  }

  resultado.innerText =
    `${validacion.mensaje}\n${validarPass.mensaje}\nUsuario ingresado: ${usuario}\nContraseña ingresada: ${contrasena}`;
});

// Evento de registro
document.getElementById("registroForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const verificar = document.getElementById("verificar").value;
  const resultado = document.getElementById("resultado");

  const validacion = validarEmail(correo);
  if (!validacion.valido) {
    resultado.innerText = validacion.mensaje;
    return;
  }

  const validarPass = validarContrasena(contrasena);
  if (!validarPass.valido) {
    resultado.innerText = validarPass.mensaje;
    return;
  }

  if (contrasena !== verificar) {
    resultado.innerText = "⚠️ Las contraseñas no coinciden.";
    return;
  }

  resultado.innerText =
    `✅ Registro exitoso\n\nNombre(s): ${nombres}\nApellidos: ${apellidos}\nCorreo: ${correo}\nContraseña: ${contrasena}`;
});

// Función para validar email (solo formato correcto)
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valido: false, mensaje: "⚠️ El formato del correo no es válido." };
  }
  return { valido: true, mensaje: "✅ Correo válido." };
}

// Función para validar contraseña
function validarContrasena(password) {
  if (/\s/.test(password)) {
    return { valido: false, mensaje: "⚠️ La contraseña no puede contener espacios." };
  }
  if (password.length < 8) {
    return { valido: false, mensaje: "⚠️ La contraseña debe tener al menos 8 caracteres." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valido: false, mensaje: "⚠️ La contraseña debe contener al menos una letra mayúscula." };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valido: false, mensaje: "⚠️ La contraseña debe contener al menos un carácter especial." };
  }
  return { valido: true, mensaje: "✅ Contraseña válida." };
}
