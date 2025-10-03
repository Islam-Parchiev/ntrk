import './lib/video.min.js';
// import './lib/videojs.quality.switch.js';

    (function(){
  const play = document.querySelector('.video-custom-controls__btn--play');
  const pause = document.querySelector('.video-custom-controls__btn--pause');
  const mute = document.querySelector('[data-id="muteVideo"]');
  const unmute = document.querySelector('[data-id="unmuteVideo"]');
  const vid = document.querySelector('#header__media--video');
const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');
const videoContainer = document.querySelector('.header__media_content--video');


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
    mute.classList.toggle('hidden', !isMuted);
    unmute.classList.toggle('hidden',isMuted);
  };



  play.addEventListener('click',() => {

    vid.play().then(() => {
      play.classList.add("hidden");
      pause.classList.remove("hidden");
    })
    .catch(error => {
      console.error('Ошибка воспроизведения видео:', error);
    });
  });
pause.addEventListener('click',()=> {
  vid.pause();
  play.classList.remove("hidden");
  pause.classList.add("hidden");
});
mute.addEventListener('click',()=> {
  console.log('mute')
  vid.muted=false;
updateMuteState()
})
unmute.addEventListener('click',()=> {
  console.log('unmute')
  vid.muted=true;
 updateMuteState()
})
function headerLive() {
  console.log('test');
  const player = videojs('header__media--video', {
    controls: false,
    muted: true,
    preload: true,
    autoplay: true,
    language: 'ru',
    liveui: false,
    liveTracker: false,
    controlBar: false,
    html5: [],
    plugins: {},
    sources: [{
      src: "https://ingushetia.mediacdn.ru/cdn/ingushetia/playlist.m3u8",
      type: "application/vnd.apple.mpegURL"
    }]
  });
    document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
   videoContainer.classList.add('fullscreen');
  } else {
    videoContainer.classList.remove('fullscreen');
  }
});
  player.on('waiting',function(){
    videoContainer.classList.add('loading');
  })
  player.on('canplay', function() {
   videoContainer.classList.remove('loading');
});

  setInterval(function() {
    gtag('event', 'heartbeat', { 'non_interaction': true });
    // console.log('send heartbeat');
    // HB once in 5 min
  }, 5 * 60 * 1000);
}
headerLive();
fullscreenButton.addEventListener("click", function () {
  toggleFullscreen(vid);
});


})()


