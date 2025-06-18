const playerAudio = document.querySelector(".player__controls > audio");
const playBtn = document.querySelector(".player__controls_btn--play");
const muteAudio = document.querySelector(".player__mute");
const input = document.querySelector('.range-input');
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
let softSlider = document.getElementById('slider-round');

noUiSlider.create(softSlider, {
    start: [1],
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
    playerAudio.volume = values[handle];
    console.log(values[handle]);
});

// Из input в слайдер
input.addEventListener('change', function () {
    softSlider.noUiSlider.set(this.value);
    console.log(this.value);
});


playBtn.addEventListener("click", () => {
    if (playBtn.classList.contains("active")) {
        playBtn.classList.remove("active");
        playerAudio.pause();
    } else {
        playBtn.classList.add("active");
        playerAudio.play();
    }
})
muteAudio.addEventListener("click", (e) => {
    if (e.target.classList.contains("popular-item__media_btn") || e.target.nodeName === "path" || e.target.nodeName === "svg") {

        if (playerAudio.muted === true) {
            playerAudio.muted = false
        } else {
            playerAudio.muted = true
        }
    }
})

// Инициализация аудио
// Выбираем все контейнеры аудио-плееров
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
const audioPlayers = document.querySelectorAll('.radio-item');
console.log(audioPlayers);
audioPlayers.forEach(container => {
    const audio = container.querySelector('.audio');
    const slider = container.querySelector('.audio-slider');
    const durationEl = container.querySelector('.duration');
    // Инициализация слайдера
    noUiSlider.create(slider, {
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


    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        slider.noUiSlider.set(progress);
        durationEl.textContent = formatTime(audio.currentTime);

    });

    slider.noUiSlider.on('slide', values => {
        const seekTime = (values[0] * audio.duration) / 100;
        audio.currentTime = seekTime;
    });
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
    window.addEventListener('DOMContentLoaded', () => {
        if (audio.readyState > 0) {
            durationEl.textContent = formatTime(audio.duration);
        }
    })
});