/*Referencias de la API*/
const cuadroBoton = document.querySelectorAll(".cuadro");
const info = document.getElementById("info");
const juegoBoton = document.getElementById("boton3")
var gana1 = document.querySelector("#x")
var gana2 = document.querySelector("#o")

const getValueInput = () => {
  let inputValue = document.getElementById("domTextElement").value;
  document.getElementById("valueInput").innerHTML = inputValue;
  sessionStorage.setItem("jugador1",inputValue)
}

const getValueInput2 = () => {
  let inputValue = document.getElementById("domTextElement2").value;
  document.getElementById("valueInput2").innerHTML = inputValue;
  sessionStorage.setItem("jugador2",inputValue)
}

/*Funcion de botón de volver a jugar*/
var i = 1;
const jugarActivado = "pointer-events:initial;opacity:initial;",
  jugarDesactivado = "pointer-events:none;opacity:80%;";
let state = false;

/*Marcador*/
var contX = 1;
var contO = 1;

/*Posibles posiciones de victoria*/
var victoria = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]
];

/*Condición de victoria de cada jugador*/
function quiengana() {
  for (var i = 0; i < victoria.length; i++) {
    if (cuadroBoton[victoria[i][0]].innerHTML === "X" && cuadroBoton[victoria[i][1]].innerHTML === "X" && cuadroBoton[victoria[i][2]].innerHTML === "X") {
      info.innerHTML = sessionStorage.getItem("jugador1");
      console.log (sessionStorage.getItem("jugador1"));
      state = true;
      gana1.innerHTML = contX++;
      bloquearCasillas();
    } else if (cuadroBoton[victoria[i][0]].innerHTML === "O" && cuadroBoton[victoria[i][1]].innerHTML === "O" && cuadroBoton[victoria[i][2]].innerHTML === "O") {
      info.innerHTML = "Jugador 2 Gana cositas";
      state = true;
      gana2.innerHTML = contO++;
      bloquearCasillas();
    }
  }
}

/*Ver quien empieza la partida(se turnan)*/
function quienEmpieza() {
  juegoBoton.style.cssText = jugarDesactivado;
  let empezar;
  (i % 2 == 0) ? empezar = verFueraDeLaFuncion : empezar = "Jugador 2";
  info.innerHTML = `Quien gane se lleva cositas: empieza ${empezar}.`;
}

/*Bloqueo de casillas al ganar*/
function bloquearCasillas(y) {
  (y == false) ? i = Math.floor(Math.random() * (3 - 1)) + 1 : 0;
  for (var pos = 0; pos < cuadroBoton.length; pos++) {
    cuadroBoton[pos].style.setProperty("pointer-events", "none");
  }
  juegoBoton.style.cssText = jugarActivado;
}

/* Turnos de juego */
cuadroBoton.forEach(boton => {
  boton.onclick = function () {
    info.innerHTML = "";
    (i % 2 == 0) ? boton.innerHTML = "X" : boton.innerHTML = "O";
    quiengana();
    boton.style.setProperty("pointer-events", "none");
    i++;
    (i == 3) ? i = 1 : 0;
  }
});

/*Reinicio del juego*/
juegoBoton.onclick = function () {
  for (var pos = 0; pos < cuadroBoton.length; pos++) {
    cuadroBoton[pos].style.cssText = "pointer-events:initial;";
    cuadroBoton[pos].innerHTML = "";
    state = false;
  }
  quienEmpieza();
}

/*Inicio del juego*/
quienEmpieza();
