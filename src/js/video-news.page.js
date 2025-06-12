    const videoPlayerTag = document.querySelector('.video-player__video-tag');
    const videoPlayer = document.querySelector(".video-player");
const progressBar = document.querySelector('.video-navigation__progress');
const playVideoBtn = document.querySelector('.video-player__play-btn');
const videoNewsMuteeBtn = document.querySelector(".video-navigation__sound_btn");
const videoNewsFullScreenBtn = document.querySelector('.video-navigation__fullscreen');
const durationEl = document.querySelector('.video-navigation__timeline_duration');
const currentEl = document.querySelector('.video-navigation__timeline_current');
const videoDescription = document.querySelector(".video-player__media_description");
const videoNavigation = document.querySelector(".video-navigation");
const input = document.querySelector(".video-navigation__range-input");
const videoNavBtn = document.querySelector('.video-navigation__btn');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
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

videoPlayerTag.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(videoPlayerTag.duration);
});
window.addEventListener('DOMContentLoaded', () => {
    if (videoPlayerTag.readyState > 0) {
        durationEl.textContent = formatTime(videoPlayerTag.duration);
    }
})






playVideoBtn.addEventListener("click", () => {

    if (playVideoBtn.classList.contains("played")) {
        playVideoBtn.classList.remove("played");
        videoPlayer.classList.remove("playing");
        videoDescription.classList.remove('hidden');
        videoNavigation.classList.add("hidden");
        videoNavBtn.classList.remove("played");
        videoPlayerTag.pause();
    } else {
        playVideoBtn.classList.add("played");
        videoDescription.classList.add('hidden');
        videoNavigation.classList.remove("hidden");
        videoNavBtn.classList.add("played");
          videoPlayer.classList.add("playing");
        videoPlayerTag.play();
    }

})
videoNavBtn.addEventListener("click", ()=> {
   if(videoPlayer.classList.contains("playing")) {
    videoPlayerTag.pause();
    videoNavBtn.classList.remove('played')
    videoPlayer.classList.remove("playing");
   }else {
     videoPlayerTag.play();
    videoNavBtn.classList.add('played');
     videoPlayer.classList.add("playing");
   }
})
console.log(videoPlayerTag.volume)

videoNewsMuteeBtn.addEventListener("click", () => {
    if (videoPlayerTag.muted === true && videoNewsMuteeBtn.classList.contains("muted")) {
        videoPlayerTag.muted = false;
        videoNewsMuteeBtn.classList.remove("muted");
        input.value = 0.2;
        videoPlayerTag.volume = 0.2;
        softSlider.noUiSlider.set(0.2);
    } else {
        videoPlayerTag.muted = true;
        videoNewsMuteeBtn.classList.add("muted");
        input.value = 0;
        videoPlayerTag.volume = 0;
        softSlider.noUiSlider.set(0);
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


let softSlider = document.querySelector('#video-navigation__slider-round');

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

        videoNewsMuteeBtn.classList.add('muted');
        videoPlayerTag.muted = true;
    } else {
        videoNewsMuteeBtn.classList.remove('muted');
        videoPlayerTag.muted = false;
    }
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);

});
