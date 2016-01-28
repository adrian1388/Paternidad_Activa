/* https://www.freesound.org/people/Kastenfrosch/sounds/162476/ *
 * http://www.pond5.com/sound-effect/50964930/negative-click-button-9.html */



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
//var newArr = JSON.parse(jsonData);

function onLoadEvent() {
	respuestasDefault.length = 0;
	respuestasErroneas.length = 0;
    escogerTema(0);
}

function escogerTema(tema){
    for (var i = 0; i < 3; i++ ){
        var node = document.getElementById('tema' + (i + 1));
        if (node.classList.contains('hvr-bubble-float-right')){
            node.classList.remove('hvr-bubble-float-right');
        }
    }
    llenarImagenDiv(tema);
    llenarRespuestasArray(tema);
    llenarRespuestasDiv(tema);
}

function llenarImagenDiv(tema){
    var nodeImg = document.getElementsByClassName("imagen_tema");
    nodeImg[0].innerHTML = '<img src="' + jsonData.App[tema].imagen.src + '" alt="' + jsonData.App[tema].imagen.alt + '" width="500" height="354">';
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
function validateEnter(e) {
    if (event.which == 13 || event.keyCode == 13) {
        validateInput();
        return false;
    }
    return true;
}
function validateInput(){
	var palabraFound = false;
	var inputString = document.getElementById("inputString").value;

	for (var i = 0; i < respuestasDefault.length && !palabraFound; i++) {
	    
	    if (inputString.toLowerCase() == respuestasDefault[i].toLowerCase()) {

	    	palabraFound = true; //bandera

	        var audioExito = new Audio();
	        audioExito.src = "sounds/successful.mp3";
	        audioExito.autoplay = true;

	    	var nodeSpan = document.getElementById("palabra" + (i+1)); //nodo que contiene el glyphicon question
	    	var parent = nodeSpan.parentNode; //nodo que contiene el estado de bloqueado

	    	parent.className = "palabra";
	    	parent.innerHTML = "<span id='palabra" + (i+1) +"'>" + inputString + "</span>"; //agrego la palabra al nodo span
	    	// parent.outerHTML = "<div class='palabra'></div"; //cambia el estado a desbloqueado
	    	// nodeSpan.outerHTML = "<span id='palabra" + i + 1 +"'>" + inputString + "</span>"; //agrego la palabra al nodo span
	    	var node = document.createElement("span");
	        node.className = "glyphicon glyphicon-ok"; //nodo que contiene el glyphicon ok
	    	//parent.appendChild(nodeSpan);
	    	parent.appendChild(node);

	    }

	}
	if (!palabraFound){
        
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