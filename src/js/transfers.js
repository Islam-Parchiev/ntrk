document.addEventListener('DOMContentLoaded', function() {
  const transferItems = document.querySelectorAll(".transferItem");
    const videos = document.querySelectorAll('.transfer__video');
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
          console.log(el.nearest);
    })
  });