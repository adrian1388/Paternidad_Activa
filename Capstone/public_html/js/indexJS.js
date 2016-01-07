/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function openDoor(field) {
            var y = $(field).find(".thumb");
            var x = y.attr("class");
            if (y.hasClass("thumbOpened")) {
                y.removeClass("thumbOpened");
            }
            else {
                
                $(".thumb").removeClass("thumbOpened");
                y.addClass("thumbOpened");
                $(function(){

                        $('a[href*=#nivel2]').click(function() {

                        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                            && location.hostname == this.hostname) {

                                var $target = $(this.hash);

                                $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                                if ($target.length) {

                                    var targetOffset = $target.offset().top;

                                    $('html,body').animate({scrollTop: targetOffset}, 2000);

                                    return false;

                               }

                          }

                      });

                   });
                
            }
        }

