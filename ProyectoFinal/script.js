// Lista de dominios y extensiones validas.
const proveedoresValidos = ["gmail", "outlook", "hotmail", "yahoo", "protonmail"];
const extensionesValidas = ["com", "mx", "org", "net", "edu", "gov", "io", "co"];

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const resultado = document.getElementById("resultado");

  const validacion = validarEmail(usuario);
  if (!validacion.valido) {
    resultado.innerText = validacion.mensaje;
    return;
  }//fin if

  resultado.innerText =
    `${validacion.mensaje}\nUsuario ingresado: ${usuario}\nContraseña ingresada: ${contrasena}`;
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
  }//fin if

  if (contrasena !== verificar) {
    resultado.innerText = "⚠️ Las contraseñas no coinciden.";
    return;
  }//fin if

  resultado.innerText =
    `✅ Registro exitoso\n\nNombre(s): ${nombres}\nApellidos: ${apellidos}\nCorreo: ${correo}\nContraseña: ${contrasena}`;
});

// Función para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valido: false, mensaje: "El formato del correo no es válido." };
  }//fin if

  const dominioCompleto = email.split("@")[1];
  const partes = dominioCompleto.split(".");
  const proveedor = partes[0].toLowerCase();
  const extension = partes.pop().toLowerCase();

  if (!proveedoresValidos.includes(proveedor)) {
    return { valido: false, mensaje: `El @'${proveedor}' no está permitido.\nIntenta con un correo válido.` };
  }//fin if

  if (!extensionesValidas.includes(extension)) {
    return { valido: false, mensaje: `La extensión '.${extension}' no es reconocida.\nIntenta con una extensión válida.` };
  }
  //fin if

  return { valido: true, mensaje: "Correo válido." };
} //fin funcion validar email
