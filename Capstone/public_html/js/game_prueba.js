/* https://www.freesound.org/people/Kastenfrosch/sounds/162476/ *
 * http://www.pond5.com/sound-effect/50964930/negative-click-button-9.html */



/* global jsonData */

/**+++++++++++ Notificaciones en pantalla ++++++++++**/
/**+++++++++++____________________________++++++++++**/

//http://stackoverflow.com/questions/2271156/chrome-desktop-notification-example

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(input) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('¡Intenta nuevamente!', {
      icon: 'https://freeiconshop.com/files/edd/notification-flat.png',
      body: input + " es errónea."
    });
    
  }

}

function notifyMeTurno(input) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('¡Cambio!', {
      icon: 'https://freeiconshop.com/files/edd/notification-flat.png',
      body: 'Turno de ' + input + '.'
    });
    
  }

}





var tema;
var palabraIN;
var respuestasDefault = new Array();
var respuestasErroneas = new Array();
var turno=0;
var control=0;

var juego;
var juegoRecibido = null;
var socket = io();
//var newArr = JSON.parse(jsonData);

function onLoadEvent() {
	respuestasDefault.length = 0;
	respuestasErroneas.length = 0;
    llenarNiveles();
    escogerTema(0);
}

function enviarInvitacion(juego) {
    var nombreJuego = juego.alt;

    socket.emit('solicitud juego', nombreJuego);
}

socket.on('solicitud juego', function(msg){
    juegoRecibido = msg;
    document.getElementById('lightSolicitud').style.display='block';
    document.getElementById('fadeSolicitud').style.display='block';
    $('#messages').append($('<li>').text(msg));
});

function aceptarCancelarInvitacion(resp) {
    socket.emit('aceptarCancelar juego', resp);
    if (resp === 'si') {
        setTurno();
    }
    else{

    }
}
function setTurno(){
    turno=((Math.random()*10)%1 + 1).toFixed(0);
    control=1;
    if(turno==1){
        document.getElementById('Turno_Set').innerHTML="Turno de Hijo";
        notifyMeTurno('Hijo');
        control=1;

    }
    if(turno==2){
        document.getElementById('Turno_Set').innerHTML="Turno de Padre"; 
        notifyMeTurno('Padre');
        control=1;
    }
    
}

function llenarNiveles() {
    for (var i = 0; i < 3; i++) {
        var nodeNivel = document.getElementById("tema" + (i + 1));
        nodeNivel.innerHTML = "" + jsonData.App[i].imagen.alt + "";
    }
    
}
function escogerTema(tema){
    control=0;
    for (var i = 0; i < 3; i++ ){
        var node = document.getElementById('tema' + (i + 1));
        if (node.classList.contains('hvr-bubble-float-right')){
            node.classList.remove('hvr-bubble-float-right');
        }
    }
    llenarImagenDiv(tema);
    llenarRespuestasArray(tema);
    llenarRespuestasDiv(tema);
    llenarPistasDiv(1);
}

function llenarImagenDiv(tema){
    var nodeImg = document.getElementsByClassName("imagen_tema");
    nodeImg[0].innerHTML = '<img id="imagen_game" src="' + jsonData.App[tema].imagen.src + '" alt="' + jsonData.App[tema].imagen.alt + '" width="500" height="364">';
    var imagen_gameNode = document.getElementById("imagen_game");
    animationAgrandar(imagen_gameNode);
}

function llenarRespuestasArray(tema){
    
	respuestasDefault.length = 0;
    
    var node = document.getElementById('tema' + (tema + 1));
    node.classList.add('hvr-bubble-float-right');

	respuestasDefault.push(jsonData.App[tema].respuestas[0].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[1].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[2].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[3].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[4].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[5].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[6].palabra);
	respuestasDefault.push(jsonData.App[tema].respuestas[7].palabra);
}

function llenarRespuestasDiv(tema){
    for (var i = 0; i < respuestasDefault.length ; i++) {
	    
	    var nodeSpan = document.getElementById("palabra" + (i+1)); //nodo que contiene el glyphicon question
	    var parent = nodeSpan.parentNode; //nodo que contiene el estado de bloqueado

	    parent.className = "palabra";
        parent.classList.add("palabra-escondida");
        parent.title = "PISTA"
	    parent.innerHTML = "<span id='palabra" + (i+1) +"' class='glyphicon glyphicon-question-sign'></span>"; //agrego la palabra al nodo span

	}
}
function pistasAleatorioGeneral(){
	var randomNum = Math.floor(Math.random()*8 + 0);
	llenarPistasDiv(randomNum);
}
var x = null;
var y = null;
var numeroPalabra = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}

function showAyudaUnoyDos(element){
    var nodePalabra = document.getElementById("ayudaUnoyDos");
    nodePalabra.style.position = "absolute";
    nodePalabra.style.top = y + "px";
    nodePalabra.style.left = x + "px";
    nodePalabra.style.display = "block";
    document.getElementById('fade3').style.display='block';
    numeroPalabra = element;
}

function clickPista(){
    llenarPistasDiv(numeroPalabra);
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
    document.getElementById('ayudaUnoyDos').style.display='none';
    document.getElementById('fade3').style.display='none';
}

function clickTresLetras(){
    llenarTresLetrasDiv(numeroPalabra);
    document.getElementById('ayudaUnoyDos').style.display='none';
    document.getElementById('fade3').style.display='none';
}

