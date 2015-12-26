$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});

//Para la animacion de los porcentajes del circulo
window.onload = function() {
//selecciono la clase javascript -->
    var javascript = document.querySelector('.javascript');
    new EasyPieChart(javascript, {
        //<!-- activo la animación y establezco su duración a un segundo -->
        animate: ({ duration: 1000, enabled: true }),
        //<!-- aumento la longitud de las lineas de la gráfica -->
        scaleLength:10,
        //<!-- aumento el tamaño de la gráfica -->
        size:150,
        //<!-- añado el número del porcentaje que se muestra en el span -->
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
    var html5 = document.querySelector('.html5');
    new EasyPieChart(html5, {
        animate: ({ duration: 2000, enabled: true }),
        scaleLength:10,
        size:150,
        barColor:'#FF8000',
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
    var css = document.querySelector('.css');
    new EasyPieChart(css, {
        animate: ({ duration: 3000, enabled: true }),
        scaleLength:10,
        size:150,
        barColor:'#58ACFA',
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
    var php = document.querySelector('.php');
    new EasyPieChart(php, {
        animate: ({ duration: 3000, enabled: true }),
        scaleLength:10,
        size:150,
        barColor:'#1C1C1C',
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}
 

