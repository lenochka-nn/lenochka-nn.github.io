


jQuery(window).load(function() {

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-menu").slideToggle();
	 	return false;
	 });



	//закрытие маленького меню при нажатии

	$ ('.main-menu ul li a').click (function () {
		if ($(document).width() < 768) {
			$(".main-menu").css('display', 'none');
			$(".toggle-mnu").removeClass("on");
		} 
	
	});


	/*номер телефона в форме ввода*/

	$("#phone").mask("+7(999) 999-9999");


	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	    /*
	    Wow
	*/
	new WOW().init();

	/* Slider*/

	 $('.employee-slider').slick({
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="prev"><img src="img/prev.png"></button>',
      nextArrow: '<button type="button" class="next"><img src="img/next.png"></button>'

    });
	
	/*
	    Portfolio 
	*/
	$('.portfolio-masonry').masonry({
		columnWidth: '.portfolio-box', 
		itemSelector: '.portfolio-box',
		transitionDuration: '0.5s'
	});
	
	$('.portfolio-filters a').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('active')) {
	    	$('.portfolio-filters a').removeClass('active');
	    	var clicked_filter = $(this).attr('class').replace('filter-', '');
	    	$(this).addClass('active');
	    	if(clicked_filter != 'all') {
	    		$('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
	    		$('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
	    		$('.' + clicked_filter).addClass('portfolio-box');
	    		$('.' + clicked_filter).css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
	    	else {
	    		$('.portfolio-masonry > div').addClass('portfolio-box');
	    		$('.portfolio-masonry > div').css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
		}
	});
	
	$(window).on('resize', function(){ $('.portfolio-masonry').masonry(); });



	  $('form').submit(function(event) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          alert("Сообщение успешно отправлено");
          $("form").trigger("reset");
        });
        return false;
      });
	
    /*
	    Image popup
	*/
	$('.portfolio-box-text-content p').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.parents('.portfolio-box-text').siblings('img').attr('src');
			}
		}
	
	});

	/*скроллинг*/

	$(".wrap-block a, .top").mPageScroll2id({
		offset: 105
	});


function backToTop() {
	let button = $('.top');

	$(window).on('scroll', () => {
		if ($(this).scrollTop() >= 50) {
			button.fadeIn();
		} else {
			button.fadeOut();
		}
	
});
}
	backToTop();



	/*модальное окно*/


	  $('.popup-btn').on('click', function(event) {
     event.preventDefault();
     $('.popup').fadeIn();
   });
   $('.popup-close').on('click', function(event) {
     event.preventDefault();
       $('.popup').fadeOut();

        });

	/*recive-slider*/


    $('.receive-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 992 ,
          settings: {
            slidesToShow: 2,
            prevArrow: '<button class="prev-arrow"><img src="img/prev.png"></button>',
             nextArrow: '<button class="next-arrow"><img src="img/next.png"></button>', // перелистывающая кнопка
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
             prevArrow: '<button class="prev-arrow"><img src="img/prev.png"></button>',
             nextArrow: '<button class="next-arrow"><img src="img/next.png"></button>',
            slidesToScroll: 1
          }
        }
        ]
  });
	
});
