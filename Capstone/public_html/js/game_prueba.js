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





var tema;
var palabraIN;
var respuestasDefault = new Array();
var respuestasErroneas = new Array();
var turno=0;
var control=0;
//var newArr = JSON.parse(jsonData);

function onLoadEvent() {
	respuestasDefault.length = 0;
	respuestasErroneas.length = 0;
    llenarNiveles();
    escogerTema(0);
}

function setTurno(){
    turno=((Math.random()*10)%1 + 1).toFixed(0);
    control=1;
    if(turno==1){
        document.getElementById('Turno_Set').innerHTML="Turno de Hijo";
        control=1;

    }
    if(turno==2){
        document.getElementById('Turno_Set').innerHTML="Turno de Padre"; 
        control2=1;
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
    nodeImg[0].innerHTML = '<img id="imagen_game" src="' + jsonData.App[tema].imagen.src + '" alt="' + jsonData.App[tema].imagen.alt + '" width="500" height="354">';
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
	    parent.innerHTML = "<span id='palabra" + (i+1) +"' class='glyphicon glyphicon-question-sign'></span>"; //agrego la palabra al nodo span

	}
}
function pistasAleatorioGeneral(){
	var randomNum = Math.floor(Math.random()*8 + 0);
	llenarPistasDiv(randomNum);
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
	    	var adivinarOKNode = document.getElementsByClassName("palabra");
	    	animationadivinarOK(adivinarOKNode[0]);
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