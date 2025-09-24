document.getElementById("loginForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const resultado = document.getElementById("resultado");

  // Validación local
  const validacionEmail = validarEmail(usuario);
  const validacionPass = validarContrasena(contrasena);

  if (!validacionEmail.valido || !validacionPass.valido) {
    resultado.style.color = "red";
    resultado.innerText = 
      (!validacionEmail.valido ? validacionEmail.mensaje + "\n" : "") +
      (!validacionPass.valido ? validacionPass.mensaje : "");
    return;
  }

  // Validación en la base de datos
  try {
    const response = await fetch("/validar-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usuario, password: contrasena })
    });

    const data = await response.json();

    if (data.success) {
      resultado.style.color = "green";
      resultado.innerText = data.mensaje;

      // Desaparece después de 3 segundos
      setTimeout(() => {
        resultado.style.opacity = 0;
        setTimeout(() => {
          resultado.innerText = "";
          resultado.style.opacity = 1;
        }, 500);
      }, 3000);

    } else {
      resultado.style.color = "red";
      resultado.innerText = data.mensaje;
    }

  } catch (error) {
    resultado.style.color = "red";
    resultado.innerText = "⚠️ Error de conexión con el servidor o usuario no encontrado";
  }
});

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
