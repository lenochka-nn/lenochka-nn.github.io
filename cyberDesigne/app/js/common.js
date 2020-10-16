$(function() {

  function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
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
      
      let deadline="October 16 2020 17:12:00 GMT+0300"; //for Ukraine
      initializeClock('timer', deadline);
      
 // menu
      $('.menu-btn').on('click', function(e) {
        e.preventDefault();
        $('.menu').toggleClass('menu_active');
        //$('.content').toggleClass('content_active');
      })

}); // the end
