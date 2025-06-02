const playVideoBtn = document.querySelector(".video-navigation__btn");
const playBtn = document.querySelector(".video-player__play-btn");
const videoNavigation = document.querySelector(".video-navigation");
const videoNewsFullScreenBtn = document.querySelector(".video-navigation__fullscreen");
const videoNewsMuteBtn = document.querySelector(".video-navigation__sound_btn");
const video = document.querySelector(".video-player__video-tag");
const videoMediaTag = document.querySelector(".video-player__media");
const videoDescription = document.querySelector(".video-player__media_description");
const input = document.querySelector(".video-navigation__range-input");
const currentEl = document.querySelector(".video-navigation__timeline_current");
const durationEl = document.querySelector(".video-navigation__timeline_duration");
if (playBtn && video) {
    playBtn.addEventListener("click", () => {

        video.play();
        playBtn.classList.add("hidden");
        videoDescription.classList.add("hidden");
        videoNavigation.classList.remove("hidden");
        playVideoBtn.classList.add("played");
    })
}

const radioSlider = new Swiper(".radio-slider", {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.radio-slider-pagination',
        type: "fraction"
    },
    slideClass: "radio-slide",
    wrapperClass: "radio-slider__wrapper",
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 1,
    // Navigation arrows
    navigation: {
        nextEl: '.radio-slider-btn--next',
        prevEl: '.radio-slider-btn--prev',
    },

});
let softSlider = document.getElementById('video-navigation__slider-round');

noUiSlider.create(softSlider, {
    start: [0],
    connect: 'lower',
    step: 0.01,
    range: {
        'min': [0.0],
        'max': [1]
    }
});popular-item__media_timeline


// Из слайдера в input
softSlider.noUiSlider.on('update', function (values, handle) {
    input.value = values[handle];
    video.volume = values[handle];
    console.log(values[handle]);
    if (video.volume === 0) {
        console.log("000")
        videoNewsMuteBtn.classList.add('muted');
        video.muted = true;
    } else {
        videoNewsMuteBtn.classList.remove('muted');
        video.muted = false;
    }
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);
    console.log(this.value);
});




const videoPlayer = document.querySelector('.video-player__video-tag');
const progressBar = document.querySelector('.video-navigation__progress');
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

videoPlayer.addEventListener('timeupdate', () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.noUiSlider.set(progress);
    currentEl.textContent = formatTime(videoPlayer.currentTime);

});
progressBar.noUiSlider.on('slide', values => {
    const seekTime = (values[0] * videoPlayer.duration) / 100;
    videoPlayer.currentTime = seekTime;
});


window.addEventListener('DOMContentLoaded', () => {
    durationEl.textContent = formatTime(videoPlayer.duration);
})
videoPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(videoPlayer.duration);
    progressBar.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': videoPlayer.duration
        }
    });
});





playVideoBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("video-navigation__btn") || e.target.nodeName === "path" || e.target.nodeName === "rect" || e.target.nodeName === "svg") {
        if (playVideoBtn.classList.contains("played")) {
            playVideoBtn.classList.remove("played");
            videoPlayer.pause();
        } else {
            playVideoBtn.classList.add("played");
            videoPlayer.play();
        }

    }
})

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
console.log(video.volume)
videoNewsMuteBtn.addEventListener("click", () => {
    if (video.muted === true && videoNewsMuteBtn.classList.contains("muted")) {
        video.muted = false;
        videoNewsMuteBtn.classList.remove("muted");
        input.value = 0.2;
        video.volume = 0.2;
        softSlider.noUiSlider.set(0.2);
    } else {
        video.muted = true;
        videoNewsMuteBtn.classList.add("muted");
        input.value = 0;
        video.volume = 0;
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
        videoMediaTag.requestFullscreen();
    }

})