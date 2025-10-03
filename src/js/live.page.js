import './lib/video.min.js';
// import './lib/videojs.quality.switch.js';
(function(){
    const liveVideoTag = document.querySelector('#live__main-media--video');
    const liveVideoWrapper = document.querySelector('.live__main-media');
    const play = document.querySelector('.main-media__play');
  const pause = document.querySelector('.main-media__pause');
  const mute = document.querySelector('.main-media__mute');
//   const unmute = document.querySelector('[data-id="unmuteVideo"]');
  const fullscreenButton = document.querySelector('.navigation-bar__fullscreen');
  function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
      // Если не в полноэкранном режиме, запрашиваем его
      if (element.requestFullscreen) {
        element.requestFullscreen(); // Стандартный
      } else if (element.mozRequestFullScreen) {
        /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE/Edge */
        element.msRequestFullscreen();
      }
    } else {
      // Если в полноэкранном режиме, выходим из него
      if (document.exitFullscreen) {
        document.exitFullscreen(); // Стандартный
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }
    function Live() {
        console.log('test')
       const player= videojs('live__main-media--video', {
          controls: false,
          muted: false,
          preload: 'auto',
          autoplay: true,
          language: 'ru',
          liveui: true,
          liveTracker: false,
          controlBar: false,
          html5: [],
          plugins: {},
          sources: [{
            src: "https://ingushetia.mediacdn.ru/cdn/ingushetia/playlist.m3u8",
            type: "application/vnd.apple.mpegURL"
          }]
        });
        setInterval(function() {
          gtag('event', 'heartbeat', { 'non_interaction': true });
          // console.log('send heartbeat');
          // HB once in 5 min
        }, 5 * 60 * 1000);

      }
      Live();
      fullscreenButton.addEventListener("click", function () {
        toggleFullscreen(liveVideoWrapper);
      });
      pause.addEventListener('click',()=> {
        play.classList.remove('hidden');
        pause.classList.add('hidden');
        liveVideoTag.pause();
      })
      play.addEventListener('click',()=> {
          pause.classList.remove('hidden');
        play.classList.add('hidden');
        liveVideoTag.play();
      });
      mute.addEventListener('click',()=> {
        if(liveVideoTag.muted===true) {
            liveVideoTag.muted=false;
            mute.classList.remove('muted');
        }else {
            liveVideoTag.muted=true;
            mute.classList.add('muted');
        }
      })
})()
// main-media__mute
// muted