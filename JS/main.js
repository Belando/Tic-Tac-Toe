const cuadro_btn = document.querySelectorAll(".cuadro");
const info = document.getElementById("info");
const juego_btn = document.getElementById("boton3")
const s = document.getElementById("boton2")
var i = 1;
const jBtn_e =  "pointer-events:initial;opacity:initial;",
      jBtn_d =  "pointer-events:none;opacity:40%;";
let state = false;

var Victoria = [ [0,1,2],[3,4,5],[6,7,8],
             [0,3,6],[1,4,7],[2,5,8],
             [0,4,8],[2,4,6]
            ];

function comprobar(){
  juego_btn.style.cssText = jBtn_d;
  for (var i = 0; i < Victoria.length;i++){
    if(cuadro_btn[Victoria[i][0]].innerHTML === "X" && cuadro_btn[Victoria[i][1]].innerHTML === "X" && cuadro_btn[Victoria[i][2]].innerHTML === "X" ){
      info.innerHTML = 'Jugador 1 Gana';
      state = true;
      deshabilitarCasillas();
    }else if(cuadro_btn[Victoria[i][0]].innerHTML === "O" && cuadro_btn[Victoria[i][1]].innerHTML === "O" && cuadro_btn[Victoria[i][2]].innerHTML === "O"){
      info.innerHTML = 'Jugador 2 Gana';
      state = true;
      deshabilitarCasillas();
    }
  } 
}

function  deshabilitarCasillas(y){
  (y == false)?i = Math.floor(Math.random() * (3 - 1)) + 1:0;
    for(var n_boton = 0; n_boton < cuadro_btn.length; n_boton++){    
      cuadro_btn[n_boton].style.setProperty("pointer-events","none"); 
    } 
  juego_btn.style.cssText = jBtn_e;
}

function nEmpieza(){
  juego_btn.style.cssText = jBtn_d;
  let c1;
  (i % 2 == 0 )?c1= "Jugador 1":c1= "Jugador 2"; 
  info.innerHTML = `Quien gane se lleva cositas: empieza ${c1}.`;   
}

cuadro_btn.forEach(boton => {
  boton.onclick = function(){
    info.innerHTML = "";
    (i % 2 == 0)?boton.innerHTML = "X": boton.innerHTML = "O";
    comprobar();
    boton.style.setProperty("pointer-events","none"); 
    i++; 
    (i == 3)?i = 1: 0 ;
  }
});

juego_btn.onclick = function(){
  for(var n_boton = 0; n_boton < cuadro_btn.length; n_boton++){    
    cuadro_btn[n_boton].style.cssText = "pointer-events:initial;";
    cuadro_btn[n_boton].innerHTML = "";
    state = false;
  }
  nEmpieza();
}

nEmpieza();
