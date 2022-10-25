const mainJuego = document.querySelector(".main__juego");
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
            formulario.reset();
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
    const imagen = document.querySelector(".imagenHorca");
    let aciertos = 0;
    let vidas = 0;


    for (var i = 0; i < palabraArray.length; i++) {
        const crearGuiones = document.createElement("p");
        crearGuiones.classList.add("incorrecta");
        crearGuiones.textContent = "_";
        juegoPalabra.appendChild(crearGuiones);
    }

    document.addEventListener("keyup", (events) => {
        const letra = events.key;
        const guiones = document.querySelectorAll(".incorrecta");
        let palabraExiste = false;

        for (var i = 0; i < palabraArray.length; i++) {
            letraPalabra = palabraArray[i];
            if (letra == letraPalabra) {
                guiones[i].innerHTML = letra;
                palabraExiste = true;
                aciertos = aciertos + 1;
            }
        }

        if (aciertos == palabraArray.length) {
            const botonIniciarNuevo = document.createElement("button");
            botonIniciarNuevo.textContent = "volver a jugar";
            juegoPalabra.appendChild(botonIniciarNuevo);
            botonIniciarNuevo.addEventListener("click", () => {
                volverForm();
            });
        }
        else if (vidas == 6) {
            alert("perdiste, la palabra era: " + palabraArray.join(''));
            volverForm();
        }

        if (!palabraExiste) {
            vidas = vidas + 1;
            imagen.setAttribute("src", `assets/imagenes/horca${vidas}.png`);
        }

    })
})



function volverForm() {
    juegoPalabra.remove();
    const elementoDiv = document.createElement("div");
    elementoDiv.classList.add("juego__palabra");
    elementoDiv.innerHTML = `<form class="ingresaPalabra" data-form>
    <label for="palabraNueva">Ingresa una nueva Palabra</label>
    <input type="text" name="palabraNueva" id="palabraNueva">
    <p data-error></p>
    <button class="nuevaPalabra">Agregar Palabra </button>
    <button class="comenzar">Comenzar juego</button>
</form>`;

    mainJuego.appendChild(elementoDiv);
}

