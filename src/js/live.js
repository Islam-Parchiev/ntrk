import './../js/lib/video.min.js';
import './../js/lib/videojs.quality.switch.js';

    (function(){
  const play = document.querySelector('.video-custom-controls__btn--play');
  const pause = document.querySelector('.video-custom-controls__btn--pause');
  const mute = document.querySelector('[data-id="muteVideo"]');
  const unmute = document.querySelector('[data-id="unmuteVideo"]');
  const vid = document.querySelector('#header__media--video');
const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');

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
    const updateMuteState = () => {
    const isMuted = vid.muted;
    mute.classList.toggle('hidden', isMuted);
    unmute.classList.toggle('hidden', !isMuted);
  };
play.addEventListener('click',()=> {
  vid.play();
})
pause.addEventListener('click',()=> {
  vid.pause();
});
mute.addEventListener('click',()=> {
  console.log('mute')
  vid.muted=true;
updateMuteState()
})
unmute.addEventListener('click',()=> {
  console.log('unmute')
  vid.muted=false;
 updateMuteState()
})
function videoJsTest() {
  console.log('test')
  videojs('header__media--video', {
    controls: [],
    muted: false,
    preload: 'auto',
    autoplay: true,
    language: 'ru',
    liveui: [],
    liveTracker: false,
    controlBar: [],
    html5: [],
    plugins: {
      qualitySwitch: {
        // optional param:
        // qualityText is an Array of String's, from 'low' to 'high' variants
        qualityText: ["Низкое", "Среднее", "Высокое"]
      }
    },
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
videoJsTest();
fullscreenButton.addEventListener("click", function () {
  toggleFullscreen(vid);
});


})()


