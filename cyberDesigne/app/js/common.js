$(function() {

  function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor(t / (1000 * 60 * 60));
        return { t, hours, minutes, seconds };
      }
      
      function initializeClock(id, endtime) {
        let clock = document.getElementById(id);
        let hoursSpan = clock.querySelector('.hours');
        let minutesSpan = clock.querySelector('.minutes');
        let secondsSpan = clock.querySelector('.seconds');
      
        function updateClock() {
          let t = getTimeRemaining(endtime);
      
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
          if (t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
          hoursSpan.innerHTML = 0;
          minutesSpan.innerHTML = 0;
          secondsSpan.innerHTML = 0;
          };
        };
      
        updateClock();
        setInterval(updateClock, 1000);
      };
      
      let deadline="October 20 2020 17:12:00 GMT+0300"; //for Ukraine
      initializeClock('timer', deadline);
      
 // menu
      $('.menu-btn').on('click', function(e) {
        e.preventDefault();
        $('.menu').toggleClass('menu_active');
        //$('.content').toggleClass('content_active');
      })

  //слайдер

  // $('.slider').slick({
  //   dots: true,
	// 	speed: 1000,
	// 	prevArrow: '<button type="button" class="prev slick-arrow"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
	// 	nextArrow: '<button type="button" class="next slick-arrow"><i class="fa fa-caret-right" aria-hidden="true"></i></i></button>',
	// 	slidesToShow: 5,
  //   slidesToScroll: 1,
  //   autoplay: true
	// 	responsive: [
	// 		{
	// 		  breakpoint: 1201 ,
	// 		  settings: {
	// 			slidesToShow: 3,
	// 			slidesToScroll: 1
	// 		  }
	// 		},
	// 		{
	// 		  breakpoint: 992,
	// 		  settings: {
	// 			slidesToShow: 1,
  //       slidesToScroll: 1  
	// 		  }
	// 		}
	// 		]

  // });
  
  // счетчик 

  $('.slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)

      
      var i = (currentSlide ? currentSlide : 0) + 1;
      $('.pagingInfo').text(i < 10 ? "0" + i : i);
      $('.pagingSlider').text('/' + slick.slideCount);
   
  });

  $('.slider').slick({
    prevArrow: '<button type="button" class="prev slick-arrow"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
	  nextArrow: '<button type="button" class="next slick-arrow"><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
		responsive: [
			{
			  breakpoint: 1201 ,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 1,
        slidesToScroll: 1  
			  }
			}
			]
});

}); // the end
