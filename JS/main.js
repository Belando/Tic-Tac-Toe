/*Referencias*/
const cuadroBoton = document.querySelectorAll(".cuadro");
const info = document.getElementById("info");
const juegoBoton = document.getElementById("boton3")
var gana1 = document.querySelector("#x")
var gana2 = document.querySelector("#o")

/*Referencia a jugadores*/
function ocultarJug1() {
  document.getElementById("Jugador1").style.display = 'none';
  document.getElementById("boton1").style.display = 'none';
}

const getJ1 = () => {
  let inputValue = document.getElementById("Jugador1").value;
  document.getElementById("valueInput").innerHTML = inputValue;
  sessionStorage.setItem("jugador1", inputValue)
  onclick = ocultarJug1();
}

function ocultarJug2() {
  document.getElementById("Jugador2").style.display = 'none';
  document.getElementById("boton2").style.display = 'none';
}

const getJ2 = () => {
  let inputValue = document.getElementById("Jugador2").value;
  document.getElementById("valueInput2").innerHTML = inputValue;
  sessionStorage.setItem("jugador2", inputValue);
  onclick = ocultarJug2();
}

/*Desactivación - Activación del botón jugar*/
const jugarActivado = "pointer-events:initial;opacity:initial;",
  jugarDesactivado = "pointer-events:none;opacity:80%;";
let state = false;

/*Marcador*/
var i = 1;
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
      info.innerHTML = sessionStorage.getItem("jugador1") + " Gana cositas";
      state = true;
      gana1.innerHTML = contX++;
      bloquearCasillas();
    } else if (cuadroBoton[victoria[i][0]].innerHTML === "O" && cuadroBoton[victoria[i][1]].innerHTML === "O" && cuadroBoton[victoria[i][2]].innerHTML === "O") {
      info.innerHTML = sessionStorage.getItem("jugador2") + " Gana cositas";
      state = true;
      gana2.innerHTML = contO++;
      bloquearCasillas();
    }
  } if (cuadroBoton[0].innerHTML != "" && cuadroBoton[1].innerHTML != "" && cuadroBoton[2].innerHTML != "" && cuadroBoton[3].innerHTML !== "" && cuadroBoton[4].innerHTML != "" && cuadroBoton[5].innerHTML != "" && cuadroBoton[6].innerHTML != "" && cuadroBoton[7].innerHTML != "" && cuadroBoton[8].innerHTML != "" && state == false) {
    info.innerHTML = sessionStorage.getItem("jugador1") + " y " + sessionStorage.getItem("jugador2") + " han quedado empate";
    bloquearCasillas();
  }
}

/*Ver quien empieza la partida(se turnan)*/
function quienEmpieza() {
  juegoBoton.style.cssText = jugarDesactivado;
  let turnos;
  (i % 2 == 0) ? turnos = sessionStorage.getItem("jugador1") : turnos = sessionStorage.getItem("jugador2");
  info.innerHTML = `Quien gane se lleva cositas: empieza ${turnos}`;
}

/*Bloqueo de casillas al ganar*/
function bloquearCasillas() {
  for (var pos = 0; pos < cuadroBoton.length; pos++) {
    cuadroBoton[pos].style.setProperty("pointer-events", "none");
  }
  juegoBoton.style.cssText = jugarActivado;
}

/* Marcado del juego */
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