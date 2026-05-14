
const botonTema = document.getElementById("temaBtn");
const iconoTema = document.getElementById("iconoTema");

function aplicarTema(tema) {
    if (tema === "claro") {
        document.body.classList.remove("dark-mode");
        iconoTema.innerHTML = "☀️";
        localStorage.setItem("tema", "claro");
    } else {
        document.body.classList.add("dark-mode");
        iconoTema.innerHTML = "🌙";
        localStorage.setItem("tema", "oscuro");
    }
}

const temaGuardado = localStorage.getItem("tema");
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (temaGuardado) {
  
    aplicarTema(temaGuardado);
} else {
    
    if (prefiereOscuro) {
        aplicarTema("oscuro");
    } else {
        aplicarTema("claro");
    }
}


botonTema.addEventListener("click", () => {
    const estaOscuro = document.body.classList.contains("dark-mode");
    if (estaOscuro) {
        aplicarTema("claro");
    } else {
        aplicarTema("oscuro");
    }
});


const formulario = document.getElementById("formulario");

function mostrarError(input, mensaje) {
    
    const errorAnterior = input.parentElement.querySelector(".error-mensaje");
    if (errorAnterior) errorAnterior.remove();
    
    const error = document.createElement("span");
    error.className = "error-mensaje";
    error.textContent = mensaje;
    error.style.color = "#e74c3c";
    error.style.fontSize = "12px";
    error.style.marginTop = "5px";
    error.style.display = "block";
    
    input.style.borderColor = "#e74c3c";
    input.parentElement.appendChild(error);
    
    setTimeout(() => {
        if (error.parentElement) error.remove();
        input.style.borderColor = "";
    }, 3000);
}

function limpiarError(input) {
    const error = input.parentElement.querySelector(".error-mensaje");
    if (error) error.remove();
    input.style.borderColor = "";
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    
    const nombreValue = nombre.value.trim();
    const correoValue = correo.value.trim();
    const mensajeValue = mensaje.value.trim();
    
    let esValido = true;
    
    if (nombreValue === "") {
        mostrarError(nombre, "❌ Por favor, ingresa tu nombre completo.");
        esValido = false;
    } else if (nombreValue.length < 2) {
        mostrarError(nombre, "❌ El nombre debe tener al menos 2 caracteres.");
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(nombreValue)) {
        mostrarError(nombre, "❌ El nombre solo puede contener letras y espacios.");
        esValido = false;
    } else {
        limpiarError(nombre);
    }
    
    const validarCorreo = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (correoValue === "") {
        mostrarError(correo, "❌ Por favor, ingresa tu correo electrónico.");
        esValido = false;
    } else if (!validarCorreo.test(correoValue)) {
        mostrarError(correo, "❌ El formato del correo no es válido. Ejemplo: usuario@dominio.com");
        esValido = false;
    } else {
        limpiarError(correo);
    }

    if (mensajeValue === "") {
        mostrarError(mensaje, "❌ Por favor, escribe un mensaje.");
        esValido = false;
    } else if (mensajeValue.length < 10) {
        mostrarError(mensaje, "❌ El mensaje debe tener al menos 10 caracteres.");
        esValido = false;
    } else if (mensajeValue.length > 500) {
        mostrarError(mensaje, "❌ El mensaje no puede exceder los 500 caracteres.");
        esValido = false;
    } else {
        limpiarError(mensaje);
    }
    
    if (esValido) {
       
        const notificacion = document.createElement("div");
        notificacion.textContent = "✅ ¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.";
        notificacion.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(notificacion);
        
        formulario.reset();
        limpiarError(nombre);
        limpiarError(correo);
        limpiarError(mensaje);
        
        setTimeout(() => {
            notificacion.style.opacity = "0";
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }
});

const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");

nombreInput.addEventListener("input", () => {
    if (nombreInput.value.trim().length >= 2) {
        limpiarError(nombreInput);
    }
});

correoInput.addEventListener("input", () => {
    const validarCorreo = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (validarCorreo.test(correoInput.value.trim())) {
        limpiarError(correoInput);
    }
});

mensajeInput.addEventListener("input", () => {
    if (mensajeInput.value.trim().length >= 10 && mensajeInput.value.trim().length <= 500) {
        limpiarError(mensajeInput);
    }
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const secciones = document.querySelectorAll(".pantalla");
    secciones.forEach((seccion, index) => {
        seccion.style.animationDelay = `${index * 0.1}s`;
    });
});

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("tema")) {
        if (e.matches) {
            aplicarTema("oscuro");
        } else {
            aplicarTema("claro");
        }
    }
});

let enviando = false;
formulario.addEventListener("submit", (e) => {
    if (enviando) {
        e.preventDefault();
        return;
    }
    
    enviando = true;
    setTimeout(() => {
        enviando = false;
    }, 3000);
});
