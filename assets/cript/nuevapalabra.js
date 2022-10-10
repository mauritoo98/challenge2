const formulario = document.querySelector("[data-form]");
const botonPalabra = document.querySelector(".nuevaPalabra")
const botonJuego = document.querySelector(".comenzar");
const juegoPalabra = document.querySelector(".juego__palabra");
const palabrasList = [];
const palabra = [];

botonPalabra.addEventListener("click", (evento) => {
    evento.preventDefault();
    const inputPalabra = document.querySelector("#palabraNueva");
    const nuevaPalabra = inputPalabra.value;
    var error = document.querySelector("[data-error]");
    const expresion = /^[a-z]+$/;

    if (nuevaPalabra) {
        if (nuevaPalabra.match(expresion)) {
            const palabras = { nuevaPalabra, };
            palabrasList.push(palabras);
            localStorage.setItem("palabra", JSON.stringify(palabrasList));
            error.classList.remove("invisible");
            error.innerHTML = "Palabra agregada correctamente"
        }
        else {
            error.classList.remove("invisible");
            error.innerHTML = "Solo se permiten letras minusculas"
        }
    }
    else {
        error.classList.remove("invisible");
        error.innerHTML = "Este campo no puede estar vacio"
    }


})

botonJuego.addEventListener("click", (evento) => {
    evento.preventDefault();
    formulario.remove();
    const palabraStorage = JSON.parse(localStorage.getItem("palabra"));
    const palabraAleatoria = palabraStorage[Math.floor(Math.random() * palabraStorage.length)];
    const palabraExtra = palabraAleatoria.nuevaPalabra;
    const palabraArray = Array.from(palabraExtra);

    for (var i = 0; i < palabraArray.length; i++) {
        const crearGuiones = document.createElement("p");
        crearGuiones.classList.add("incorrecta");
        crearGuiones.textContent = "_";
        juegoPalabra.appendChild(crearGuiones);
    }

    document.addEventListener("keyup", (events) => {
        const letra = events.key;
        const vidas = palabraArray.length;
        const guion = document.querySelector(".incorrecta");
        palabraArray.forEach(element => {
            if (letra == element) {
                guion.textContent = letra;
            }
            else {
                console.log("perdiste un turno");
            }
        });
    })

})

