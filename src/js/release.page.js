const videoPlayerTag = document.querySelector('.video-player__video-tag');
const videoPlayer = document.querySelector(".video-player");
const progressBar = document.querySelector('.video-navigation__progress');
const playVideoBtn = document.querySelector('.video-player__play-btn');
const videoNewsMuteBtn = document.querySelector(".video-navigation__sound_btn");
const videoNewsFullScreenBtn = document.querySelector('.video-navigation__fullscreen');
const videoNavigationPlayBtn= document.querySelector(".video-navigation__btn");
const durationEl= document.querySelector('.video-navigation__timeline_duration');
const currentEl = document.querySelector('.video-navigation__timeline_current');
const videoDescription = document.querySelector(".video-player__media_description");
const videoNavigation = document.querySelector(".video-navigation");
const input = document.querySelector(".video-navigation__range-input");
noUiSlider.create(progressBar, {
    start: 0,
    connect: [true, false],
    range: {
        'min': 0,
        'max': 100
    },
    behaviour: 'tap-drag',
    step: 0.1,
    format: {
        to: value => value,
        from: value => value
    }
});

videoPlayerTag.addEventListener('timeupdate', () => {
    const progress = (videoPlayerTag.currentTime / videoPlayerTag.duration) * 100;
    progressBar.noUiSlider.set(progress);
    currentEl.textContent = formatTime(videoPlayerTag.currentTime);

});
progressBar.noUiSlider.on('slide', values => {
    const seekTime = (values[0] * videoPlayerTag.duration) / 100;
    videoPlayerTag.currentTime = seekTime;
});


window.addEventListener('DOMContentLoaded', () => {
    durationEl.textContent = formatTime(videoPlayerTag.duration);
})
videoPlayerTag.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(videoPlayerTag.duration);
    progressBar.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': videoPlayerTag.duration
        }
    });
});




playVideoBtn.addEventListener("click",()=> {
    videoPlayerTag.play();
      videoDescription.classList.add('hidden');
            videoNavigation.classList.remove("hidden");
            playVideoBtn.classList.add('hidden');
            videoNavigationPlayBtn.classList.add("played");
            
})
videoNavigationPlayBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("video-navigation__btn") || e.target.nodeName === "path" || e.target.nodeName === "rect" || e.target.nodeName === "svg") {
        if (videoNavigationPlayBtn.classList.contains("played")) {
            videoNavigationPlayBtn.classList.remove("played");
            videoPlayerTag.pause();
        } else {
            videoNavigationPlayBtn.classList.add("played");
            videoDescription.classList.add('hidden');
            videoNavigation.classList.remove("hidden");
            videoPlayerTag.play();
        }

    }
})

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
console.log(videoPlayerTag.volume)

videoNewsMuteBtn.addEventListener("click", () => {
    // console.log('muteeeee');
    // if (videoPlayerTag.muted === true && videoNewsMuteBtn.classList.contains("muted")) {
    //     videoPlayerTag.muted = false;
    //     videoNewsMuteBtn.classList.remove("muted");
    //     input.value = 0.2;
    //     videoPlayerTag.volume = 0.2;
    //     softSlider.noUiSlider.set(0.2);
    // } else {
    //     videoPlayerTag.muted = true;
    //     videoNewsMuteBtn.classList.add("muted");
    //     input.value = 0;
    //     videoPlayerTag.volume = 0;
    //     softSlider.noUiSlider.set(0);
    // }
    if(videoNewsMuteBtn.classList.contains("muted")) {
        console.log("un")
    }else {
        console.log('mu')
    }
})


videoNewsFullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document
            .exitFullscreen()
            .then(() => console.log("Document Exited from Full screen mode"))
            .catch((err) => console.error(err));
    } else {
        videoPlayer.requestFullscreen();
    }

})


      let softSlider = document.querySelector('[data-id="video-navigation__slider-round"]');

 noUiSlider.create(softSlider, {
        start: [0],
        connect: 'lower',
        step: 0.01,
        range: {
          'min': [0.0],
          'max': [1]
        }
      });
 // Из слайдера в input
      softSlider.noUiSlider.on('update', function (values, handle) {
        input.value = values[handle];
        videoPlayerTag.volume = values[handle];

        if (videoPlayerTag.volume === 0) {

          videoNewsMuteBtn.classList.add('muted');
          videoPlayerTag.muted = true;
        } else {
          videoNewsMuteBtn.classList.remove('muted');
          videoPlayerTag.muted = false;
        }
      });

      // Из input в слайдер
      input.addEventListener('change', function () {
        softSlider.noUiSlider.set(this.value);

      });


       videoNewsMuteBtn.addEventListener("click", () => {
        if (videoNewsMuteBtn.classList.contains("muted")) {
          videoPlayerTag.muted = false;
          videoNewsMuteBtn.classList.remove('muted');
          softSlider.noUiSlider.set(0.2);
        } else {
          videoPlayerTag.muted = true;
          videoNewsMuteBtn.classList.add('muted');
          softSlider.noUiSlider.set(0);
        }
      })

