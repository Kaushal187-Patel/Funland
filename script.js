$('a[href^="#"]').on("click",function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $("html, body").stop().animate({
	        "scrollTop": $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  if (scroll > window.innerHeight - 55) {
      $(".navbar").removeClass("transparent");
    } else {
      $(".navbar").addClass("transparent");
    }
});

$("body").scrollspy({target: ".navbar"}) 

$(".thumbnail-overlay").on("click", openProject.bind( this ))
$(".close-window").on("click", closeWindow.bind(this))

function openProject( event ) {
  if ( $(event.target).next(".thumbnail-overlay") ) {
    var id =  "#" + $(event.target).parent().attr("page");
    $(id).fadeIn()
  } else {
    var id =  "#" + $(event.target).attr("page");
    $(id).fadeIn()
  }
}

function closeWindow( event ) {
  $(event.target).parents(".full-screen").fadeOut();
}