function llenarTresLetrasDiv(palabra_i){
    var nodeSpan = document.getElementById("palabra" + (palabra_i)); //nodo que contiene el glyphicon question
    var parent = nodeSpan.parentNode; //nodo que contiene el estado de bloqueado

    parent.className = "palabra";
    parent.classList.add("palabra-escondida");
    parent.title = "PISTA"
    var restanteLength = respuestasDefault[palabra_i - 1].length - 2;
    var palabraTresLetras = respuestasDefault[palabra_i - 1].toLowerCase().substring(0,3) + "_".repeat(restanteLength);
    parent.innerHTML = "<span id='palabra" + palabra_i + "'>" + palabraTresLetras + "</span>" + "<span class='glyphicon glyphicon-question-sign'></span>"; //agrego la palabra al nodo span
}

function llenarPistasDiv(palabra_i){
	var nodePista = document.getElementById("parrafoPista");
	var nodeTema = document.getElementsByClassName("hvr-bubble-float-right");
	var randomNum = Math.floor(Math.random()*2 + 0);
	
    tema = nodeTema[0].id;
    tema = tema.substring(tema.length-1,tema.length);
	nodePista.innerHTML = jsonData.App[tema - 1].respuestas[palabra_i - 1].ayuda[randomNum].pista;
}

function validateEnter(e) {
    if (event.which == 13 || event.keyCode == 13) {
        validateInput();
        return false;
    }
    return true;
}
function validateInput(){
	var palabraFound = false;
        var tempo=0;
	var inputString = document.getElementById("inputString").value;
        document.getElementById('light2').style.display='none';
        document.getElementById('fade2').style.display='none';
        clearTimeout();
        if(turno!==0){
            tempo=turno;
        }

	for (var i = 0; i < respuestasDefault.length && !palabraFound; i++) {
	    
	    if (inputString.toLowerCase() == respuestasDefault[i].toLowerCase()) {
       
	    	palabraFound = true; //bandera

	        var audioExito = new Audio();
	        audioExito.src = "sounds/successful.mp3";
	        audioExito.autoplay = true;

	    	var nodeSpan = document.getElementById("palabra" + (i+1)); //nodo que contiene el glyphicon question
	    	var parent = nodeSpan.parentNode.parentNode; //nodo que contiene el estado de bloqueado

	    	//parent.className = "palabra";
	    	parent.innerHTML = "<div class='palabra'><span id='palabra" + (i+1) +"'>" + inputString + "</span><span class='glyphicon glyphicon-ok'></span></div>"; //agrego la palabra al nodo span
	    	var adivinarOKNode = document.getElementById("palabra" + (i+1));
                adivinarOKNode = adivinarOKNode.parentNode;
	    	animationadivinarOK(adivinarOKNode);
	    	// parent.outerHTML = "<div class='palabra'></div"; //cambia el estado a desbloqueado
	    	// nodeSpan.outerHTML = "<span id='palabra" + i + 1 +"'>" + inputString + "</span>"; //agrego la palabra al nodo span
	    	//var node = document.createElement("span");
	        //node.className = "glyphicon glyphicon-ok"; //nodo que contiene el glyphicon ok
	    	//parent.appendChild(nodeSpan);
	    	//parent.appendChild(node);

	    }

	}
	if (!palabraFound){
            if(control==1){
                if(turno==1){    
                    document.getElementById('Turno_Set').innerHTML="Turno de Padre";
                    socket.emit('palabra falla', inputString);
                    turno=2;
                }else if(turno==2){
                    document.getElementById('Turno_Set').innerHTML="Turno de Hijo";
                    turno=1;
                }
                document.getElementById('light2').style.display='block';
                document.getElementById('fade2').style.display='block';
            }
            
            var audioExito = new Audio();
                audioExito.src = "sounds/wrong1.mp3";
                audioExito.autoplay = true;

            var boxOne = document.getElementById('inputString');
                    //alert("¡Esa palabra no es! " + inputString);
                    notifyMe(inputString);
            animationErr(boxOne);
                    respuestasErroneas.push("" + inputString);
	}
        
    
    
        
	document.getElementById("inputString").value = "";
	
    
}

function animationErr(boxOne) {
	boxOne.classList.add('horizTranslate');
    boxOne.addEventListener("animationend",function(){
        boxOne.classList.remove('horizTranslate');
    },false);
}

function animationAgrandar(divImg) {
	divImg.classList.add('agrandar');
    divImg.addEventListener("animationend",function(){
        divImg.classList.remove('agrandar');
    },false);
}

function animationadivinarOK(adivinarOKNode) {
	adivinarOKNode.classList.add('adivinarOK');
    adivinarOKNode.addEventListener("animationend",function(){
        adivinarOKNode.classList.remove('adivinarOK');
    },false);
}



/**+++++++++++            JSON            ++++++++++**/
/**+++++++++++____________________________++++++++++**/
// var xmlhttp = new XMLHttpRequest();
// var url = "game_prueba.json";

// xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         var myArr = JSON.parse(xmlhttp.responseText);
//         myFunction(myArr);
//     }
// };
// xmlhttp.open("GET", url, true);
// xmlhttp.send();

// function myFunction(arr) {
//     var out = "";
//     var i;
//     for(i = 0; i < arr.length; i++) {
//         out += '<a href="' + arr[i].url + '">' + 
//         arr[i].display + '</a><br>';
//     }
//     document.getElementsByClassName("imagen_tema").innerHTML = out;
// }