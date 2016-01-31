$(document).ready(function(){  
    /* 
     * VARIABLES GLOBALES 
    */  
    //status de panel lateral: 1 ON (default), 0 OFF  
    var status = 1;
    var statusDer = 1;
    //selectores  
    var iframe = $("#iframe");  
    var tip = $("#tip");  
    var title = $("#content h2");
    var lateral = $("#lateral");
    var lateralDer = $("#lateralDer");
    var lateralGroup = $("#lateralGroup");
    var atrasBtn = $("#atras");
    var siguienteBtn = $("#siguiente");
    var lateralWidth = lateral.width() + "px";  
    //dimensiones disponibles para elementos del panel  
    var windowHeight = 0;  
    var renderHeight = 0;  
    var togglerHeight = 0;  
      
      
    /* 
     * AL CARGAR EL DOCUMENTO 
    */  
    calculateDimensions();
    
    atrasBtn.css('visibility', 'hidden');
    
      
      
    /* 
     * AL CAMBIAR DE TAMAÑO LA VENTANA DEL NAVEGADOR 
    */  
    $(window).resize(function(){  
        calculateDimensions();  
    });  
      
      
    /* 
     * AL HACER CLICK EN TOGGLER (PANEL LATERAL) 
    */  
    atrasBtn.click(clickAtras);
    siguienteBtn.click(clickSiguiente);
      
  
    /* 
     * FUNCIONES DE CONTROL DE ELEMENTOS DE INTERFAZ 
    */  
    // calculo de dimensiones disponibles  
    function calculateDimensions(){  
        windowHeight = document.documentElement.clientHeight; //alto disponible en ventana del explorador  
        renderHeight = (windowHeight - 51 - 40 - 31)  +"px";  
        togglerHeight = (windowHeight - 51 - 40 - 31)  +"px";  
        /* ¿De donde salen esos valores a restar? Pues de: 
         * 51: #top: 40px de height, 10px de padding-top, y 1px de border-bottom 
         * 40: #content h2: 40px de height 
         * 31: #footer: 30px de height y 1px de border-top 
        */  
    }  
    // control de elemento lateral (toggler)  
    function clickSiguiente(){          
        //ocultamos panel si esta mostrandose  
        if(status == 1){  
            lateral.hide();
            lateralDer.show();
            atrasBtn.show();
            //siguienteBtn.text("Atrás");
            //siguienteBtn.show();
            atrasBtn.css('visibility', 'visible');
              
            status = 2;  
        }  
        //mostramos panel si esta oculto  
        else if(status == 2){
            lateralDer.hide();
            lateralGroup.show();
            lateralGroup.css("margin-left", "0px");  
            // toggler.removeClass("off");
            // toggler.text("Siguiente");
            // saveAndGroupBtn.hide();
            siguienteBtn.text("Guardar");
              
            status = 3;  
        }  
    }
    // control de elemento lateralDer (toggler)  
    function clickAtras(){          
        //ocultamos panel si esta mostrandose  
        if(status == 2){  
            lateral.show();
            lateralDer.hide();
            
            atrasBtn.css('visibility', 'hidden');
              
            status = 1;
        }
        //mostramos panel si esta oculto  
        else if(status == 3){  
            lateralGroup.hide();
            lateralDer.show();
            lateralDer.css("margin-left","0px");
            // toggler.removeClass("off");
            // toggler.text("Atrás");
            siguienteBtn.text("Siguiente");
              
            status = 2;
        }  
    }

}); 