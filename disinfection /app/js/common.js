$(function() {

	//обратная связь

	$(document).ready(function() {

		//E-mail Ajax Send
		$("form.callback").submit(function() { 
			let th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$.each($('.success'), function () { 
					this.style.display = "block"; 
				  });
				//document.querySelector('.success').style.display = "block"
				setTimeout(function() {
					th.trigger("reset");
				}, 1000);
			});
			return false;
		});
	
	});

// таймер №1 бесконечный 


	var clock;
		
		$(document).ready(function() {
			var clock;

			clock = $('.clock').FlipClock({
		        autoStart: false,
		        language: 'ru-ru',
		        callbacks: {
		        	stop: function() {
		        		$('.message').html('Время вышло!')
		        	}
		        }
		    });
				    
		    clock.setTime(220880);
		    clock.setCountdown(true);
		    clock.start();

		});

// таймер №2 бесконечный 


	var clock;
		
		$(document).ready(function() {
			var clock;

			clock = $('.clock-2').FlipClock({
		        autoStart: false,
		        language: 'ru-ru',
		        callbacks: {
		        	stop: function() {
		        		$('.message').html('Время вышло!')
		        	}
		        }
		    });
				    
		    clock.setTime(220880);
		    clock.setCountdown(true);
		    clock.start();

		});

 //тайер №1 с датой окнчания        
// $(document).ready(function() {
// // var start = "August 5 2017 01:01:01";
// var end = "October 12 2020 20:42:02";
// // var startDate = new Date(start);
// var endDate = new Date(end);
// var diff = endDate - Date.now(); // startDate;
// diff /= 1000;
 
// if (diff < 0) {
//   diff = 0;
//   $('.message').html('Время вышло!');
// }
 
// var clock = $('.clock').FlipClock(diff, {
//   countdown: true,
//   language: 'ru-ru'
// });
			 
// 	clock.setCountdown(true);
// 	clock.start();

// });

// таймер №2 с датой окончания
// $(document).ready(function() {
// 	// var start = "August 5 2017 01:01:01";
// 	var end = "October 12 2020 20:42:02";
// 	// var startDate = new Date(start);
// 	var endDate = new Date(end);
// 	var diff = endDate - Date.now(); // startDate;
// 	diff /= 1000;
	 
// 	if (diff < 0) {
// 	  diff = 0;
// 	  $('.message-2').html('Время вышло!');
// 	}
	 
// 	var clock = $('.clock-2').FlipClock(diff, {
// 	  countdown: true,
// 	  language: 'ru-ru'
// 	});
				 
// 		clock.setCountdown(true);
// 		clock.start();
	
// 	});

 }); // the end

jQuery(function($){
 // форма ввода номера телефона
	$("#phone").mask("+7(999) 999-9999");
	$("#phone-2").mask("+7(999) 999-9999");
	$("#phone-3").mask("+7(999) 999-9999");
	$("#phone-4").mask("+7(999) 999-9999");
	$("#phone-5").mask("+7(999) 999-9999");
	$("#phone-6").mask("+7(999) 999-9999");
	
 }); // the end jquery

 $(document).ready(function(){
	$('.popup-btn').on('click', function(event) {
	  event.preventDefault();
	  document.body.style.overflow = 'hidden'
	  $('.popup').fadeIn();
	});
	$('.popup-close').on('click', function(event) {
	  event.preventDefault();
	  document.body.style.overflow = ''
		$('.popup').fadeOut();
 
	});
});

// галерея

$(function() {
 $('.popup-link').magnificPopup({
	fixedContentPos: false, // ставим, чтобы страница не скролилась к началу 
 delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile', // этим классом можно управлять в css
        gallery: {
		   enabled: true,
		   preload: [0,1] // lazy-load на одно вперед 
        },
        zoom: {
         enabled: true,
         duration: 300
 },
 		disableOn: function() { // на экранах меньше 600px плагин не работает
			if( $(window).width() < 600 ) {
			  return false;
			}
			return true;
		  }
 });
});

//слайдер

$('.slider').slick({
	speed: 700,
	prevArrow: '<button type="button" class="prev slick-arrow"></button>',
	nextArrow: '<button type="button" class="next slick-arrow"></button>',
	dots: true,
	adaptiveHeight: true
});

//кнопка навверх

$(window).scroll(function() {
	if($(this).scrollTop() > $(this).height()){
		$('.btn-top').addClass('active');
	} else {
		$('.btn-top').removeClass('active');
	}
});

$('.btn-top').click(function() {
	$('html, body').stop().animate({
		scrollTop: 0
	}, 'slow', 'swing');
});



