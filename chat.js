// Función para enviar el mensaje y recibir respuesta
async function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const mensaje = input.value.trim();

  if (mensaje === "") return;

  // Mostrar el mensaje del usuario en el chat
  agregarMensaje("Tú", mensaje);
  input.value = "";

  // Mostrar mensaje de carga
  agregarMensaje("IA", "⏳ Pensando...");

  const respuesta = await obtenerRespuestaIA(mensaje);

  // Elimina el "pensando..." anterior
  eliminarUltimoMensaje();

  // Muestra la respuesta de la IA
  agregarMensaje("IA", respuesta);
}

// Función que hace la llamada a la API PHP
async function obtenerRespuestaIA(mensaje) {
  try {
    const res = await fetch("api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: mensaje })
    });

    const data = await res.json();
    console.log("Respuesta completa:", data);

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return "⚠️ No se pudo obtener respuesta de la IA.";
    }
  } catch (error) {
    console.error("Error al obtener respuesta:", error);
    return "❌ Hubo un error al conectar con el servidor.";
  }
}

// Función para mostrar mensajes en el chat
function agregarMensaje(remitente, texto) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Elimina el último mensaje (usado para quitar el "Pensando...")
function eliminarUltimoMensaje() {
  const chat = document.getElementById("chat");
  if (chat.lastChild) {
    chat.removeChild(chat.lastChild);
  }
}
