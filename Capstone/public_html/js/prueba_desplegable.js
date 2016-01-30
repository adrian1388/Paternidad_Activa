$(document).ready(function(){  
    /* 
     * VARIABLES GLOBALES 
    */  
    //status de panel lateral: 1 ON (default), 0 OFF  
    var status = 1;  
    //selectores  
    var iframe = $("#iframe");  
    var tip = $("#tip");  
    var title = $("#content h2");  
    var toggler = $("#toggler");  
    var lateral = $("#lateral");
    var lateralDer = $("#lateralDer");
    var saveBtn = $("#save");
    var lateralWidth = lateral.width() + "px";  
    //dimensiones disponibles para elementos del panel  
    var windowHeight = 0;  
    var renderHeight = 0;  
    var togglerHeight = 0;  
      
      
    /* 
     * AL CARGAR EL DOCUMENTO 
    */  
    calculateDimensions();
    saveBtn.hide();
      
      
    /* 
     * AL CAMBIAR DE TAMAÑO LA VENTANA DEL NAVEGADOR 
    */  
    $(window).resize(function(){  
        calculateDimensions();  
    });  
      
      
    /* 
     * AL HACER CLICK EN TOGGLER (PANEL LATERAL) 
    */  
    toggler.click(clickToggler);  
      
  
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
    function clickToggler(){          
        //ocultamos panel si esta mostrandose  
        if(status ==1){  
            lateral.hide();
            lateralDer.show();
            lateralDer.css("margin-left","0px");  
            toggler.addClass("off");
            toggler.text("Atrás");
            saveBtn.show();
              
            status = 0;  
        }  
        //mostramos panel si esta oculto  
        else{  
            lateral.show();
            lateralDer.hide();
            lateralDer.css("margin-left", lateralWidth);  
            toggler.removeClass("off");
            toggler.text("Continuar");
            saveBtn.hide();
              
            status = 1;  
        }  
    }  

}); 