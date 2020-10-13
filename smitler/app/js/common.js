$(function() {

	// всплывающее меню 
	$('#my-menu').mmenu({
		extensions: [
			"border-none",
			"pagedim-black",
			"theme-dark"
		 ],
		 navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон красоты Смитлер">'
		 },
		 offCanvas: {
			 position : 'right'
		 }
	});
	// присвоение кнопки гамбургер эффекта
 
	let btn = $('#my-menu').data('mmenu');
	btn.bind('open:finish', function() {
		$('.hamburger').addClass('is-active');
	});
	btn.bind('close:finish', function() {
		$('.hamburger').removeClass('is-active');
	});

	// функция, чтобы слайдер servicesSlider начинал выполняться только после прогрузки слайдера


	// слайдер services

	// слайдер изменения высоты блоков в каруселе


	$('.slider-services').slick({
		speed: 1000,
		prevArrow: '<button type="button" class="prev slick-arrow"><i class="fa fa-angle-double-left"></i></button>',
		nextArrow: '<button type="button" class="next slick-arrow"><i class="fa fa-angle-double-right"></i></button>',
		slidesToShow: 3,
    	slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 993 ,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]

	});

	$('.slider-review').slick({
		speed: 700,
		dots: true,
		prevArrow: false,
		nextArrow: false

	});

	$('.slider-partners').slick({
		speed: 800,
		prevArrow: '<button type="button" class="slick-arrow prev-partners"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-arrow next-partners"><i class="fa fa-angle-right"></i></button>',
		slidesToShow: 4,
    	slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 1
				}
			  },
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
	});

	

	function servicesSlider() {
		$('.services-content').equalHeights();
		$('.services-item').each(function() {
			var item   = $(this);
			var height = item.find('.services-content').outerHeight();
			item.find('.services-image').css('min-height', height);
		});
		
	}servicesSlider();

	window.onresize = servicesSlider; // срабатывай функция заново при измении размера документы
	

	// создания тега спан, на последнем слове (для админки)

	$('.s-services .slider-services .services-item .services-content .h3').each(function(){
		let ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
		});	
	
		// создания тега спан, на первом слове (для админки)
		$('section .h2').each(function(){
			let ths = $(this);
			ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
			});

		// select в форме
		$('select').selectize();

		//E-mail Ajax Send
		$("form.callback").submit(function() { //Change
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()  
			}).done(function() {
				$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn(); //добавляем flex, сначала скрываем класс, так как у нас ранее стоял класс display none, затем показываем
				setTimeout(function() {
					$(th).find('.success').removeClass('active').fadeOut(); 
					th.trigger("reset"); // сбрасываются все поля формы
				}, 3000);
			});
			return false;
		});

		//кнопка наверх

		$(window).scroll(function() {
			if($(this).scrollTop() > $(this).height()){
				$('.top').addClass('active');
			} else {
				$('.top').removeClass('active');
			}
		});
	
		$('.top').click(function() {
			$('html, body').stop().animate({
				scrollTop: 0
			}, 'slow', 'swing');
		});

	
}); //the end

// прелоудер

$(window).on('load', function() {
	$('.preloader').delay(1000).fadeOut('slow');
});

// загрузка карты после наведения

//Переменная для включения/отключения индикатора загрузки
let spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
let check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
let myMapTemp, myPlacemarkTemp;
 
//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [55.684206, 37.557457], // координаты центра на карте
    zoom: 17, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.Placemark([55.684006, 37.557457], {
      balloonContent: "г. Москва, ул. Ивана Бабушкина, 22с1, м. Профсоюзная",
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-marker.png',
      // Размеры метки.
      iconImageSize: [32, 32],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-15, -40],
  });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
 
  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);
 
  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
 
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
		// Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
 
		// Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});