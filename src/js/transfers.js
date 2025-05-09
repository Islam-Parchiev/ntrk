document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.transfer__video');
    const p = document.getElementById("my-player"); // Use getElementById!
    // const player = videojs(videos, {
    //   controls: true,
    //   autoplay: true,
    //   preload: 'auto',
    //   loop: false,
    //   muted: false,
    //   poster: './assets/poster.jpg',
    //   playbackRates: [0.5, 1, 1.5, 2],
    // });
    videos.forEach(el=> {
        videojs(el, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            loop: false,
            muted: false,
            poster: './assets/poster.jpg',
            playbackRates: [0.5, 1, 1.5, 2],
          })
    })
  });