$(document).ready(function(){
	
	//top-slider
	$('.top-baner-wrap .owl-carousel').owlCarousel({
		items:1,
	    loop:false,
		dots:false,
	    nav:true,
		smartSpeed:700
	});


});


$(document).ready(function(){

    // if ($(window).width() > 991) {
    //   $(".content-wrap, .chat-list-group, .msg_history").mCustomScrollbar({
    //     scrollInertia: 300
    //   });
    // }

     //---side-nav-active------

    // $('.side-nav > li > a').click(function(){
    //   $(this).parent('.side-nav > li').toggleClass('active');
    //   $(this).parent('.side-nav > li').siblings().removeClass('active');
    //   $(this).parent('.side-nav > li').siblings().children('.side-nav > li > ul').slideUp();
    //   $(this).parent('.side-nav > li').children('.side-nav > li > ul').slideToggle();
    // });

    //             menu-toggle JS
    //==========================================

    $('.btn_toggle').click(function(){
      $('body').toggleClass('menu-open');
    });

});


//       jQuery(window).scroll(function(){
//       if (jQuery(window).scrollTop() >=1) {
//       jQuery('body').addClass('sticky');
//      }else {
//      jQuery('body').removeClass('sticky');
//    }
// });