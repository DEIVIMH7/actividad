document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener referencias a los elementos del DOM
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotBody = document.getElementById("chatbot-body");

    // 2. Funcionalidad para abrir/cerrar el chatbot
    chatbotToggle.addEventListener("click", () => {
        const isHidden = chatbotWindow.hasAttribute("hidden");
        if (isHidden) {
            chatbotWindow.removeAttribute("hidden");
            chatbotToggle.setAttribute("aria-expanded", "true");
            // Opcional: Asegurarse de que el scroll esté abajo al abrir
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        } else {
            chatbotWindow.setAttribute("hidden", "");
            chatbotToggle.setAttribute("aria-expanded", "false");
        }
    });

    // 3. Funcionalidad para cerrar el chatbot desde el botón de la ventana
    chatbotClose.addEventListener("click", () => {
        chatbotWindow.setAttribute("hidden", "");
        chatbotToggle.setAttribute("aria-expanded", "false");
    });

    // 4. Función para añadir mensajes al cuerpo del chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotBody.appendChild(messageDiv);
        // Desplazarse automáticamente al final del chat
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    // 5. Lógica para enviar mensajes del usuario y recibir respuestas del bot
    function sendMessage() {
        const userMessage = chatbotInput.value.trim(); // .trim() elimina espacios en blanco al inicio/final

        if (userMessage !== "") {
            // Solo envía si el mensaje no está vacío
            addMessage(userMessage, "sent"); // Muestra el mensaje del usuario

            // Lógica de respuesta simple del chatbot
            let botResponse =
                "Lo siento, no entendí tu pregunta. ¿Puedes reformularla?";

            // Convertir a minúsculas para facilitar la comparación
            const lowerCaseMessage = userMessage.toLowerCase();

            if (
                lowerCaseMessage.includes("hola") ||
                lowerCaseMessage.includes("saludos")
            ) {
                botResponse =
                    "¡Hola! ¿En qué puedo ayudarte con la seguridad vial hoy?";
            } else if (
                lowerCaseMessage.includes("gracias") ||
                lowerCaseMessage.includes("muchas gracias")
            ) {
                botResponse =
                    "¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en consultarme.";
            } else if (
                lowerCaseMessage.includes("horario") ||
                lowerCaseMessage.includes("atienden")
            ) {
                botResponse =
                    "Nuestra tienda online está abierta 24/7. Para atención al cliente, estamos disponibles de lunes a viernes de 9 AM a 6 PM.";
            } else if (
                lowerCaseMessage.includes("productos") ||
                lowerCaseMessage.includes("qué venden")
            ) {
                botResponse =
                    "Ofrecemos cascos, chalecos reflectivos, kits de primeros auxilios, luces de emergencia y más. ¡Visita nuestra sección de productos!";
            } else if (
                lowerCaseMessage.includes("envio") ||
                lowerCaseMessage.includes("envío") ||
                lowerCaseMessage.includes("entrega")
            ) {
                botResponse =
                    "Ofrecemos envío rápido y seguro a todo el país. Los tiempos de entrega varían según tu ubicación, pero suelen ser de 2-5 días hábiles.";
            } else if (
                lowerCaseMessage.includes("contacto") ||
                lowerCaseMessage.includes("llamar")
            ) {
                botResponse =
                    "Puedes contactarnos a través del formulario en nuestra página de Contacto, o llamando a nuestro número de atención al cliente (disponible en la misma página).";
            } else if (
                lowerCaseMessage.includes("ubicacion") ||
                lowerCaseMessage.includes("dirección")
            ) {
                botResponse =
                    "Somos una tienda online, por lo que no tenemos una tienda física. ¡Pero enviamos a todo el país!";
            } else if (
                lowerCaseMessage.includes("casco") ||
                lowerCaseMessage.includes("cascos")
            ) {
                botResponse =
                    "¡Los cascos son esenciales! Tenemos una variedad de cascos integrales y abiertos para diferentes necesidades. ¿Buscas algún tipo específico?";
            } else if (
                lowerCaseMessage.includes("chaleco") ||
                lowerCaseMessage.includes("chalecos")
            ) {
                botResponse =
                    "Los chalecos reflectivos aumentan tu visibilidad. Son un excelente complemento para tu seguridad. ¿Te gustaría saber más sobre ellos?";
            } else if (
                lowerCaseMessage.includes("seguridad vial") ||
                lowerCaseMessage.includes("importancia")
            ) {
                botResponse =
                    "La seguridad vial es crucial para proteger vidas y prevenir accidentes en las vías. Usar el equipo adecuado y seguir las normas es fundamental.";
            } else if (
                lowerCaseMessage.includes("adios") ||
                lowerCaseMessage.includes("chao")
            ) {
                botResponse =
                    "¡Hasta pronto! Que tengas un camino seguro. Recuerda, la seguridad es lo primero.";
            }

            // Simular un tiempo de "pensamiento" del bot
            setTimeout(() => {
                addMessage(botResponse, "received");
            }, 500); // Responde después de 0.5 segundos

            chatbotInput.value = ""; // Limpia el campo de texto
        }
    }

    // 6. Asignar eventos a los botones de enviar y a la tecla Enter
    chatbotSend.addEventListener("click", sendMessage);

    chatbotInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
            event.preventDefault(); // Evita el salto de línea por defecto del Enter
        }
    });
});
